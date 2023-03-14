# `locations(query, [opt])`

`query` must be an string (e.g. `'Alexanderplatz'`).

With `opt`, you can override the default options, which look like this:

```js
{
	  fuzzy:     true // find only exact matches?
	, results:   5 // how many search results?
	, stops:     true // return stops/stations?
	, addresses: true
	, poi:       true // points of interest
	, subStops: true // parse & expose sub-stops of stations?
	, entrances: true // parse & expose entrances of stops/stations?
	, linesOfStops: false // parse & expose lines at each stop/station?
	, language: 'en' // language to get results in
}
```

## Response

As an example, we're going to use the [VBB profile](../p/vbb):

```js
import {createClient} from 'hafas-client'
import {profile as vbbProfile} from 'hafas-client/p/vbb/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!
const client = createClient(vbbProfile, userAgent)

await client.locations('Alexanderplatz', {results: 3})
```

The result may look like this:

```js
[ {
	type: 'stop',
	id: '900000100003',
	name: 'S+U Alexanderplatz',
	location: {
		type: 'location',
		latitude: 52.521508,
		longitude: 13.411267
	},
	products: {
		suburban: true,
		subway: true,
		tram: true,
		bus: true,
		ferry: false,
		express: false,
		regional: true
	}
}, { // point of interest
	type: 'location',
	id: '900980709',
	poi: true,
	name: 'Berlin, Holiday Inn Centre Alexanderplatz****',
	latitude: 52.523549,
	longitude: 13.418441
}, { // point of interest
	type: 'location',
	id: '900980176',
	poi: true,
	name: 'Berlin, Hotel Agon am Alexanderplatz',
	latitude: 52.524556,
	longitude: 13.420266
} ]
```
