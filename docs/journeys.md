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
	results: 5, // how many journeys?
	via: null, // let journeys pass this station
	passedStations: false, // return stations on the way?
	transfers: 5, // maximum of 5 transfers
	transferTime: 0, // minimum time for a single transfer in minutes
	accessibility: 'none', // 'none', 'partial' or 'complete'
	bike: false, // only bike-friendly journeys
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
	polylines: false // return a shape for each leg?
}
```

## Response

*Note:* As stated in the [*Friendly Public Transport Format* `1.0.1`](https://github.com/public-transport/friendly-public-transport-format/tree/1.0.1), the returned `departure` and `arrival` times include the current delay. The `departureDelay`/`arrivalDelay` fields express how much they differ from the schedule.

As an example, we're going to use the [VBB profile](../p/vbb):

```js
const createClient = require('hafas-client')
const vbbProfile = require('hafas-client/p/vbb')

const client = createClient(vbbProfile)

// Hauptbahnhof to Heinrich-Heine-Str.
client.journeys('900000003201', '900000100008', {
	results: 1,
	passedStations: true
})
.then(console.log)
.catch(console.error)
```

The response may look like this:

```js
[
	{
		legs: [ {
			id: '1|31041|35|86|17122017',
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
			departure: '2017-12-17T19:07:00.000+01:00',
			departurePlatform: '16',
			destination: {
				type: 'station',
				id: '900000024101',
				name: 'S Charlottenburg',
				location: {
					type: 'location',
					latitude: 52.504806,
					longitude: 13.303846
				},
				products: {
					suburban: true,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: true
				}
			},
			arrival: '2017-12-17T19:47:00.000+01:00',
			arrivalPlatform: '8',
			arrivalDelay: 30,
			line: {
				type: 'line',
				id: '16845',
				name: 'S7',
				public: true,
				mode: 'train',
				product: 'suburban',
				symbol: 'S',
				nr: 7,
				metro: false,
				express: false,
				night: false,
				productCode: 0,
				operator: {
					type: 'operator',
					id: 's-bahn-berlin-gmbh',
					name: 'S-Bahn Berlin GmbH'
				}
			},
			direction: 'S Potsdam Hauptbahnhof',
			passed: [ {
				station: {
					type: 'station',
					id: '900000003201',
					name: 'S+U Berlin Hauptbahnhof',
					location: { /* … */ },
					products: { /* … */ }
				},
				arrival: null,
				departure: null,
				cancelled: true
			}, {
				station: {
					type: 'station',
					id: '900000003102',
					name: 'S Bellevue',
					location: { /* … */ },
					products: { /* … */ }
				},
				arrival: '2017-12-17T19:09:00.000+01:00',
				departure: '2017-12-17T19:09:00.000+01:00'
			}, /* … */ {
				station: {
					type: 'station',
					id: '900000024101',
					name: 'S Charlottenburg',
					location: { /* … */ },
					products: { /* … */ }
				},
				arrival: '2017-12-17T19:17:00.000+01:00',
				departure: '2017-12-17T19:17:00.000+01:00'
			} ]
		} ]
	},
	earlierRef: '…', // use with the `earlierThan` option
	laterRef: '…' // use with the `laterThan` option
]
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

To get more journeys earlier/later than the current set of results, pass `journeys.earlierRef`/`journeys.laterRef` into `opt.earlierThan`/`opt.laterThan`. For example, query *later* journeys as follows:

```js
const hbf = '900000003201'
const heinrichHeineStr = '900000100008'

client.journeys(hbf, heinrichHeineStr)
.then((journeys) => {
	const lastJourney = journeys[journeys.length - 1]
	console.log('departure of last journey', lastJourney.legs[0].departure)

	// get later journeys
	return client.journeys(hbf, heinrichHeineStr, {
		laterThan: journeys.laterRef
	})
})
.then((laterJourneys) => {
	const firstJourney = laterourneys[laterJourneys.length - 1]
	console.log('departure of first (later) journey', firstJourney.legs[0].departure)
})
.catch(console.error)
```

```
departure of last journey 2017-12-17T19:07:00.000+01:00
departure of first (later) journey 2017-12-17T19:19:00.000+01:00
```

If you pass `polylines: true`, each journey leg will have a `polyline` field. Refer to [the section in the `journeyLeg()` docs](journey-leg.md#polyline-option) for details.
