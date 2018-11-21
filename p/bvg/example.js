'use strict'

const createClient = require('../..')
const vbbProfile = require('.')

const client = createClient(vbbProfile, 'hafas-client-example')

// Hauptbahnhof to Charlottenburg
client.journeys('900000003201', '900000024101', {results: 1, polylines: true})
// client.departures('900000013102', {duration: 1})
// client.arrivals('900000013102', {duration: 10, stationLines: true})
// client.locations('Alexanderplatz', {results: 2})
// client.stop('900000042101', {stationLines: true}) // Spichernstr
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
// client.reachableFrom({
// 	type: 'location',
// 	address: '13353 Berlin-Wedding, Torfstr. 17',
// 	latitude: 52.541797,
// 	longitude: 13.350042
// }, {
// 	when: new Date('2018-08-27T10:00:00+0200'),
// 	maxDuration: 10
// })

// .then(([journey]) => {
// 	const leg = journey.legs[0]
// 	return client.trip(leg.id, leg.line.name, {polyline: true})
// })

// .then(([journey]) => {
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })
.then((data) => {
	console.log(require('util').inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
