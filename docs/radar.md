# `radar({north, west, south, east}, [opt])`

Use this method to find all vehicles currently in an area. Note that it is not supported by every profile/endpoint.

`north`, `west`, `south` and `eath` must be numbers (e.g. `52.52411`). Together, they form a [bounding box](https://en.wikipedia.org/wiki/Minimum_bounding_box).

With `opt`, you can override the default options, which look like this:

```js
{
	results: 256, // maximum number of vehicles
	duration: 30, // compute frames for the next n seconds
	frames: 3, // nr of frames to compute
	polylines: true, // return a track shape for each vehicle?
	language: 'en' // language to get results in
}
```

## Response

*Note:* As stated in the [*Friendly Public Transport Format* `1.2.0`](https://github.com/public-transport/friendly-public-transport-format/tree/1.2.0), the returned `departure` and `arrival` times include the current delay. The `departureDelay`/`arrivalDelay` fields express how much they differ from the schedule.

As an example, we're going to use the [VBB profile](../p/vbb):

```js
const createClient = require('hafas-client')
const vbbProfile = require('hafas-client/p/vbb')

const client = createClient(vbbProfile, 'my-awesome-program')

client.radar({
	north: 52.52411,
	west: 13.41002,
	south: 52.51942,
	east: 13.41709
}, {results: 5})
.then(console.log)
.catch(console.error)
```

The response may look like this:

```js
[ {
	location: {
		type: 'location',
		latitude: 52.521508,
		longitude: 13.411267
	},
	line: {
		type: 'line',
		id: 's9',
		fahrtNr: '12345',
		name: 'S9',
		public: true,
		mode: 'train',
		product: 'suburban',
		symbol: 'S',
		nr: 9,
		metro: false,
		express: false,
		night: false,
		operator: {
			type: 'operator',
			id: 's-bahn-berlin-gmbh',
			name: 'S-Bahn Berlin GmbH'
		}
	},
	direction: 'S Flughafen Berlin-Schönefeld',
	trip: 31463,
	nextStopovers: [ {
		stop: {
			type: 'stop',
			id: '900000029101',
			name: 'S Spandau',
			location: {
				type: 'location',
				latitude: 52.534794,
				longitude: 13.197477
			},
			products: {
				suburban: true,
				subway: false,
				tram: false,
				bus: true,
				ferry: false,
				express: true,
				regional: true
			}
		},
		arrival: null,
		plannedArrival: null,
		arrivalDelay: null,
		arrivalPlatform: null,
		plannedArrivalPlatform: null,
		departure: null,
		plannedDeparture: '2017-12-17T19:16:00+01:00',
		departureDelay: null,
		departurePlatform: null,
		plannedDeparturePlatform: '1'
	} /* … */ ],
	frames: [ {
		origin: {
			type: 'stop',
			id: '900000100003',
			name: 'S+U Alexanderplatz',
			location: { /* … */ },
			products: { /* … */ }
		},
		destination: {
			type: 'stop',
			id: '900000100004',
			name: 'S+U Jannowitzbrücke',
			location: { /* … */ },
			products: { /* … */ }
		},
		t: 0
	}, /* … */ {
		origin: { /* Alexanderplatz */ },
		destination: { /* Jannowitzbrücke */ },
		t: 30000
	} ]
}, {
	location: {
		type: 'location',
		latitude: 52.523297,
		longitude: 13.411151
	},
	line: {
		type: 'line',
		id: 'm2',
		fahrtNr: '54321',
		name: 'M2',
		public: true,
		mode: 'train',
		product: 'tram',
		symbol: 'M',
		nr: 2,
		metro: true,
		express: false,
		night: false,
		operator: {
			type: 'operator',
			id: 'berliner-verkehrsbetriebe',
			name: 'Berliner Verkehrsbetriebe'
		}
	},
	direction: 'Heinersdorf',
	trip: 26321,
	nextStopovers: [ {
		stop: { /* S+U Alexanderplatz/Dircksenstr. */ },
		arrival: null,
		plannedArrival: null,
		arrivalDelay: null,
		departure: null,
		plannedAeparture: '2017-12-17T19:52:00+01:00',
		departureDelay: null
	}, {
		stop: { /* Memhardstr. */ },
		arrival: null,
		plannedArrival: '2017-12-17T19:54:00+01:00',
		arrivalDelay: null,
		arrivalPlatform: null,
		plannedArrivalPlatform: null,
		departure: null,
		plannedDeparture: '2017-12-17T19:54:00+01:00',
		departureDelay: null,
		departurePlatform: null,
		plannedDeparturePlatform: '1'
	}, /* … */ ],
	frames: [ {
		origin: { /* S+U Alexanderplatz/Dircksenstr. */ },
		destination: { /* Memhardstr. */ },
		t: 0
	}, /* … */ {
		origin: { /* Memhardstr. */ },
		destination: { /* Mollstr./Prenzlauer Allee */ },
		t: 30000
	} ]
}, /* … */ ]
```

If you pass `polylines: true`, each movement will have a `polyline` field, as documented in [the corresponding section in the `trip()` docs](trip.md#polyline-option), with the exception that station info is missing.
