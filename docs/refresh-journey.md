# `refreshJourney(refreshToken, [opt])`

`refreshToken` must be a string, taken from `journey.refreshToken`.

With `opt`, you can override the default options, which look like this:

```js
{
	stopovers: false, // return stations on the way?
	polylines: false, // return a shape for each leg?
	tickets: false, // return tickets? only available with some profiles
	subStops: true, // parse & expose sub-stops of stations?
	entrances: true, // parse & expose entrances of stops/stations?
	remarks: true, // parse & expose hints & warnings?
	language: 'en' // language to get results in
}
```

## Response

As an example, we're going to use the [VBB profile](../p/vbb):

```js
import {createClient} from 'hafas-client'
import {profile as vbbProfile} from 'hafas-client/p/vbb/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!
const client = createClient(vbbProfile, userAgent)

// Hauptbahnhof to Heinrich-Heine-Str.
const {journeys} = await client.journeys('900000003201', '900000100008', {results: 1})

// later, fetch up-to-date info on the journey
const {
	journey,
	realtimeDataUpdatedAt,
} = await client.refreshJourney(journeys[0].refreshToken, {stopovers: true, remarks: true})
```

`journey` is a *single* [*Friendly Public Transport Format* v2 draft](https://github.com/public-transport/friendly-public-transport-format/blob/3bd36faa721e85d9f5ca58fb0f38cdbedb87bbca/spec/readme.md) `journey`, in the same format as returned by [`journeys()`](journeys.md).

`realtimeDataUpdatedAt` is a UNIX timestamp reflecting the latest moment when (at least some of) the response's realtime data have been updated.
