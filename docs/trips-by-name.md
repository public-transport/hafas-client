# `tripsByName([lineNameOrFahrtNr], [opt])`

Get all trips matching one or more criteria, e.g. a specific name.

## Response

As an example, we're going to use the [VBB profile](../p/vbb):

```js
import {createClient} from 'hafas-client'
import {profile as vbbProfile} from 'hafas-client/p/vbb/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!
const client = createClient(vbbProfile, userAgent)

const {
	trips,
	realtimeDataUpdatedAt,
} = await client.tripsByName('S1')
```

With `opt`, you can override the default options, which look like this:

```js
{
	// use either this
	when: null,
	// or these
	fromWhen: null, untilWhen: null,

	onlyCurrentlyRunning: true,
	products: {
		// these entries may vary from profile to profile
		suburban: true,
		subway: true,
		tram: true,
		bus: true,
		ferry: true,
		express: true,
		regional: true,
	},

	currentlyStoppingAt: null, // only show trips currently stopping at a stop/station, string
	lineName: null, // only show trips with this line name, string
	operatorNames: null, // only show trips with these operator names, array of strings
}
```

`realtimeDataUpdatedAt` is a UNIX timestamp reflecting the latest moment when (at least some of) the response's realtime data have been updated.

`trips` may look like this:

```js
[
	{
		id: '1|1214|0|86|16092020'
		direction: null,
		line: {
			type: 'line',
			id: 's1',
			fahrtNr: '325',
			name: 'S1',
			mode: 'train',
			product: 'suburban',
			// …
		},

		origin: {
			type: 'stop',
			id: '900000550239',
			name: 'Warnemünde, Bhf',
			location: { /* … */ },
			products: { /* … */ },
		},
		departure: '2020-09-16T04:03:00+02:00',
		plannedDeparture: '2020-09-16T04:03:00+02:00',
		departureDelay: null,
		departurePlatform: null,
		plannedDeparturePlatform: null,

		destination: {
			type: 'stop',
			id: '900000550002',
			name: 'Rostock, Hbf',
			location: { /* … */ },
			products: { /* … */ },
		},
		arrival: '2020-09-16T04:24:00+02:00',
		plannedArrival: '2020-09-16T04:24:00+02:00',
		arrivalDelay: null,
		arrivalPlatform: null,
		plannedArrivalPlatform: null,
	},
	// …
	{
		id: '1|62554|0|86|16092020'
		direction: null,
		line: {
			type: 'line',
			id: 's1',
			fahrtNr: '2001',
			name: 'S1',
			public: true,
			mode: 'train',
			product: 'suburban',
			// …
		},

		origin: { /* … */ },
		destination: { /* … */ },
		// …
	}
]
```
