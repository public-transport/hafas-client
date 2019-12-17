# `tripsByName(lineNameOrFahrtNr, [opt])`

Get all trips matching a name.

## Response

As an example, we're going to use the [VBB profile](../p/vbb):

```js
const createClient = require('hafas-client')
const vbbProfile = require('hafas-client/p/vbb')

const client = createClient(vbbProfile, 'my-awesome-program')

console.log(await client.tripsByName('S1'))
```

The response may look like this:

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
