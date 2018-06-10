'use strict'

const createClient = require('../..')
const nahshProfile = require('.')

const client = createClient(nahshProfile)

// Flensburg Hbf to Kiel Hbf
client.journeys('8000103', '8000199', {results: 10, tickets: true})
// client.departures('8000199', {duration: 10})
// client.journeyLeg('1|30161|5|100|14032018', 'Bus 52')
// client.locations('Schleswig', {results: 1})
// client.station('706990') // Kiel Holunderbusch
// client.nearby({type: 'location', latitude: 54.295691, longitude: 10.116424}, {distance: 60})
// client.radar(54.4, 10.0, 54.2, 10.2, {results: 10})

.then((data) => {
	console.log(require('util').inspect(data, {depth: null}))
})
.catch(console.error)
