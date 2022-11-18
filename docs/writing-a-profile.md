# Writing a profile

**Per HAFAS endpoint, `hafas-client` has an endpoint-specific customisation called *profile*.** A profile may, for example, do the following:

- handle the additional requirements of the endpoint (e.g. authentication),
- extract additional information from the data provided by the endpoint,
- guard against triggering bugs of certain endpoints (e.g. time limits).

This guide is about writing such a profile. If you just want to use an already supported endpoint, refer to the [main readme](../readme.md) instead.

*Note*: **If you get stuck, ask for help by [creating an issue](https://github.com/public-transport/hafas-client/issues/new)**; We're happy to help you expand the scope of this library!

## 0. How do the profiles work?

A profile may consist of three things:

- **mandatory details about the HAFAS endpoint**
	- `endpoint`: The protocol, host and path of the endpoint.
	- `locale`: The [BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) [locale](https://en.wikipedia.org/wiki/Locale_(computer_software)) of your endpoint (or the area that your endpoint covers).
	- `timezone`: An [IANA-time-zone](https://www.iana.org/time-zones)-compatible [timezone](https://en.wikipedia.org/wiki/Time_zone) of your endpoint.
- **flags indicating which features are supported by the endpoint** – e.g. `trip`
- **methods overriding the [default profile](../lib/default-profile.js)**

Let's use a fictional endpoint for [Austria](https://en.wikipedia.org/wiki/Austria) as an example:

```js
const myProfile = {
	endpoint: 'https://example.org/bin/mgate.exe',
	locale: 'de-AT',
	timezone: 'Europe/Vienna'
}
```

Assuming their HAFAS endpoint returns all line names prefixed with `foo `, we can adapt our profile to clean them:

```js
// get the default line parser
import {parseLine} from 'hafas-client/parse/line.js'

// wrapper function with additional logic
const parseLineWithoutFoo = (ctx, rawLine) => {
	const line = parseLine(ctx, rawLine)
	line.name = line.name.replace(/foo /g, '')
	return line
}

myProfile.parseLine = parseLineWithoutFoo
```

If you pass this profile into `hafas-client`, the `parseLine` method will override [the default one](../parse/line.js).

You can also use the `parseHook` helper to reduce boilerplate:

```js
import {parseHook} from 'hafas-client/lib/profile-hooks.js'

const removeFoo = (ctx, rawLine) => ({
	...ctx.parsed,
	name: line.name.replace(/foo /g, '')
})

myProfile.parseLine = parseHook(parseLine, removeFoo)
```

## 1. Setup

*Note*: There are many ways to find the required values. This way is rather easy and works with most endpoints by now.

1. **Find the journey planning webapp** corresponding to the API endpoint; Usually, you can find it on the public transport provider's website.
2. **Open your [browser's devtools](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools)**, switch to the "Network" tab, and **inspect the requests to the HAFAS API**.

If you can't find the webapp or your public transport provider doesn't have one, you can inspect their mobile app's traffic instead:

1. Get an iOS or Android device and **download the "official" app.**
2. **Configure a [man-in-the-middle HTTP proxy](https://docs.mitmproxy.org/stable/concepts-howmitmproxyworks/)** like [mitmproxy](https://mitmproxy.org).
	- Configure your device to trust the self-signed SSL certificate, [as outlined in the mitmproxy docs](https://docs.mitmproxy.org/stable/concepts-certificates/).
	- *Note*: This method does not work if the app uses [public key pinning](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning). In this case (the app won't be able to query data), please [create an issue](https://github.com/public-transport/hafas-client/issues/new), so we can discuss other techniques.
3. **Record requests of the app.**
	- [There's a video showing this step](https://stuff.jannisr.de/how-to-record-hafas-requests.mp4).
	- Make sure to cover all relevant sections of the app, e.g. "journeys", "departures", "live map". Better record more than less!
	- To help others in the future, post the requests (in their entirety!) on GitHub, e.g. in as format like [this](https://gist.github.com/derhuerst/5fa86ed5aec63645e5ae37e23e555886). This will also let us help you if you have any questions.

## 2. Basic profile

*Note:* You should have read the [general documentation on `mgate.exe` APIs](hafas-mgate-api.md) to make sense of the terminology used below.

You may want to start with the [profile boilerplate](profile-boilerplate.js).

- **Identify the `endpoint`.** The protocol, host and path of the endpoint, *but not* the query string.
	- *Note*: **`hafas-client` for now only supports the interface providing JSON** (generated from XML), which is being used by the corresponding iOS/Android apps. It supports neither the JSONP, nor the XML, nor the HTML interface. If the endpoint does not end in `mgate.exe`, it mostly likely won't work.
- **Identify the `locale`.** Basically guess work; Use the date & time formats as an indicator.
- **Identify the `timezone`.** This may be tricky, a for example [Deutsche Bahn](https://en.wikipedia.org/wiki/Deutsche_Bahn) returns departures for Moscow as `+01:00` instead of `+03:00`.
- **Copy the authentication** and other meta fields, namely `ver`, `ext`, `client` and `lang`.
	- You can find these fields in the root of each request JSON. Check [a VBB request](https://gist.github.com/derhuerst/ea5d6482b61aeb7384a2c788f43dc11d#file-0-serverinfo-http-L11-L33) and [the corresponding VBB profile](https://github.com/public-transport/hafas-client/blob/2baf2f6f0444ffc67317f8bafe0fe05f687e5fae/p/vbb/base.json#L2-L11) for an example.
	- Add a function `transformReqBody(ctx, body)` to your profile, which adds the fields to `body`. todo: adapt this
	- Some profiles have a `checksum` parameter (like [here](https://gist.github.com/derhuerst/2a735268bd82a0a6779633f15dceba33#file-journey-details-1-http-L1)) or two `mic` & `mac` parameters (like [here](https://gist.github.com/derhuerst/5fa86ed5aec63645e5ae37e23e555886#file-1-http-L1)). If you see one of them in your requests, jump to the [*Authentication* section of the `mgate.exe` docs](hafas-mgate-api.md#authentication). Unfortunately, this is necessary to get the profile working.

## 3. Products

In `hafas-client`, there's a distinction between the `mode` and the `product` fields:

- The `mode` field describes the mode of transport in general. [Standardised by the *Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format/blob/3bd36faa721e85d9f5ca58fb0f38cdbedb87bbca/spec/readme.md#modes), it is on purpose limited to a very small number of possible values, e.g. `train` or `bus`.
- The value for `product` relates to how a means of transport "works" *in local context*. Example: Even though [*S-Bahn*](https://en.wikipedia.org/wiki/Berlin_S-Bahn) and [*U-Bahn*](https://en.wikipedia.org/wiki/Berlin_U-Bahn) in Berlin are both `train`s, they have different operators, service patterns, stations and look different. Therefore, they are two distinct `product`s `subway` and `suburban`.

**Specify `product`s that appear in the app** you recorded requests of. For a fictional transit network, this may look like this:

```js
const products = [
	{
		id: 'commuterTrain',
		mode: 'train',
		bitmasks: [16],
		name: 'ACME Commuter Rail',
		short: 'CR',
		default: true
	},
	{
		id: 'metro',
		mode: 'train',
		bitmasks: [8],
		name: 'Foo Bar Metro',
		short: 'M',
		default: true
	}
]
```

Let's break this down:

- `id`: A sensible, [camelCased](https://en.wikipedia.org/wiki/Camel_case#Variations_and_synonyms), alphanumeric identifier. Use it for the key in the `products` array as well.
- `mode`: A [valid *Friendly Public Transport Format* mode](https://github.com/public-transport/friendly-public-transport-format/blob/3bd36faa721e85d9f5ca58fb0f38cdbedb87bbca/spec/readme.md#modes).
- `bitmasks`: HAFAS endpoints work with a [bitmask](https://en.wikipedia.org/wiki/Mask_(computing)#Arguments_to_functions) that toggles the individual products. It should be an array of values that toggle the appropriate bit(s) in the bitmask (see below).
- `name`: A short, but distinct name for the means of transport, *just precise enough in local context*, and in the local language. In Berlin, `S-Bahn-Schnellzug` would be too much, because everyone knows what `S-Bahn` means.
- `short`: The shortest possible symbol that identifies the product.
- `default`: Should the product be used for queries (e.g. journeys) by default?

If you want, you can now **verify that the profile works**; We've prepared [a script](https://runkit.com/derhuerst/hafas-client-profile-example/0.2.1) for that. Alternatively, [submit a Pull Request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/) and we will help you out with testing and improvements.

### Finding the right values for the `bitmasks` field

As shown in [the video](https://stuff.jannisr.de/how-to-record-hafas-requests.mp4), search for a journey and toggle off one product at a time, recording the requests. After extracting the products bitmask ([example](https://gist.github.com/derhuerst/193ef489f8aa50c2343f8bf1f2a22069#file-via-http-L34)) you will end up with values looking like these:

```
toggles                     value  binary  subtraction     bit(s)
all products                31     11111   31 - 0
all but ACME Commuter Rail  15     01111   31 - 2^4        2^4
all but Foo Bar Metro       23     10111   31 - 2^3        2^3
all but product E           25     11001   31 - 2^2 - 2^1  2^2, 2^1
all but product F           30     11110   31 - 2^0        2^0
```

## 4. Additional info

We consider these improvements to be *optional*:
- **Check if the endpoint supports the `trip()` call.**
	- In the app, check if you can re-fetch details for the status of a single journey leg. It should load realtime delays and the current progress.
	- If this feature is supported, add `trip: true` to the profile.
- **Check if the endpoint supports the live map call.** Does the app have a "live map" showing all vehicles within an area? If so, add `radar: true` to the profile.
-  **Consider transforming station & line names** into the formats that's most suitable for *local users*. This is just an optimal optimisation that makes it easier for users of the profile to use the data. Some examples:
	- `M13 (Tram)` -> `M13`. With Berlin context, it is obvious that `M13` is a tram.
	- `Berlin Jungfernheide Bhf` -> `Berlin Jungfernheide`. With local context, it's obvious that *Jungfernheide* is a train station.
- **Check if the endpoint has non-obvious limitations** and let use know about these. Examples:
	- Some endpoints have a time limit, after which they won't return more departures, but silently discard them.
