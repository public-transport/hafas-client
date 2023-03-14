# `journeys(from, to, [opt])`

`from` and `to` each must be in one of these formats:

```js
// a station ID, in a format compatible to the profile you use
'900000013102'

// an FPTF `station` object
{
	type: 'station',
	id: '900000013102',
	name: 'foo station',
	location: {
		type: 'location',
		latitude: 1.23,
		longitude: 3.21
	}
}

// a point of interest, which is an FPTF `location` object
{
	type: 'location',
	id: '123',
	poi: true,
	name: 'foo restaurant',
	latitude: 1.23,
	longitude: 3.21
}

// an address, which is an FTPF `location` object
{
	type: 'location',
	address: 'foo street 1',
	latitude: 1.23,
	longitude: 3.21
}
```

With `opt`, you can override the default options, which look like this:

```js
{
	// Use either `departure` or `arrival` to specify a date/time.
	departure: new Date(),
	arrival: null,

	earlierThan: null, // ref to get journeys earlier than the last query
	laterThan: null, // ref to get journeys later than the last query

	results: null, // number of journeys – `null` means "whatever HAFAS returns"
	via: null, // let journeys pass this station
	stopovers: false, // return stations on the way?
	transfers: -1, // Maximum nr of transfers. Default: Let HAFAS decide.
	transferTime: 0, // minimum time for a single transfer in minutes
	accessibility: 'none', // 'none', 'partial' or 'complete'
	bike: false, // only bike-friendly journeys
	walkingSpeed: 'normal', // 'slow', 'normal', 'fast'
	// Consider walking to nearby stations at the beginning of a journey?
	startWithWalking: true,
	products: {
		// these entries may vary from profile to profile
		suburban: true,
		subway: true,
		tram: true,
		bus: true,
		ferry: true,
		express: true,
		regional: true
	},
	tickets: false, // return tickets? only available with some profiles
	polylines: false, // return a shape for each leg?
	subStops: true, // parse & expose sub-stops of stations?
	entrances: true, // parse & expose entrances of stops/stations?
	remarks: true, // parse & expose hints & warnings?
	scheduledDays: false, // parse which days each journey is valid on
	language: 'en', // language to get results in
}
```

## Response

