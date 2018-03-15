# Writing a profile

**Per endpoint, there is an endpoint-specific customisation called *profile*** which may for example do the following:

- handle the additional requirements of the endpoint (e.g. authentication),
- extract additional information from the data provided by the endpoint,
- guard against triggering bugs of certain endpoints (e.g. time limits).

This guide is about writing such a profile. If you just want to use an already supported endpoint, refer to the [API documentation](readme.md) instead.

*Note*: **If you get stuck, ask for help by creating an issue!** We're motivated to help people expand the scope of this library.

## 0. How do the profiles work?

A profile contains of three things:

- **mandatory details about the HAFAS endpoint**
	- `endpoint`: The protocol, host and path of the endpoint.
	- `locale`: The [BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) [locale](https://en.wikipedia.org/wiki/Locale_(computer_software)) of your endpoint (or the area that your endpoint covers).
	- `timezone`: An [IANA-time-zone](https://www.iana.org/time-zones)-compatible [timezone](https://en.wikipedia.org/wiki/Time_zone) of your endpoint.
- **flags indicating that features are supported by the endpoint** – e.g. `journeyRef`
- **methods overriding the [default profile](../lib/default-profile.js)**

As an example, let's say we have an [Austrian](https://en.wikipedia.org/wiki/Austria) endpoint:

```js
const myProfile = {
	endpoint: 'https://example.org/bin/mgate.exe',
	locale: 'de-AT',
	timezone: 'Europe/Vienna'
}
```

If you pass this profile into `hafas-client`, the `parseLine` method will override [the default one](../parse/line.js).

Assuming the endpoint returns all lines names prefixed with `foo `, We can strip them like this:

```js
// get the default line parser
const createParseLine = require('hafas-client/parse/line')

const createParseLineWithoutFoo = (profile, operators) => {
	const parseLine = createParseLine(profile, operators)

	// wrapper function with additional logic
	const parseLineWithoutFoo = (l) => {
		const line = parseLine(l)
		line.name = line.name.replace(/foo /g, '')
		return line
	}
	return parseLineWithoutFoo
}

profile.parseLine = createParseLineWithoutFoo
```

## 1. Setup

*Note*: There are many ways to find the required values. This way is rather easy and has worked for most of the apps that I've looked at so far.

1. **Get an iOS or Android device and download the "official" app** for the public transport provider that you want to build a profile for.
2. **Configure a [man-in-the-middle HTTP proxy](https://docs.mitmproxy.org/stable/concepts-howmitmproxyworks/)** like [mitmproxy](https://mitmproxy.org).
	- *Note*: This method does not work if the app uses [public key pinning](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning). In this case (the app won't be able to query data), please create an issue, so we can discuss other techniques.
3. **Record requests of the app.**
	- To help others in the future, post the requests (in their entirety!) on GitHub, e.g. in as format like [this](https://gist.github.com/derhuerst/5fa86ed5aec63645e5ae37e23e555886). This will also let us help you if you have any questions.
	- Make sure to cover all relevant sections of the app, e.g. "journeys", "departures", "live map". Better record more than less; You will regret not having enough information later on.

## 2. Basic profile

- **Identify the `endpoint`.** The protocol, host and path of the endpoint, *but not* the query string.
	- *Note*: **`hafas-client` for now only supports the interface providing JSON** (generated from XML), which is being used by the corresponding iOS/Android apps. It supports neither the JSONP, nor the XML, nor the HTML interface. If the endpoint does not end in `mgate.exe`, it mostly likely won't work.
- **Identify the `locale`.** Basically guess work; Use the date & time formats as an indicator.
- **Identify the `timezone`.** This may be tricky, a for example [Deutsche Bahn](https://en.wikipedia.org/wiki/Deutsche_Bahn) returns departures for Moscow as `+01:00` instead of `+03:00`.
- **Copy the authentication** and other meta fields, namely `ver`, `ext`, `client` and `lang`.
	- You can find these fields in the root of each request JSON. Check [a VBB request](https://gist.github.com/derhuerst/5fa86ed5aec63645e5ae37e23e555886#file-1-http-L13-L22) and [the corresponding VBB profile](https://github.com/derhuerst/hafas-client/blob/6e61097687a37b60d53e767f2711466b80c5142c/p/vbb/index.js#L22-L29) for an example.
	- Add a function `transformReqBody(body)` to your profile, which assigns them to `body`.
	- Some profiles have a `checksum` parameter (like [here](https://gist.github.com/derhuerst/2a735268bd82a0a6779633f15dceba33#file-journey-details-1-http-L1)) or two `mic` & `mac` parameters (like [here](https://gist.github.com/derhuerst/5fa86ed5aec63645e5ae37e23e555886#file-1-http-L1)). If you see one of them in your requests, jump to [*Appendix A: checksum, mic, mac*](#appendix-a-checksum-mic-mac). Unfortunately, this is necessary to get the profile working.

If you want, you can now **verify that the profile works**; I've prepared [a script](https://runkit.com/derhuerst/hafas-client-profile-example) for that. Alternatively, [submit Pull Request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/) and I will help you out with testing and improvements.

## 3. Additional info

We consider these improvements to be *optional*:

- **Check if the endpoint supports the journey legs call.**
	- In the app, check if you can query details for the status of a single journey leg. It should load realtime delays and the current progress.
	- If this feature is supported, add `journeyLeg: true` to the profile.
- **Check if the endpoint supports the live map call.** Does the app have a "live map" showing all vehicles within an area? If so, add `radar: true` to the profile.
-  **Consider transforming station & line names** into the formats that's most suitable for *local users*. Some examples:
	- `M13 (Tram)` -> `M13`. With Berlin context, it is obvious that `M13` is a tram.
	- `Berlin Jungfernheide Bhf` -> `Berlin Jungfernheide`. With local context, it's obvious that *Jungfernheide* is a train station.
- **Check if the endpoint has non-obvious limitations** and let use know about these. Examples:
	- Some endpoints have a time limit, after which they won't return more departures, but silently discard them.

---

## Appendix A: `checksum`, `mic`, `mac`

As far as I know, there are three different types of authentication used among HAFAS deployments.

### unprotected endpoints

You can just query these if you send a formally correct request.

### endpoints using the `checksum` query parameter

`checksum` is a [message authentication code](https://en.wikipedia.org/wiki/Message_authentication_code): `hafas-client` will compute it by [hashing](https://en.wikipedia.org/wiki/Hash_function) the request body and a *salt* (which means secret). **This secret can be read from the config file inside the app bundle.** There is no guide for this yet, so please open an issue instead.

### endpoints using the `mic` & `mac` query parameters

`mic` is a [message integrity code](https://en.wikipedia.org/wiki/Message_authentication_code), the [hash](https://en.wikipedia.org/wiki/Hash_function) of the request body.

`mac` is a [message authentication code](https://en.wikipedia.org/wiki/Message_authentication_code), the hash of `mic` and a *salt* (which means secret). **This secret can be read from the config file inside the app bundle.** There is no guide for this yet, so please open an issue instead.
