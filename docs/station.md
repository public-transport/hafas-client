# `station(id)`

`id` must be in one of these formats:

```js
// a station ID, in a format compatible with the profile you use
'900000123456'

// an FPTF `station` object
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

## Response

As an example, we're going to use the [VBB profile](../p/vbb):

```js
const createClient = require('hafas-client')
const vbbProfile = require('hafas-client/p/vbb')

const client = createClient(vbbProfile)

client.station('900000042101') // U Spichernstr.
.then(console.log)
.catch(console.error)
```

The response may look like this:

```js
{
	type: 'station',
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
		name: 'U1',
		public: true,
		class: 2,
		product: 'subway',
		mode: 'train',
		symbol: 'U',
		nr: 1,
		metro: false,
		express: false,
		night: false },
		// …
		{ type: 'line',
		id: 'n9',
		name: 'N9',
		public: true,
		class: 8,
		product: 'bus',
		mode: 'bus',
		symbol: 'N',
		nr: 9,
		metro: false,
		express: false,
		night: true
	} ]
}
```
