'use strict'

const createClient = require('../..')
const vbbProfile = require('.')

const client = createClient(vbbProfile)

// Hauptbahnhof to Charlottenburg
client.journeys('900000003201', '900000024101', {results: 1, polylines: true})
// client.departures('900000013102', {duration: 1})
// client.locations('Alexanderplatz', {results: 2})
// client.station('900000042101') // Spichernstr
// client.nearby(52.5137344, 13.4744798, {distance: 60})
// client.radar({
// 	north: 52.52411,
// 	west: 13.41002,
// 	south: 52.51942,
// 	east: 13.41709
// }, {results: 10})

// .then(([journey]) => {
// 	const leg = journey.legs[0]
// 	return client.journeyLeg(leg.id, leg.line.name, {polyline: true})
// })
.then((data) => {
	console.log(require('util').inspect(data, {depth: null}))
})
.catch(console.error)
