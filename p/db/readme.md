# DB profile for `hafas-client`

[*Deutsche Bahn (DB)*](https://en.wikipedia.org/wiki/Deutsche_Bahn) is the largest German long-distance public transport company. This profile adds *DB*-specific customizations to `hafas-client`. Consider using [`db-hafas`](https://github.com/derhuerst/db-hafas#db-hafas), to always get the customized client right away.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as dbProfile} from 'hafas-client/p/db/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with DB profile
const client = createClient(dbProfile, userAgent)
```


## Customisations

- supports 1st and 2nd class with `journey()`
- supports [their loyalty cards](https://en.wikipedia.org/wiki/Deutsche_Bahn#Tickets) with `journey()`
- parses *DB*-specific products (such as *InterCity-Express*)
- exposes the cheapest ticket price for a `journey`
- parses [*DB*-specific station info](#additional-station-info)

### additional station info

With the `db` profile, `hafas-client` will return more station information whenever the endpoint provides it:

```js
{
	type: 'station',
	id: '8004585',
	name: 'Oberstdorf',
	// …
	facilities: {
		'3SZentrale': '089/13081055',
		parkingLots: true,
		bicycleParkingRacks: true,
		localPublicTransport: true,
		toilets: true,
		lockers: true,
		travelShop: true,
		stepFreeAccess: true,
		boardingAid: 'ja, um voranmeldung unter 01806 512 512* wird gebeten',
		taxis: true
	},
	reisezentrumOpeningHours: {
		Mo: '08:00-18:00',
		Di: '08:00-18:00',
		Mi: '08:00-18:00',
		Do: '08:00-18:00',
		Fr: '08:00-18:00',
		Sa: '09:00-14:00',
		So: '09:00-14:00'
	},
	// …
	stops: [{
		type: 'stop',
		id: '965503',
		name: 'Busbahnhof, Oberstdorf',
		// …
		reisezentrumOpeningHours: {
			Mo: '08:00-18:00',
			Di: '08:00-18:00',
			Mi: '08:00-18:00',
			Do: '08:00-18:00',
			Fr: '08:00-18:00',
			Sa: '09:00-14:00',
			So: '09:00-14:00'
		}
	}]
}
```

## Using the `loyaltyCard` option

```js
import {data as loyaltyCards} from 'hafas-client/p/db/loyalty-cards.js'

hafas.journeys(from, to, {
	loyaltyCard: {type: data.BAHNCARD, discount: 25}
})
```
