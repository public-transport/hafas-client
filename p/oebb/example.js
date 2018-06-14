'use strict'

const createClient = require('../..')
const oebbProfile = require('.')

const client = createClient(oebbProfile)

// Wien Westbahnhof to Salzburg Hbf
client.journeys('1291501', '8100002', {results: 1})
// client.departures('8100002', {duration: 1})
// client.locations('Salzburg', {results: 2})
// client.location('8100173') // Graz Hbf
// client.nearby(47.812851, 13.045604, {distance: 60})
// client.radar(47.827203, 13.001261, 47.773278, 13.07562, {results: 10})

.then((data) => {
	console.log(require('util').inspect(data, {depth: null}))
})
.catch(console.error)
