# hafas-client

**A client for HAFAS public transport APIs**. Sort of like [public-transport-enabler](https://github.com/schildbach/public-transport-enabler), but with a smaller scope. It [contains customisations](p) for [several public transportation networks](#supported-networksendpoints)

[![npm version](https://img.shields.io/npm/v/hafas-client.svg)](https://www.npmjs.com/package/hafas-client)
[![build status](https://img.shields.io/travis/public-transport/hafas-client.svg?branch=3)](https://travis-ci.org/public-transport/hafas-client)
![ISC-licensed](https://img.shields.io/github/license/public-transport/hafas-client.svg)
[![chat on gitter](https://badges.gitter.im/public-transport/Lobby.svg)](https://gitter.im/public-transport/Lobby)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Background

There's [a company called HaCon](https://hacon.de) that sells [a public transport management system called HAFAS](https://de.wikipedia.org/wiki/HAFAS). It is [used by companies all over Europe](https://gist.github.com/derhuerst/2b7ed83bfa5f115125a5) to serve routing and departure information for apps. All those endpoints are similar, with the same terms and API routes, but have slightly different options, filters and sets of enabled features.

`hafas-client` contains all logic for communicating with these, as well as serialising from and parsing to [*Friendly Public Transport Format (FPTF)* `1.2.0`](https://github.com/public-transport/friendly-public-transport-format/blob/1.2.0/spec/readme.md). Endpoint-specific customisations (called *profiles* here) increase the quality of the returned data.


## Installing

```shell
npm install hafas-client
```

### with [react-native](https://facebook.github.io/react-native/)

`hafas-client` as well its dependencies use [Node-builtin modules](https://nodejs.org/dist/latest/docs/api/) and [Node globals](https://nodejs.org/api/globals.html). To be able to use it within react-native, follow [the instructions at `node-libs-react-native`](https://github.com/parshap/node-libs-react-native/blob/3/README.md#usage).


## Usage

```js
const createClient = require('hafas-client')
const dbProfile = require('hafas-client/p/db')

// create a client with the Deutsche Bahn profile
const client = createClient(dbProfile, 'my-awesome-program')

// Berlin Jungfernheide to München Hbf
client.journeys('8011167', '8000261', {results: 1})
.then(console.log).catch(console.error)
```

`journeys()` returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve with an object with an array `journeys` that contains one [*FPTF* `journey`](https://github.com/public-transport/friendly-public-transport-format/blob/1.2.0/spec/readme.md#journey).

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
				/* … */
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
				/* … */
			},
			plannedDeparture: '2017-12-19T17:25:00+01:00',
			prognosedDeparture: null,
			departureDelay: null,

			destination: {
				type: 'station',
				id: '8098160',
				name: 'Berlin Hbf (tief)'
				/* … */
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
				/* … */
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
				/* … */
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
		/* … */
	} ]
	/* … */
}
```


## API

[API documentation](docs/readme.md)


## supported networks/endpoints

`hafas-client` has built-in customisations (called "profiles") for these public transportation networks:

HAFAS endpoint | wrapper library | docs | example code | source code
---------------|------------------|------|---------|------------
[Deutsche Bahn (DB)](https://en.wikipedia.org/wiki/Deutsche_Bahn) | [`db-hafas`](https://github.com/derhuerst/db-hafas) | [docs](p/db/readme.md) | [example code](p/db/example.js) | [src](p/db/index.js)
[Berlin & Brandenburg public transport (VBB)](https://en.wikipedia.org/wiki/Verkehrsverbund_Berlin-Brandenburg) | [`vbb-hafas`](https://github.com/derhuerst/vbb-hafas) | [docs](p/vbb/readme.md) | [example code](p/vbb/example.js) | [src](p/vbb/index.js)
[Berlin public transport (BVG)](https://en.wikipedia.org/wiki/Berliner_Verkehrsbetriebe) | [`bvg-hafas`](https://github.com/derhuerst/bvg-hafas) | [docs](p/bvg/readme.md) | [example code](p/bvg/example.js) | [src](p/bvg/index.js)
[Österreichische Bundesbahnen (ÖBB)](https://en.wikipedia.org/wiki/Austrian_Federal_Railways) | [`oebb-hafas`](https://github.com/juliuste/oebb-hafas) | [docs](p/oebb/readme.md) | [example code](p/oebb/example.js) | [src](p/oebb/index.js)
[Nahverkehr Sachsen-Anhalt (NASA)](https://de.wikipedia.org/wiki/Nahverkehrsservice_Sachsen-Anhalt)/[INSA](https://insa.de) | [`insa-hafas`](https://github.com/derhuerst/insa-hafas) | [docs](p/insa/readme.md) | [example code](p/insa/example.js) | [src](p/insa/index.js)
[Nahverkehrsverbund Schleswig-Holstein (NAH.SH)](https://de.wikipedia.org/wiki/Nahverkehrsverbund_Schleswig-Holstein) | [`nahsh-hafas`](https://github.com/juliuste/nahsh-hafas) | [docs](p/nahsh/readme.md) | [example code](p/nahsh/example.js) | [src](p/nahsh/index.js)
[Austin, Texas (CMTA/*CapMetro*)](https://en.wikipedia.org/wiki/Capital_Metropolitan_Transportation_Authority) | - | [docs](p/cmta/readme.md) | [example code](p/cmta/example.js) | [src](p/cmta/index.js)
[*S-Bahn München*](https://en.wikipedia.org/wiki/Munich_S-Bahn) | - | [docs](p/sbahn-muenchen/readme.md) | [example code](p/sbahn-muenchen/example.js) | [src](p/sbahn-muenchen/index.js)
*Saarfahrplan*/VGS ([Saarland](https://en.wikipedia.org/wiki/Saarland)) | - | [docs](p/saarfahrplan/readme.md) | [example code](p/saarfahrplan/example.js) | [src](p/saarfahrplan/index.js)
[Société Nationale des Chemins de Fer Luxembourgeois (CFL)](https://en.wikipedia.org/wiki/Société_Nationale_des_Chemins_de_Fer_Luxembourgeois) | - | [docs](p/cfl/readme.md) | [example code](p/cfl/example.js) | [src](p/cfl/index.js)
[Hamburg public transport (HVV)](https://en.wikipedia.org/wiki/Hamburger_Verkehrsverbund) | - | [docs](p/hvv/readme.md) | [example code](p/hvv/example.js) | [src](p/hvv/index.js)
[*Nordhessischer Verkehrsverbund (NVV)*](https://en.wikipedia.org/wiki/Nordhessischer_Verkehrsverbund) ([Hesse](https://en.wikipedia.org/wiki/Hesse)) | - | [docs](p/nvv/readme.md) | [example code](p/nvv/example.js) | [src](p/nvv/index.js)

There are also libraries that use `hafas-client` and pass their own profile in:

HAFAS endpoint | library
---------------|--------
[Betriebsstellen & disturbances in the German rail network](https://strecken.info/) | [`db-netz-hafas`](https://github.com/derhuerst/db-netz-hafas)


## Related

- [`public-transport-enabler`](https://github.com/schildbach/public-transport-enabler) – Unleash public transport data in your Java project.
- [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format#friendly-public-transport-format-fptf) – A format for APIs, libraries and datasets containing and working with public transport data.
- [`db-hafas`](https://github.com/derhuerst/db-hafas#db-hafas) – JavaScript client for the DB HAFAS API.
- [`vbb-hafas`](https://github.com/derhuerst/vbb-hafas#vbb-hafas) – JavaScript client for Berlin & Brandenburg public transport HAFAS API.
- [`observe-hafas-client`](https://github.com/derhuerst/observe-hafas-client) – Observe all departures/arrivals/etc. returned by `hafas-client`.
- [`cached-hafas-client`](https://github.com/derhuerst/cached-hafas-client) – Pass in a `hafas-client` instance, cache data from it.
- [`hafas-client-rpc`](https://github.com/derhuerst/hafas-client-rpc) – Make JSON-RPC calls to `hafas-client` via WebSockets & stdio.
- [`hafas-client-health-check`](https://github.com/derhuerst/hafas-client-health-check) – Check if a `hafas-client` instance and its endpoint work.
- [`hafas-rest-api`](https://github.com/derhuerst/hafas-rest-api#hafas-rest-api) – Expose a HAFAS client via an HTTP REST API.
- [List of european long-distance transport operators, available API endpoints, GTFS feeds and client modules.](https://github.com/public-transport/european-transport-operators)
- [Collection of european transport JavaScript modules.](https://github.com/public-transport/european-transport-modules)
- [`hafas-collect-departures-at`](https://github.com/derhuerst/hafas-collect-departures-at#hafas-collect-departures-at) – Utility to collect departures, using any HAFAS client.
- [`hafas-monitor-trips`](https://github.com/derhuerst/hafas-monitor-trips#hafas-monitor-trips) – Using a HAFAS client, watch all trips in a bounding box.
- [`hafas-monitor-departures`](https://github.com/derhuerst/hafas-monitor-departures#hafas-monitor-departures) – Pass in a HAFAS client, fetch all departures at any set of stations.
- [`hafas-record-delays`](https://github.com/derhuerst/hafas-record-delays#hafas-record-delays) – Record delays from `hafas-monitor-departures` into a LevelDB.
- [`hafas-monitor-journeys`](https://github.com/derhuerst/hafas-monitor-journeys) – Use `hafas-client` to monitor journeys from A to B.
- [`hafas-discover-stations`](https://github.com/derhuerst/hafas-discover-stations#hafas-discover-stations) – Pass in a HAFAS client, discover stations by querying departures.
- [`hafas-estimate-station-weight`](https://github.com/derhuerst/hafas-estimate-station-weight#hafas-estimate-station-weight) – Pass in a HAFAS client, estimate the importance of a station.


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/public-transport/hafas-client/issues).
