# hafas-client

**A client for HAFAS public transport APIs**. Sort of like [public-transport-enabler](https://github.com/schildbach/public-transport-enabler), but with a smaller scope. It also [contains customisations](p) for the following transport networks:

- [Deutsche Bahn](https://en.wikipedia.org/wiki/Deutsche_Bahn) - [docs](p/db/readme.md) – [src](p/db/index.js)
- [Berlin public transport](https://en.wikipedia.org/wiki/Verkehrsverbund_Berlin-Brandenburg) - [docs](p/vbb/readme.md) – [src](p/vbb/index.js)

[![npm version](https://img.shields.io/npm/v/hafas-client.svg)](https://www.npmjs.com/package/hafas-client)
[![build status](https://img.shields.io/travis/derhuerst/hafas-client.svg)](https://travis-ci.org/derhuerst/hafas-client)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/hafas-client.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Background

There's [a company called HaCon](http://hacon.de) that sells [a public transport management system called HAFAS](https://de.wikipedia.org/wiki/HAFAS). It is [used by companies all over Europe](https://gist.github.com/derhuerst/2b7ed83bfa5f115125a5) to serve routing and departure information for apps. All those endpoints are similar, with the same terms and API routes, but have slightly different options, filters and enable features.

`hafas-client` contains all logic for communicating with these, as well as serialising from and parsing to [*Friendly Public Transport Format (FPTF)* `1.0.1`](https://github.com/public-transport/friendly-public-transport-format/blob/1.0.1/spec/readme.md). Endpoint-specific customisations (called "profiles" here) increase the quality of the returned data.


## Installing

```shell
npm install hafas-client
```


## Usage

```js
const createClient = require('hafas-client')
const dbProfile = require('hafas-client/p/db')

// create a client with Deutsche Bahn profile
const client = createClient(dbProfile)

// Berlin Jungfernheide to München Hbf
client.journeys('8011167', '8000261', {results: 1})
.then(console.log)
.catch(console.error)
```

The returned [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) will resolved with an array of one `journey` in the [*FPTF* `1.0.1`](https://github.com/public-transport/friendly-public-transport-format/blob/1.0.1/spec/readme.md).

```js
[ {
	parts: [ {
		id: '1|100067|48|81|17122017',
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
		departure: '2017-12-17T17:05:00.000+01:00',
		departurePlatform: '5',
		destination: {
			type: 'station',
			id: '8089118',
			name: 'Berlin Beusselstraße',
			location: { /* … */ },
			products: { /* … */ }
		},
		arrival: '2017-12-17T17:08:00.000+01:00',
		arrivalPlatform: '1',
		line: {
			type: 'line',
			id: '41172',
			name: 'S 41',
			public: true,
			mode: 'train',
			product: 'suburban',
			class: 16,
			productCode: 4
		},
		direction: 'Ringbahn ->'
	}, /* … */ {
		origin: {
			type: 'station',
			id: '730749',
			name: 'Berlin Hauptbahnhof (S+U), Berlin',
			location: {
				type: 'location',
				latitude: 52.526461,
				longitude: 13.369378
			},
			products: { /* … */ }
		},
		departure: '2017-12-17T17:25:00.000+01:00',
		destination: {
			type: 'station',
			id: '8098160',
			name: 'Berlin Hbf (tief)',
			location: { /* … */ },
			products: { /* … */ }
		},
		arrival: '2017-12-17T17:33:00.000+01:00',
		mode: 'walking',
		public: true
	}, {
		id: '1|70906|0|81|17122017',
		origin: {
			type: 'station',
			id: '8098160',
			name: 'Berlin Hbf (tief)',
			location: { /* … */ },
			products: { /* … */ }
		},
		departure: '2017-12-17T17:37:00.000+01:00',
		departurePlatform: '1',
		destination: {
			type: 'station',
			id: '8000261',
			name: 'München Hbf',
			location: { /* … */ },
			products: { /* … */ }
		},
		arrival: '2017-12-17T22:45:00.000+01:00',
		arrivalPlatform: '13',
		line: { /* … */ },
		direction: 'München Hbf'
	} ],
	origin: {
		type: 'station',
		id: '8089100',
		name: 'Berlin Jungfernheide (S)',
		location: {
			type: 'location',
			latitude: 52.530291,
			longitude: 13.299451
		},
		products: {
			nationalExp: false,
			national: false,
			regionalExp: false,
			regional: true,
			suburban: true,
			bus: true,
			ferry: false,
			subway: true,
			tram: false,
			taxi: false
		}
	},
	departure: '2017-12-17T17:05:00.000+01:00',
	destination: {
		type: 'station',
		id: '8000261',
		name: 'München Hbf',
		location: { /* … */ },
		products: { /* … */ }
	},
	arrival: '2017-12-17T22:45:00.000+01:00',
	price: {
		amount: null,
		hint: 'No pricing information available.'
	}
} ]
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/hafas-client/issues).
