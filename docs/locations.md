# `locations(query, [opt])`

`query` must be an string (e.g. `'Alexanderplatz'`).

With `opt`, you can override the default options, which look like this:

```js
{
	  fuzzy:     true // find only exact matches?
	, results:   5 // how many search results?
	, stations:  true
	, addresses: true
	, poi:       true // points of interest
	, stationLines: false // parse & expose lines of the station?
	, language: 'en' // language to get results in
}
```

## Response

As an example, we're going to use the [VBB profile](../p/vbb):

```js
const createClient = require('hafas-client')
const vbbProfile = require('hafas-client/p/vbb')

const client = createClient(vbbProfile, 'my-awesome-program')

client.locations('Alexanderplatz', {results: 3})
.then(console.log)
.catch(console.error)
```

The response may look like this:

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
	name: 'Berlin, Holiday Inn Centre Alexanderplatz****',
	latitude: 52.523549,
	longitude: 13.418441
}, { // point of interest
	type: 'location',
	id: '900980176',
	name: 'Berlin, Hotel Agon am Alexanderplatz',
	latitude: 52.524556,
	longitude: 13.420266
} ]
```
