# DB profile for `hafas-client`

[*Deutsche Bahn (DB)*](https://en.wikipedia.org/wiki/Deutsche_Bahn) is the largest German long-distance public transport company. This profile adds *DB*-specific customizations to `hafas-client`. Consider using [`db-hafas`](https://github.com/derhuerst/db-hafas#db-hafas), to always get the customized client right away.

## Usage

```js
const createClient = require('hafas-client')
const dbProfile = require('hafas-client/p/db')

// create a client with DB profile
const client = createClient(dbProfile, 'my-awesome-program')
```


## Customisations

- supports 1st and 2nd class with `journey()`
- supports [their loyalty cards](https://en.wikipedia.org/wiki/Deutsche_Bahn#Tickets) with `journey()`
- parses *DB*-specific products (such as *InterCity-Express*)
- exposes the cheapest ticket price for a `journey`

## Using the `loyaltyCard` option

```js
const {data: loyaltyCards} = require('hafas-client/p/db/loyalty-cards')

hafas.journeys(from, to, {
	loyaltyCard: {type: data.BAHNCARD, discount: 25}
})
```
