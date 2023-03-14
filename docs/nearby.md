# `nearby(location, [opt])`

This method can be used to find stops/stations & POIs close to a location. Note that it is not supported by every profile/endpoint.

`location` must be an [*FPTF* `location` object](https://github.com/public-transport/friendly-public-transport-format/blob/3bd36faa721e85d9f5ca58fb0f38cdbedb87bbca/spec/readme.md#location-objects).

With `opt`, you can override the default options, which look like this:

```js
{
	results: 8, // maximum number of results
	distance: null, // maximum walking distance in meters
	poi:      false, // return points of interest?
	stops:    true, // return stops/stations?
	subStops: true, // parse & expose sub-stops of stations?
	entrances: true, // parse & expose entrances of stops/stations?
	linesOfStops: false, // parse & expose lines at each stop/station?
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

await client.nearby({
	type: 'location',
	latitude: 52.5137344,
	longitude: 13.4744798
}, {distance: 400})
```

The result may look like this:

```js
[ {
	type: 'stop',
	id: '900000120001',
	name: 'S+U Frankfurter Allee',
	location: {
		type: 'location',
		latitude: 52.513616,
		longitude: 13.475298
	},
	products: {
		suburban: true,
		subway: true,
		tram: true,
		bus: true,
		ferry: false,
		express: false,
		regional: false
	},
	distance: 56
}, {
	type: 'stop',
	id: '900000120540',
	name: 'Scharnweberstr./Weichselstr.',
	location: {
		type: 'location',
		latitude: 52.512339,
		longitude: 13.470174
	},
	products: { /* … */ },
	distance: 330
}, {
	type: 'stop',
	id: '900000160544',
	name: 'Rathaus Lichtenberg',
	location: {
		type: 'location',
		latitude: 52.515908,
		longitude: 13.479073
	},
	products: { /* … */ },
	distance: 394
} ]
```
