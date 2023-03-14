# `journeysFromTrip(tripId, previousStopover, to, [opt])`

`to` must be an [*Friendly Public Transport Format* (FPTF) `stop`](https://github.com/public-transport/friendly-public-transport-format/blob/3bd36faa721e85d9f5ca58fb0f38cdbedb87bbca/spec/readme.md#stop) or [`station`](https://github.com/public-transport/friendly-public-transport-format/blob/3bd36faa721e85d9f5ca58fb0f38cdbedb87bbca/spec/readme.md#station). See [`journeys()`](journeys.md) for details.

With `opt`, you can override the default options, which look like this:

```js
{
	accessibility: 'none', // 'none', 'partial' or 'complete'
	stopovers: false, // return stations on the way?
	polylines: false, // return leg shapes?
	transferTime: 0, // minimum time for a single transfer in minutes
	tickets: false, // return tickets?
	remarks: true // parse & expose hints & warnings?
}
```

## Response

*Note:* The returned `departure` and `arrival` times include the current delay. The `departureDelay`/`arrivalDelay` fields express how much they differ from `plannedDeparture`/`plannedArrival`, respectively.

As an example, we're going to use the [*Deutsche Bahn* profile](../p/db):

```js
import {createClient} from 'hafas-client'
import {profile as dbProfile} from 'hafas-client/p/db/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!
const client = createClient(dbProfile, userAgent)

const berlinSüdkreuz = '8011113'
const münchenHbf = '8000261'
const kölnHbf = '8000207'

// find any journey from Berlin Südkreuz to München Hbf
const [journey] = await client.journeys(berlinSüdkreuz, münchenHbf, {results: 1, stopovers: true})
// find the ICE leg
const leg = journey.legs.find(l => l.line.product === 'nationalExpress')
// find the stopover at the stop you've just passed
const previousStopover = leg.stopovers.find(st => st.departure && new Date(st.departure) < Date.now())

// find journeys from the ICE train to Köln Hbf
const {
	journeys,
	realtimeDataUpdatedAt,
} = await client.journeysFromTrip(leg.id, previousStopover, kölnHbf)
```

`journeys` is an array of [FPTF `journey`s](https://github.com/public-transport/friendly-public-transport-format/blob/3bd36faa721e85d9f5ca58fb0f38cdbedb87bbca/spec/readme.md#journey), as documented in [`journeys()`](journeys.md).

`realtimeDataUpdatedAt` is a UNIX timestamp reflecting the latest moment when (at least some of) the response's realtime data have been updated.
