# `hafas-client` documentation

**[API documentation](api.md)**

## Migrating from an old `hafas-client` version

- [`4` → `5` migration guide](migrating-to-5.md)

## Throttling requests

There's opt-in support for throttling requests to the endpoint.

```js
import {createClient} from 'hafas-client'
import {withThrottling} from 'hafas-client/throttle.js'
import {profile as dbProfile} from 'hafas-client/p/db/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a throttled HAFAS client with Deutsche Bahn profile
const client = createClient(withThrottling(dbProfile), userAgent)

// Berlin Jungfernheide to München Hbf
await client.journeys('8011167', '8000261', {results: 1})
```

You can also pass custom values for the nr of requests (`limit`) per interval into `withThrottling`:

```js
// 2 requests per second
const throttledDbProfile = withThrottling(dbProfile, 2, 1000)
const client = createClient(throttledDbProfile, userAgent)
```

## Retrying failed requests

There's opt-in support for retrying failed requests to the endpoint.

```js
import {createClient} from 'hafas-client'
import {withRetrying} from 'hafas-client/retry.js'
import {profile as dbProfile} from 'hafas-client/p/db/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with Deutsche Bahn profile that will retry on HAFAS errors
const client = createClient(withRetrying(dbProfile), userAgent)
```

You can pass custom options into `withRetrying`. They will be passed into [`retry`](https://github.com/tim-kos/node-retry#tutorial).

```js
// retry 2 times, after 10 seconds & 30 seconds
const retryingDbProfile = withRetrying(dbProfile, {
	retries: 2,
	minTimeout: 10 * 1000,
	factor: 3
})
const client = createClient(retryingDbProfile, userAgent)
```

## User agent randomization

By default, `hafas-client` randomizes the client name that you pass into `createClient`, and sends it as [`User-Agent`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) in a randomized form:

```js
import {createClient} from 'hafas-client'
// …

const userAgent = 'my-awesome-program'
const client = createClient(someProfile, userAgent)

await client.journeys(/* … */)
// User-Agent: my-awee70429some-pre70429ogram
await client.journeys(/* … */)
// User-Agent: my-awesom9bb8e2e-prog9bb8e2ram
```

You can turn this off by setting `profile.randomizeUserAgent` to `false`:

```js
const client = createClient({
	...someProfile,
	randomizeUserAgent: false,
}, userAgent)
```

## Logging requests

You can use `profile.logRequest` and `profile.logResponse` to process the raw [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) and [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response), respectively.

As an example, we can implement a custom logger:

```js
import {createClient} from 'hafas-client'
import {profile as dbProfile} from 'hafas-client/p/db/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

const logRequest = (ctx, fetchRequest, requestId) => {
	// ctx looks just like with the other profile.* hooks:
	const {dbProfile, opt} = ctx

	console.debug(requestId, fetchRequest.headers, fetchRequest.body + '')
}

const logResponse = (ctx, fetchResponse, body, requestId) => {
	console.debug(requestId, fetchResponse.headers, body + '')
}

// create a client with Deutsche Bahn profile that debug-logs
const client = createClient({
	...dbProfile,
	logRequest,
	logResponse,
}, userAgent)
```

```js
// logRequest output:
'29d0e3' {
	accept: 'application/json',
	'accept-encoding': 'gzip, br, deflate',
	'content-type': 'application/json',
	connection: 'keep-alive',
	'user-agent': 'hafas842c51-clie842c51nt debug C842c51LI'
} {"lang":"de","svcReqL":[{"cfg":{"polyEnc":"GPA"},"meth":"LocMatch",…
// logResponse output:
'29d0e3' {
	'content-encoding': 'gzip',
	'content-length': '1010',
	'content-type': 'application/json; charset=utf-8',
	date: 'Thu, 06 Oct 2022 12:31:09 GMT',
	server: 'Apache',
	vary: 'User-Agent'
} {"ver":"1.45","lang":"deu","id":"sb42zgck4mxtxm4s","err":"OK","graph"…
```

The default `profile.logRequest` [`console.error`](https://nodejs.org/docs/latest-v10.x/api/console.html#console_console_error_data_args)s the request body, if you have set `$DEBUG` to `hafas-client`. Likewise, `profile.logResponse` `console.error`s the response body.

## Error handling

Unexpected errors – e.g. due to bugs in `hafas-client` itself – aside, its methods may reject with the following errors:

- `HafasError` – A generic error to signal that something HAFAS-related went wrong, either in the client, or in the HAFAS endpoint.
- `HafasAccessDeniedError` – The HAFAS endpoint has rejected your request because you're not allowed to access it (or the specific API call). Subclass of `HafasError`.
- `HafasInvalidRequestError` – The HAFAS endpoint reports that an invalid request has been sent. Subclass of `HafasError`.
- `HafasNotFoundError` – The HAFAS endpoint does not know about such stop/trip/etc. Subclass of `HafasError`.
- `HafasServerError` – An error occured within the HAFAS endpoint, so that it can't fulfill the request; For example, this happens when HAFAS' internal backend is unavailable. Subclass of `HafasError`.

Each error has the following properties:

- `isHafasError` – Always `true`. Allows you to differente HAFAS-related errors from e.g. network errors.
- `code` – A string representing the error type for all other error classes, e.g. `INVALID_REQUEST` for `HafasInvalidRequestError`. `null` for plain `HafasError`s.
- `isCausedByServer` – Boolean, telling you if the HAFAS endpoint says that it couldn't process your request because *it* is unavailable/broken.
- `hafasCode` – A HAFAS-specific error code, if the HAFAS endpoint returned one; e.g. `H890` when no journeys could be found. `null` otherwise.
- `request` – The [Fetch API `Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) of the request.
- `url` – The URL of the request.
- `response` – The [Fetch API `Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response).

To check **if an error from `hafas-client` is HAFAS-specific, use `error instanceof HafasError`**:

```js
import {HafasError} from 'hafas-client/lib/errors.js'

try {
	await client.journeys(/* … */)
} catch (err) {
	if (err instanceof HafasError) {
		// HAFAS-specific error
	} else {
		// different error, e.g. network (ETIMEDOUT, ENETDOWN)
	}
}
```

To determine **if you should automatically retry an error, use `!error.causedByServer`**.

## Using `hafas-client` from another language

If you want to use `hafas-client` to access HAFAS APIs but work with non-Node.js environments, you can use [`hafas-client-rpc`](https://github.com/derhuerst/hafas-client-rpc) to create a [JSON-RPC](https://www.jsonrpc.org) interface that you can send commands to.

## Writing a profile

Check [the guide](writing-a-profile.md).

## General documentation for `mgate.exe` APIs

[`hafas-mgate-api.md`](hafas-mgate-api.md)
