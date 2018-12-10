# `stop(id, [opt])`

`id` must be in one of these formats:

```js
// a stop/station ID, in a format compatible with the profile you use
'900000123456'

// an FPTF `stop`/`station` object
{
	type: 'station',
	id: '900000123456',
	name: 'foo station',
	location: {
		type: 'location',
		latitude: 1.23,
		longitude: 3.21
	}
}
```

With `opt`, you can override the default options, which look like this:

```js
{
	stationLines: false, // parse & expose lines of the stop/station?
	language: 'en' // language to get results in
}
```

## Response

As an example, we're going to use the [VBB profile](../p/vbb):

```js
const createClient = require('hafas-client')
const vbbProfile = require('hafas-client/p/vbb')

const client = createClient(vbbProfile, 'my-awesome-program')

client.stop('900000042101') // U Spichernstr.
.then(console.log)
.catch(console.error)
```

The response may look like this:

```js
{
	type: 'stop',
	id: '900000042101',
	name: 'U Spichernstr.',
	location: {
		type: 'location',
		latitude: 52.496581,
		longitude: 13.330616
	},
	products: {
		suburban: false,
		subway: true,
		tram: false,
		bus: true,
		ferry: false,
		express: false,
		regional: false
	},
	lines: [ {
		type: 'line',
		id: 'u1',
		mode: 'train',
		product: 'subway',
		public: true,
		name: 'U1',
		symbol: 'U',
		nr: 1,
		metro: false,
		express: false,
		night: false
	},
	// …
	{
		type: 'line',
		id: 'n9',
		mode: 'bus',
		product: 'bus',
		public: true,
		name: 'N9',
		symbol: 'N',
		nr: 9,
		metro: false,
		express: false,
		night: true
	} ]
}
```
