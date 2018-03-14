# Writing a profile

**Per endpoint, there is an endpoint-specific customisation called *profile*** which may for example do the following:

- handle the additional requirements of the endpoint (e.g. authentication),
- extract additional information from the data provided by the endpoint,
- guard against triggering bugs of certain endpoints (e.g. time limits).

**This guide is about writing such a profile.** If you just want to use an already supported endpoint, refer to the [API documentation](index.md) instead.

*Note*: You can always ask for help by creating an issue! We're motivated to help people expand the scope of this library.

## 0. How does it work?

A profile contains two things:

- **mandatory details about the HAFAS endpoint**
	- `endpoint`: The protocol, host and path of the endpoint.
	- `locale`: The [BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) [locale](https://en.wikipedia.org/wiki/Locale_(computer_software)) of your endpoint (or the area that your endpoint covers).
	- `timezone`: An [IANA-time-zone](https://www.iana.org/time-zones)-compatible [timezone](https://en.wikipedia.org/wiki/Time_zone) of your endpoint.
- **flags indicating that features are supported by the endpoint** – e.g. `journeyRef`
- **methods overriding the [default profile](../lib/default-profile.js)**

As an example, let's say that our endpoint `https://example.org/bin/mgate.exe` has the timezone `Europe/Vienna` and locale `de-AT`. It also returns all lines names prefixed with `foo `. We can strip them like this:

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
```

Our profile will look like this:

```js
const myProfile = {
	endpoint: 'https://example.org/bin/mgate.exe',
	parseLine: createParseLineWithoutFoo
}
```

If you pass this profile into `hafas-client`, the `parseLine` method will override [the default one](../parse/line.js).

```js
const createClient = require('hafas-client')
const client = createClient(myProfile) // create a client with our profile
```
