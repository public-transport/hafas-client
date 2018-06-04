'use strict'

const createClient = require('../../')
const dbProfile = require('.')

const client = createClient(dbProfile)

// Berlin Jungfernheide to München Hbf
client.journeys('8011167', '8000261', {results: 1, tickets: true})
// client.departures('8011167', {duration: 1})
// client.locations('Berlin Jungfernheide')
// client.locations('Atze Musiktheater', {poi: true, addressses: false, fuzzy: false})
// client.station('8000309') // Regensburg Hbf
// client.nearby(52.4751309, 13.3656537, {results: 1})

.then((data) => {
	console.log(require('util').inspect(data, {depth: null}))
}, console.error)
