# `reachableFrom(address, [opt])`

This method can be used to get stations reachable within a certain time from an address. This concept is called [isochrone diagram](https://en.wikipedia.org/wiki/Isochrone_map#Transportation_planning).

*Note*: It appears that HAFAS cannot generate actual isochrones, but only the list of reachable stations, which you can estimate the isochrone(s) from.

`address` must be an [*FPTF* `location` object](https://github.com/public-transport/friendly-public-transport-format/blob/3bd36faa721e85d9f5ca58fb0f38cdbedb87bbca/spec/readme.md#location-objects).

With `opt`, you can override the default options, which look like this:

```js
{
	when: new Date(),
	maxTransfers: 5, // maximum of 5 transfers
	maxDuration: 20, // maximum travel duration in minutes, pass `null` for infinite
	products: {
		// These entries may vary from profile to profile!
		suburban: true,
		subway: true
		// …
	},
	subStops: true, // parse & expose sub-stops of stations?
	entrances: true, // parse & expose entrances of stops/stations?
}
```

## Response

`reachableFrom(address, [opt])` returns an array, in which each item has a `duration` and an array of [*Friendly Public Transport Format* `station`s](https://github.com/public-transport/friendly-public-transport-format/blob/3bd36faa721e85d9f5ca58fb0f38cdbedb87bbca/spec/readme.md#station).

As an example, we're going to use the [VBB profile](../p/vbb):

```js
import {createClient} from 'hafas-client'
import {profile as vbbProfile} from 'hafas-client/p/vbb/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!
const client = createClient(vbbProfile, userAgent)

const {
	reachable,
	realtimeDataUpdatedAt,
} = await client.reachableFrom({
	type: 'location',
	address: '13353 Berlin-Wedding, Torfstr. 17',
	latitude: 52.541797,
	longitude: 13.350042
}, {
	maxDuration: 10 // minutes
})
```

`realtimeDataUpdatedAt` is a UNIX timestamp reflecting the latest moment when (at least some of) the response's realtime data have been updated.

`reachable` may look like this:

```js
[
	{
		duration: 2,
		stations: [
			{
				type: 'stop',
				id: '900000009101',
				name: 'U Amrumer Str.',
				location: {type: 'location', latitude: 52.542201, longitude: 13.34953},
				products: { /* … */ }
			}
		]
	}, {
		duration: 3,
		stations: [
			{
				type: 'stop',
				id: '900000001201',
				name: 'S+U Westhafen',
				location: {type: 'location', latitude: 52.536179, longitude: 13.343839},
				products: { /* … */ }
			}
			// …
		]
	},
	// …
	{
		duration: 10,
		stations: [
			{
				type: 'stop',
				id: '900000001203',
				name: 'Döberitzer Str.',
				location: {type: 'location', latitude: 52.530668, longitude: 13.36811},
				products: { /* … */ }
			}
			// …
		]
	}
]
```
