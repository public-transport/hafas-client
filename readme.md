# hafas-client

**A client for the "mobile APIs" of [HAFAS](https://de.wikipedia.org/wiki/HAFAS) public transport management systems**.

[![npm version](https://img.shields.io/npm/v/hafas-client.svg)](https://www.npmjs.com/package/hafas-client)
![ISC-licensed](https://img.shields.io/github/license/public-transport/hafas-client.svg)
[![support Jannis via GitHub Sponsors](https://img.shields.io/badge/support%20Jannis-donate-fa7664.svg)](https://github.com/sponsors/derhuerst)
[![chat with Jannis on Twitter](https://img.shields.io/badge/chat%20with%20Jannis-on%20Twitter-1da1f2.svg)](https://twitter.com/derhuerst)

**[documentation](docs/readme.md)**


## Background

[A company called HaCon](https://hacon.de) sells [a public transport management system called HAFAS](https://de.wikipedia.org/wiki/HAFAS) to public transport authorities and providers, mostly in Europe. It provides routing and departure information to their customers.

Most customers get their own, **separate HAFAS deployments**; They all use the same terminology and API calls, but have slightly different versions, configurations and sets of enabled features. Using [built-in endpoint-specific customisations](p/readme.md), **`hafas-client` abstracts most of these differences away, and supports additional features in some cases**. Check the [list of supported networks/endpoints](p/readme.md#built-in-profiles) for more info.

*Note:* Currently, **`hafas-client` only supports "mobile API" endpoints**, which are designed for and used by the respective official mobile app(s); These endpoints almost always have `mgate.exe` in the URL. This library *does not* support "open API" endpoints (often they have `rest-proxy` or `openapi` in the URL) yet, but [#134](https://github.com/public-transport/hafas-client/pull/134) contains work in progress.

Strictly speaking, permission is necessary to use this library with a HAFAS "mobile" endpoint. It merely tries to remove the *technical* barrier of accessing the data, in order to kick-start an ecosystem or apps and services that will eventually rely on [*openly available* data](https://opendatahandbook.org/solutions/en/Public-Transport-Data/).


## Supported networks/endpoints

`hafas-client` has [built-in support for many public transportation networks](p/readme.md).

There are also libraries that use `hafas-client` and pass their own profile in:

HAFAS endpoint | library
---------------|--------
[Betriebsstellen & disturbances in the German rail network](http://strecken.info/) | [`db-netz-hafas`](https://github.com/derhuerst/db-netz-hafas)


## Installing

```shell
npm install hafas-client
```

### with [react-native](https://facebook.github.io/react-native/)

`hafas-client` as well its dependencies use [Node-builtin modules](https://nodejs.org/dist/latest/docs/api/) and [Node globals](https://nodejs.org/api/globals.html). To be able to use it within react-native, follow [the instructions at `node-libs-react-native`](https://github.com/parshap/node-libs-react-native/blob/master/README.md#usage).


## Usage

Pick the [profile](p/readme.md) for the HAFAS endpoint covering the area you want to get data for.

Because the operatores of the HAFAS endpoint should be able to contact you about excessive traffic, please pass a link to your project/program (or an email address) into `createClient()`:

```js
import {createClient} from 'hafas-client'
import {profile as dbProfile} from 'hafas-client/p/db/index.js'

// Adapt this to your project! createClient() won't work with this string.
const userAgent = 'link-to-your-project-or-email'

// create a client with the Deutsche Bahn profile
const client = createClient(dbProfile, userAgent)
```

You can now use `client` to query the HAFAS endpoint configured in the [`db` profile](p/db):

```js
// Berlin Jungfernheide to München Hbf
const res = await client.journeys('8011167', '8000261', {results: 1})
console.log(res)
```

`journeys()` returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve with an object with an array `journeys` that contains one [*Friendly Public Transport Format* (*FPTF*) v2 draft `journey`](https://github.com/public-transport/friendly-public-transport-format/blob/3bd36faa721e85d9f5ca58fb0f38cdbedb87bbca/spec/readme.md#journey).

```js
{
	journeys: [ {
		origin: {
			type: 'station',
			id: '8089100',
			name: 'Berlin Jungfernheide (S)',
			location: { /* … */ },
			products: { /* … */ }
		},
		departure: '2017-12-19T17:05:30+01:00',
		plannedDeparture: '2017-12-19T17:05:00+01:00',
		departureDelay: 30,
		departurePlatform: '5',
		plannedDeparturePlatform: '5',

		destination: {
			type: 'station',
			id: '8000261',
			name: 'München Hbf',
			location: { /* … */ },
			products: { /* … */ }
		},
		arrival: '2017-12-19T22:44:00+01:00',
		plannedArrival: '2017-12-19T22:45:00+01:00',
		arrivalDelay: -60,
		arrivalPlatform: '11A',
		plannedArrivalPlatform: '13',

		legs: [ {
			id: '1|100067|48|81|17122017',
			line: {
				type: 'line',
				id: '41172',
				name: 'S 41',
				public: true,
				mode: 'train',
				product: 'suburban',
				operator: {
					type: 'operator',
					id: 's-bahn-berlin-gmbh',
					name: 'S-Bahn Berlin GmbH'
				}
			},
			direction: 'Ringbahn ->',

			origin: {
				type: 'station',
				id: '8089100',
				name: 'Berlin Jungfernheide (S)',
				location: {
					type: 'location',
					latitude: 52.530291,
					longitude: 13.299451
				},
				products: { /* … */ }
			},
			departure: '2017-12-19T17:05:30+01:00',
			plannedDeparture: '2017-12-19T17:05:00+01:00',
			departureDelay: 30,
			departurePlatform: '5',
			plannedDeparturePlatform: '5',

			destination: {
				type: 'station',
				id: '8089118',
				name: 'Berlin Beusselstraße'
				// …
			},
			arrival: '2017-12-19T17:08:00+01:00',
			plannedArrival: '2017-12-19T17:08:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: '2a-b',
			plannedArrivalPlatform: '1'
		},
		/* more legs… */
		{
			walking: true,
			public: true,

			origin: {
				type: 'station',
				id: '730749',
				name: 'Berlin Hauptbahnhof (S+U), Berlin'
				// …
			},
			plannedDeparture: '2017-12-19T17:25:00+01:00',
			prognosedDeparture: null,
			departureDelay: null,

			destination: {
				type: 'station',
				id: '8098160',
				name: 'Berlin Hbf (tief)'
				// …
			},
			arrival: '2017-12-19T17:33:00+01:00',
			plannedArrival: '2017-12-19T17:33:00+01:00',
			arrivalDelay: null
		}, {
			id: '1|70906|0|81|17122017',
			line: { /* … */ },
			direction: 'München Hbf',

			origin: {
				type: 'station',
				id: '8098160',
				name: 'Berlin Hbf (tief)'
				// …
			},
			departure: '2017-12-19T17:35:00+01:00',
			plannedDeparture: '2017-12-19T17:37:00+01:00',
			departureDelay: -120,
			departurePlatform: '1',
			plannedDeparturePlatform: '1',

			destination: {
				type: 'station',
				id: '8000261',
				name: 'München Hbf',
				// …
			},
			arrival: '2017-12-19T22:44:00+01:00',
			plannedArrival: '2017-12-19T22:45:00+01:00',
			arrivalDelay: -60,
			arrivalPlatform: '11A',
			plannedArrivalPlatform: '13'
		} ],
		price: {
			amount: null,
			hint: 'No pricing information available.'
		}
		// …
	} ]
	// …
}
```

Each [profile](p/readme.md) has more detailed example code.

### in the browser

While `hafas-client` itself should work in the browser via a bundler like [Webpack](https://webpack.js.org), most HAFAS API endpoints don't allow [cross-origin resource sharing (CORS)](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), so you won't be able query them (without a proxy server).

### TypeScript

There are [community-maintained TypeScript typings available as `@types/hafas-client`](https://www.npmjs.com/package/@types/hafas-client).


## API

[API documentation](docs/readme.md)


## Related Projects

- [`*.transport.rest`](https://transport.rest/) – Public APIs wrapping some HAFAS endpoints.
- [`BahnhofsAbfahrten`](https://github.com/marudor/BahnhofsAbfahrten) a.k.a. [`marudor.de`](https://marudor.de/) – A very detailed public transport website for Germany. Uses HAFAS underneath, [has an API](https://docs.marudor.de).
- [`public-transport-enabler`](https://github.com/schildbach/public-transport-enabler) – Java equivalent to `hafas-client`, with support for more types of public transport APIs; Used by [Öffi](https://play.google.com/store/apps/details?id=de.schildbach.oeffi) & [Transportr](https://transportr.app).
- [`TripKit`](https://github.com/alexander-albers/tripkit) – Swift equivalent to `hafas-client`, with support for more types of public transport APIs; Used by [ÖPNV Navigator](https://apps.apple.com/de/app/öpnv-navigator/id1239908782).
- [`kpublictransport`](https://github.com/KDE/kpublictransport) – C++ equivalent to `hafas-client`, with support for more types of public transport APIs; Used by [KDE Itinerary](https://apps.kde.org/itinerary/).
- [`pyhafas`](https://github.com/n0emis/pyhafas) – Python equivalent to `hafas-client`, with support for more types of public transport APIs.
- [`hafas-rs`](https://cyberchaos.dev/yuka/hafas-rs/) – Rust equivalent to `hafas-client`.
- [`fshafas`](https://github.com/bergmannjg/fshafas) – F# port of `hafas-client`.
- [`hafas-client-php`](https://github.com/MrKrisKrisu/hafas-client-php) – PHP port of `hafas-client`.
- [*Transit*](https://jlnstrk.github.io/transit/) – Kotlin client for mutliple kinds of public transport APIs, with support for HAFAS APIs.
- [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format#friendly-public-transport-format-fptf) – A format for APIs, libraries and datasets containing and working with public transport data.
- [`observe-hafas-client`](https://github.com/public-transport/observe-hafas-client) – Observe all departures/arrivals/etc. returned by `hafas-client`.
- [`cached-hafas-client`](https://github.com/public-transport/cached-hafas-client) – Pass in a `hafas-client` instance, cache data from it.
- [`hafas-client-rpc`](https://github.com/derhuerst/hafas-client-rpc) – Make JSON-RPC calls to `hafas-client` via WebSockets & stdio.
- [`hafas-client-health-check`](https://github.com/public-transport/hafas-client-health-check) – Check if a `hafas-client` instance and its endpoint work.
- [`hafas-rest-api`](https://github.com/public-transport/hafas-rest-api#hafas-rest-api) – Expose a HAFAS client via an HTTP REST API.
- [List of european long-distance transport operators, available API endpoints, GTFS feeds and client modules.](https://github.com/public-transport/european-transport-operators)
- [Collection of european transport JavaScript modules.](https://github.com/public-transport/european-transport-modules)
- [`hafas-find-stations`](https://github.com/derhuerst/hafas-find-stations#hafas-find-stations) – Given a HAFAS client, find all stations in a bounding box.
- [`hafas-collect-departures-at`](https://github.com/public-transport/hafas-collect-departures-at#hafas-collect-departures-at) – Utility to collect departures, using any HAFAS client.
- [`find-hafas-data-in-another-hafas`](https://github.com/derhuerst/find-hafas-data-in-another-hafas#find-hafas-data-in-another-hafas) – Find data from one HAFAS endpoint in the data of another HAFAS endpoint.
- [`hafas-gtfs-rt-feed`](https://github.com/derhuerst/hafas-gtfs-rt-feed) – Generate a [GTFS Realtime (GTFS-RT)](https://developers.google.com/transit/gtfs-realtime/) feed by polling a HAFAS endpoint.
- [`hafas-monitor-trips`](https://github.com/derhuerst/hafas-monitor-trips#hafas-monitor-trips) – Using a HAFAS client, watch all trips in a bounding box.
- [`hafas-monitor-departures`](https://github.com/derhuerst/hafas-monitor-departures#hafas-monitor-departures) – Pass in a HAFAS client, fetch all departures at any set of stations.
- [`hafas-record-delays`](https://github.com/derhuerst/hafas-record-delays#hafas-record-delays) – Record delays from `hafas-monitor-departures` into a LevelDB.
- [`hafas-monitor-journeys`](https://github.com/derhuerst/hafas-monitor-journeys) – Use `hafas-client` to monitor journeys from A to B.
- [`hafas-discover-stations`](https://github.com/derhuerst/hafas-discover-stations#hafas-discover-stations) – Pass in a HAFAS client, discover stations by querying departures.
- [`hafas-estimate-station-weight`](https://github.com/derhuerst/hafas-estimate-station-weight#hafas-estimate-station-weight) – Pass in a HAFAS client, estimate the importance of a station.
- [`db-tickets`](https://github.com/envake/db-tickets) – A library to retrieve ticket information from Deutsche Bahn.

More related libraries can be found [via the npm package index](https://www.npmjs.com/search?q=hafas).


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, please [open an Issue](https://github.com/public-transport/hafas-client/issues).

This project needs help! Check the [list of "help wanted" Issues](https://github.com/public-transport/hafas-client/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22).

If you're contributing code, please read the [contribution guidelines](contributing.md).
