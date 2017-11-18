# hafas-client

**A client for HAFAS public transport APIs**. Sort of like [public-transport-enable](https://github.com/schildbach/public-transport-enabler), but with a smaller scope. It also contains customisations for the following transport networks:

- [Deutsche Bahn](https://en.wikipedia.org/wiki/Deutsche_Bahn) – [src](p/db/index.js)
- [Berlin public transport](https://en.wikipedia.org/wiki/Verkehrsverbund_Berlin-Brandenburg) – [src](p/vbb/index.js)

[![npm version](https://img.shields.io/npm/v/hafas-client.svg)](https://www.npmjs.com/package/hafas-client)
[![build status](https://img.shields.io/travis/derhuerst/hafas-client.svg)](https://travis-ci.org/derhuerst/hafas-client)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/hafas-client.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Background

There's [a company called HaCon](http://hacon.de) that sells [a public transport management system called HAFAS](https://de.wikipedia.org/wiki/HAFAS). It is [used by companies all over Europe](https://gist.github.com/derhuerst/2b7ed83bfa5f115125a5) to serve routing and departure information for apps. All those endpoints are similar, with the same terms and API routes, but have slightly different options, filters and enable features.

`hafas-client` contains all logic for communicating with these, as well as serialising from and parsing to [FPTF](https://github.com/public-transport/friendly-public-transport-format). Endpoint-specific customisations increase the quality of the returned data.


## Installing

```shell
npm install hafas-client
```


## Usage

```js
const createClient = require('hafas-client')
const dbProfile = require('hafas-client/p/db')

const client = createClient(dbProfile)

// Berlin Jungfernheide to München Hbf
client.journeys('8011167', '8000261', {results: 1})
.then(console.log)
.catch(console.error)
```

```js
[ {
	origin: {
		type: 'station',
		id: '8089100',
		name: 'Berlin Jungfernheide (S)',
		coordinates: {
			latitude: 52.530291,
			longitude: 13.299451
		},
		products: { /* … */ }
	},
	departure: '2017-11-13T01:00:00Z',

	destination: {
		type: 'station',
		id: '8000261',
		name: 'München Hbf',
		coordinates: {
			latitude: 48.140364,
			longitude: 11.558735
		},
		products: { /* … */ }
	},
	arrival: '2017-11-13T09:39:00Z',

	parts: [ {
		id: '1|1436339|0|80|12112017',

		origin: {
			type: 'station',
			id: '8089100',
			name: 'Berlin Jungfernheide (S)',
			coordinates: {
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
		departure: '2017-11-13T00:50:00Z',
		departurePlatform: '6',

		destination: {
			type: 'station',
			id: '8089047',
			name: 'Berlin Westkreuz',
			coordinates: {
				latitude: 52.500752,
				longitude: 13.283854
			},
			products: {
				nationalExp: false,
				national: false,
				regionalExp: false,
				regional: true,
				suburban: true,
				bus: true,
				ferry: false,
				subway: false,
				tram: false,
				taxi: false
			}
		},
		arrival: '2017-11-13T00:57:00Z',
		delay: 0,

		line: {
			type: 'line',
			name: 'S 42',
			mode: 'train',
			product: 'suburban',
			class: 16,
			productCode: 4,
			productName: 's'
		},
		direction: 'Ringbahn <-',
		arrivalPlatform: '12'
	}, {
		id: '1|332491|0|80|12112017',

		origin: { /* … */ },
		departure: '2017-11-13T01:05:00Z',
		departurePlatform: '3',

		destination: { /* … */ },
		arrival: '2017-11-13T01:18:00Z',
		delay: 0,

		line: { /* … */ },
		direction: 'Berlin Ostbahnhof'
	}, {
		origin: { /* … */ },
		departure: '2017-11-13T01:18:00Z',
		destination: { /* … */ },
		arrival: '2017-11-13T01:26:00Z',
		mode: 'walking'
	}, {
		 /* … */
	} ]
} ]
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/hafas-client/issues).
