# `departures(station, [opt])`

`station` must be in one of these formats:

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
```

With `opt`, you can override the default options, which look like this:

```js
{
	when:      new Date(),
	direction: null, // only show departures heading to this station
	line: null, // filter by line ID
	duration:  10, // show departures for the next n minutes
	results: null, // max. number of results; `null` means "whatever HAFAS wants"
	subStops: true, // parse & expose sub-stops of stations?
	entrances: true, // parse & expose entrances of stops/stations?
	linesOfStops: false, // parse & expose lines at the stop/station?
	remarks: true, // parse & expose hints & warnings?
	stopovers: false, // fetch & parse previous/next stopovers?
	// departures at related stations
	// e.g. those that belong together on the metro map.
	includeRelatedStations: true,
	language: 'en' // language to get results in
}
```

If you pass an object `opt.products`, its fields will partially override the default products defined in the profile. An example with the [BVG profile](../p/bvg):

```js
import {createClient} from 'hafas-client'
import {profile as vbbProfile} from 'hafas-client/p/vbb/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!
const client = createClient(vbbProfile, userAgent)

// will query with these products: suburban, subway, bus, express, regional
await client.departures('900000024101', {products: {tram: false, ferry: false}})
```

## Response

*Note:* As stated in the [*Friendly Public Transport Format* v2 draft spec](https://github.com/public-transport/friendly-public-transport-format/blob/3bd36faa721e85d9f5ca58fb0f38cdbedb87bbca/spec/readme.md), the `when` field includes the current delay. The `delay` field, if present, expresses how much the former differs from the schedule.

You may pass a departure's `tripId` into [`trip(id, lineName, [opt])`](trip.md) to get details on the whole trip.

As an example, we're going to use the [VBB profile](../p/vbb):

```js
import {createClient} from 'hafas-client'
import {profile as vbbProfile} from 'hafas-client/p/vbb/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!
const client = createClient(vbbProfile, userAgent)

// S Charlottenburg
const {
	departures,
	realtimeDataUpdatedAt,
} = await client.departures('900000024101', {duration: 3})
```

`realtimeDataUpdatedAt` is a UNIX timestamp reflecting the latest moment when (at least some) of the response's realtime data have been updated.

`departures` may look like this:

```js
[ {
	tripId: '1|31431|28|86|17122017',
	trip: 31431,
	direction: 'S Spandau',
	// Depending on the HAFAS endpoint, the destination may be present:
	destination: {
		type: 'stop',
		id: '900000029101',
		name: 'S Spandau',
		location: {
			type: 'location',
			id: '900029101',
			latitude: 52.534794,
			longitude: 13.197477
		},
		products: {
			suburban: true,
			subway: true,
			tram: false,
			bus: true,
			ferry: false,
			express: true,
			regional: true,
		},
	},
	line: {
		type: 'line',
		id: '18299',
		fahrtNr: '12345',
		mode: 'train',
		product: 'suburban',
		public: true,
		name: 'S9',
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
	currentTripPosition: {
		type: 'location',
		latitude: 52.500851,
		longitude: 13.283755,
	},

	stop: {
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

	when: '2017-12-17T19:32:00+01:00',
	plannedWhen: '2017-12-17T19:32:00+01:00',
	delay: null,
	platform: '2',
	plannedPlatform: '2'
}, {
	cancelled: true,
	tripId: '1|30977|8|86|17122017',
	trip: 30977,
	direction: 'S Westkreuz',
	line: {
		type: 'line',
		id: '16441',
		fahrtNr: '54321',
		mode: 'train',
		product: 'suburban',
		public: true,
		name: 'S5',
		symbol: 'S',
		nr: 5,
		metro: false,
		express: false,
		night: false,
		operator: { /* … */ }
	},
	currentTripPosition: {
		type: 'location',
		latitude: 52.505004,
		longitude: 13.322391,
	},

	stop: { /* … */ },

	when: null,
	plannedWhen: '2017-12-17T19:33:00+01:00'
	delay: null,
	platform: null,
	plannedPlatform: '2',
	prognosedPlatform: '2'
}, {
	tripId: '1|28671|4|86|17122017',
	trip: 28671,
	direction: 'U Rudow',
	line: {
		type: 'line',
		id: '19494',
		fahrtNr: '11111',
		mode: 'train',
		product: 'subway',
		public: true,
		name: 'U7',
		symbol: 'U',
		nr: 7,
		metro: false,
		express: false,
		night: false,
		operator: { /* … */ }
	},
	currentTripPosition: {
		type: 'location',
		latitude: 52.49864,
		longitude: 13.307622,
	},

	stop: { /* … */ },

	when: '2017-12-17T19:35:00+01:00',
	plannedWhen: '2017-12-17T19:35:00+01:00',
	delay: 0,
	platform: null,
	plannedPlatform: null
} ]
```
