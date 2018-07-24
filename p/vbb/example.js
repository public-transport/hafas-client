'use strict'

const createClient = require('../..')
const vbbProfile = require('.')

const client = createClient(vbbProfile)

// Hauptbahnhof to Charlottenburg
client.journeys('900000003201', '900000024101', {results: 1, polylines: true})
// client.departures('900000013102', {duration: 1})
// client.arrivals('900000013102', {duration: 10, stationLines: true})
// client.locations('Alexanderplatz', {results: 2})
// client.station('900000042101', {stationLines: true}) // Spichernstr
// client.nearby({
// 	type: 'location',
// 	latitude: 52.5137344,
// 	longitude: 13.4744798
// }, {distance: 60})
// client.radar({
// 	north: 52.52411,
// 	west: 13.41002,
// 	south: 52.51942,
// 	east: 13.41709
// }, {results: 10})

// .then(([journey]) => {
// 	const leg = journey.legs[0]
// 	return client.trip(leg.id, leg.line.name, {polyline: true})
// })

// .then(([journey]) => {
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })
.then((data) => {
	console.log(require('util').inspect(data, {depth: null}))
})
.catch(console.error)
