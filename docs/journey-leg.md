# `journeyLeg(ref, lineName, [opt])`

This method can be used to refetch information about a leg of a journey. Note that it is not supported by every profile/endpoint.

Let's say you used [`journeys`](journeys.md) and now want to get more up-to-date data about the arrival/departure of a leg. You'd pass in a journey leg `id` like `'1|24983|22|86|18062017'`. `lineName` must be the name of the journey leg's `line.name`. You can get them like this:

```js
const createClient = require('hafas-client')
const vbbProfile = require('hafas-client/p/vbb')

const client = createClient(vbbProfile)

// Hauptbahnhof to Heinrich-Heine-Str.
client.journeys('900000003201', '900000100008', {results: 1})
.then(([journey]) => {
	const leg = journey.legs[0]
	return client.journeyLeg(leg.id, leg.line.name)
})
.then(console.log)
.catch(console.error)
```

With `opt`, you can override the default options, which look like this:

```js
{
	when: new Date(),
	passedStations: true, // return stations on the way?
	polyline: false // return a shape for the leg?
}
```

## Response

*Note:* As stated in the [*Friendly Public Transport Format* `1.0.1`](https://github.com/public-transport/friendly-public-transport-format/tree/1.0.1), the returned `departure` and `arrival` times include the current delay. The `departureDelay`/`arrivalDelay` fields express how much they differ from the schedule.

As an example, we're going to use the [VBB profile](../p/vbb):

```js
const createClient = require('hafas-client')
const vbbProfile = require('hafas-client/p/vbb')

const client = createClient(vbbProfile)

client.journeyLeg('1|31431|28|86|17122017', 'S9', {when: 1513534689273})
.then(console.log)
.catch(console.error)
```

The response looked like this:

```js
{
	id: '1|31431|28|86|17122017',
	origin: {
		type: 'station',
		id: '900000260005',
		name: 'S Flughafen Berlin-Schönefeld',
		location: {
			type: 'location',
			latitude: 52.390796,
			longitude: 13.51352
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
	departure: '2017-12-17T18:37:00.000+01:00',
	departurePlatform: '13',
	destination: {
		type: 'station',
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
	arrival: '2017-12-17T19:49:00.000+01:00',
	arrivalPlatform: '2',
	line: {
		type: 'line',
		id: '18299',
		name: 'S9',
		public: true,
		mode: 'train',
		product: 'suburban',
		symbol: 'S',
		nr: 9,
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
	direction: 'S Spandau',
	passed: [ /* … */ ]
}
```

### `polyline` option

If you pass `polyline: true`, the leg will have a `polyline` field, containing a [GeoJSON](http://geojson.org) [`FeatureCollection`](https://tools.ietf.org/html/rfc7946#section-3.3) of [`Point`s](https://tools.ietf.org/html/rfc7946#appendix-A.1). Every `Point` next to a station will have `properties` containing the station's metadata.

We'll look at an example for *U6* from *Alt-Mariendorf* to *Alt-Tegel*, taken from the [VBB profile](../p/vbb):

```js
{
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			properties: {
				type: 'station',
				id: '900000070301',
				name: 'U Alt-Mariendorf',
				/* … */
			},
			geometry: {
				type: 'Point',
				coordinates: [13.3875, 52.43993] // longitude, latitude
			}
		},
		/* … */
		{
			type: 'Feature',
			properties: {
				type: 'station',
				id: '900000017101',
				name: 'U Mehringdamm',
				/* … */
			},
			geometry: {
				type: 'Point',
				coordinates: [13.38892, 52.49448] // longitude, latitude
			}
		},
		/* … */
		{
			// intermediate point, without associated station
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'Point',
				coordinates: [13.28599, 52.58742] // longitude, latitude
			}
		},
		{
			type: 'Feature',
			properties: {
				type: 'station',
				id: '900000089301',
				name: 'U Alt-Tegel',
				/* … */
			},
			geometry: {
				type: 'Point',
				coordinates: [13.28406, 52.58915] // longitude, latitude
			}
		}
	]
}
```
