'use strict'

const createClient = require('../..')
const insaProfile = require('.')

const client = createClient(insaProfile)

// from Magdeburg-Neustadt to Magdeburg-Buckau
client.journeys('008010226', '008013456', {results: 1})
// client.departures('008010226', { duration: 5 })
// client.locations('Magdeburg Hbf', {results: 2})
// client.locations('Kunstmuseum Kloster Unser Lieben Frauen Magdeburg', {results: 2})
// client.station('008010226') // Magdeburg-Neustadt
// client.nearby({
// 	type: 'location',
// 	latitude: 52.148842,
// 	longitude: 11.641705
// }, {distance: 200})
// client.radar({
// 	north: 52.148364,
// 	west: 11.600826,
// 	south: 52.108486,
// 	east: 11.651451
// }, {results: 10})

// .then(([journey]) => {
// 	const leg = journey.legs[0]
// 	return client.journeyLeg(leg.id, leg.line.name)
// })

.then(data => {
	console.log(require('util').inspect(data, { depth: null }))
})
.catch(console.error)
