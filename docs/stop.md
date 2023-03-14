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
	subStops: true, // parse & expose sub-stops of stations?
	entrances: true, // parse & expose entrances of stops/stations?
	linesOfStops: false, // parse & expose lines at the stop/station?
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

await client.stop('900000042101') // U Spichernstr.
```

The result may look like this:

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

If the endpoint returns a list of entrances for a station, the resulting station object will have an `entrances` array looking similar to this:

```js
[
	{type: 'location', latitude: 47.411069, longitude: 10.277412},
	{type: 'location', latitude: 47.410493, longitude: 10.277223},
	{type: 'location', latitude: 47.410754, longitude: 10.278023}
]
```