*Note:* As stated in the [*Friendly Public Transport Format* v2 draft spec](https://github.com/public-transport/friendly-public-transport-format/blob/3bd36faa721e85d9f5ca58fb0f38cdbedb87bbca/spec/readme.md), the returned `departure` and `arrival` times include the current delay. The `departureDelay`/`arrivalDelay` fields express how much they differ from the schedule.

As an example, we're going to use the [VBB profile](../p/vbb):

```js
import {createClient} 'hafas-client'
import {profile as vbbProfile} from 'hafas-client/p/vbb/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!
const client = createClient(vbbProfile, userAgent)

// Hauptbahnhof to Heinrich-Heine-Str.
await client.journeys('900000003201', '900000100008', {
	results: 1,
	stopovers: true
})
```

`journeys()` will resolve with an object with the following fields:
- `journeys`
- `earlierRef`/`laterRef` – pass them as `opt.earlierThan`/`opt.laterThan` into another `journeys()` call to retrieve the next "page" of journeys
- `realtimeDataUpdatedAt` – a UNIX timestamp reflecting the latest moment when (at least some of) the response's realtime data have been updated

This object might look like this:

```js
{
	journeys: [ {
		legs: [ {
			tripId: '1|32615|6|86|10072018',
			direction: 'S Ahrensfelde',
			line: {
				type: 'line',
				id: '16845',
				fahrtNr: '12345',
				name: 'S7',
				public: true,
				mode: 'train',
				product: 'suburban',
				operator: {
					type: 'operator',
					id: 's-bahn-berlin-gmbh',
					name: 'S-Bahn Berlin GmbH'
				},
				symbol: 'S',
				nr: 7,
				metro: false,
				express: false,
				night: false
			},
			currentLocation: {
				type: 'location',
				latitude: 52.51384,
				longitude: 13.526806,
			},

			origin: {
				type: 'station',
				id: '900000003201',
				name: 'S+U Berlin Hauptbahnhof',
				location: {
					type: 'location',
					latitude: 52.52585,
					longitude: 13.368928
				},
				products: {
					suburban: true,
					subway: true,
					tram: true,
					bus: true,
					ferry: false,
					express: true,
					regional: true
				}
			},
			departure: '2018-07-10T23:54:00+02:00',
			plannedDeparture: '2018-07-10T23:53:00+02:00',
			departureDelay: 60,
			departurePlatform: '15',
			plannedDeparturePlatform: '14',

			destination: {
				type: 'station',
				id: '900000100004',
				name: 'S+U Jannowitzbrücke',
				location: {
					type: 'location',
					latitude: 52.504806,
					longitude: 13.303846
				},
				products: { /* … */ }
			},
			arrival: '2018-07-11T00:02:00+02:00',
			plannedArrival: '2018-07-11T00:01:00+02:00',
			arrivalDelay: 60,
			arrivalPlatform: '3',
			plannedArrivalPlatform: '3',

			stopovers: [ {
				stop: {
					type: 'station',
					id: '900000003201',
					name: 'S+U Berlin Hauptbahnhof',
					/* … */
				},

				arrival: null,
				plannedArrival: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,

				remarks: [
					{type: 'hint', code: 'bf', text: 'barrier-free'},
					{type: 'hint', code: 'FB', text: 'Bicycle conveyance'}
				]
			}, {
				stop: {
					type: 'station',
					id: '900000100001',
					name: 'S+U Friedrichstr.',
					/* … */
				},

				cancelled: true,
				arrival: null,
				plannedArrival: '2018-07-10T23:55:00+02:00',
				prognosedArrival: '2018-07-10T23:56:00+02:00',
				arrivalDelay: 60,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,

				departure: null,
				plannedDeparture: '2018-07-10T23:56:00+02:00',
				prognosedDeparture: '2018-07-10T23:57:00+02:00',
				departureDelay: 60,
				departurePlatform: null,
				plannedDeparturePlatform: null,

				remarks: [ /* … */ ]
			},
			/* … */
			{
				stop: {
					type: 'station',
					id: '900000100004',
					name: 'S+U Jannowitzbrücke',
					/* … */
				},

				arrival: '2018-07-11T00:02:00+02:00',
				plannedArrival: '2018-07-11T00:01:00+02:00',
				arrivalDelay: 60,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,

				departure: '2018-07-11T00:02:00+02:00',
				plannedDeparture: '2018-07-11T00:02:00+02:00',
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,

				remarks: [ /* … */ ]
			} ]
		}, {
			public: true,
			walking: true,
			distance: 558,

			origin: {
				type: 'station',
				id: '900000100004',
				name: 'S+U Jannowitzbrücke',
				location: { /* … */ },
				products: { /* … */ }
			},
			departure: '2018-07-11T00:01:00+02:00',

			destination: {
				type: 'station',
				id: '900000100008',
				name: 'U Heinrich-Heine-Str.',
				location: { /* … */ },
				products: { /* … */ }
			},
			arrival: '2018-07-11T00:10:00+02:00'
		} ]
	} ],
	earlierRef: '…', // use with the `earlierThan` option
	laterRef: '…' // use with the `laterThan` option
	realtimeDataUpdatedAt: 1531259400, // 2018-07-10T23:50:00+02
}
```

Some [profiles](../p) are able to parse the ticket information, if returned by the API. For example, if you pass `tickets: true` with the [VBB profile](../p/vbb), each `journey` will have a tickets array that looks like this:

```js
[ {
	name: 'Berlin Tarifgebiet A-B: Einzelfahrausweis – Regeltarif',
	price: 2.8,
	tariff: 'Berlin',
	coverage: 'AB',
	variant: 'adult',
	amount: 1
}, {
	name: 'Berlin Tarifgebiet A-B: Einzelfahrausweis – Ermäßigungstarif',
	price: 1.7,
	tariff: 'Berlin',
	coverage: 'AB',
	variant: 'reduced',
	amount: 1,
	reduced: true
}, /* … */ {
	name: 'Berlin Tarifgebiet A-B: Tageskarte – Ermäßigungstarif',
	price: 4.7,
	tariff: 'Berlin',
	coverage: 'AB',
	variant: '1 day, reduced',
	amount: 1,
	reduced: true,
	fullDay: true
}, /* … */ {
	name: 'Berlin Tarifgebiet A-B: 4-Fahrten-Karte – Regeltarif',
	price: 9,
	tariff: 'Berlin',
	coverage: 'AB',
	variant: '4x adult',
	amount: 4
} ]
```

If a journey leg has been cancelled, a `cancelled: true` will be added. Also, `departure`/`departureDelay`/`departurePlatform` and `arrival`/`arrivalDelay`/`arrivalPlatform` will be `null`.

To get more journeys earlier/later than the current set of results, pass `earlierRef`/`laterRef` into `opt.earlierThan`/`opt.laterThan`. For example, query *later* journeys as follows:

```js
const hbf = '900000003201'
const heinrichHeineStr = '900000100008'

const res1 = await client.journeys(hbf, heinrichHeineStr)
const lastJourney = res1.journeys[res1.journeys.length - 1]
console.log('departure of last journey', lastJourney.legs[0].departure)

// get later journeys
const res2 = await client.journeys(hbf, heinrichHeineStr, {
	laterThan: res1.laterRef
})
const firstLaterJourney = res2.journeys[res2.journeys.length - 1]
console.log('departure of first (later) journey', firstLaterJourney.legs[0].departure)
```

```
departure of last journey 2017-12-17T19:07:00+01:00
departure of first (later) journey 2017-12-17T19:19:00+01:00
```

If you pass `polylines: true`, each journey leg will have a `polyline` field. Refer to [the section in the `trip()` docs](trip.md#polyline-option) for details.

If you pass `scheduledDays: true`, each journey will have a `scheduledDays` object looking like this:

```js
{
	'2018-01-01': true,
	'2018-01-02': false,
	// …
	'2018-10-12': true,
	'2018-10-13': true,
	// …
	'2019-01-02': false,
	'2019-01-03': false
}
```
