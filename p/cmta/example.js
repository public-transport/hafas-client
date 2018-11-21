'use strict'

const createClient = require('../..')
const cmtaProfile = require('.')

const client = createClient(cmtaProfile, 'hafas-client-example')

// Broadie Oaks to Domain
client.journeys('000002370', '000005919', {results: 1, polylines: true})
// client.departures('000002370', {duration: 1})
// client.arrivals('000002370', {duration: 10, stationLines: true})
// client.locations('Westgate', {results: 2})
// client.stop('000005534') // Downtown light rail station
// client.nearby({
// 	type: 'location',
// 	latitude: 30.266222,
// 	longitude: -97.746058
// }, {distance: 60})
// client.radar({
// 	north: 30.240877,
// 	west: -97.804588,
// 	south: 30.225378,
// 	east: -97.786692
// }, {results: 10})
// client.reachableFrom({
// 	type: 'location',
// 	address: '604 W 9TH ST, Austin, TX 78701',
// 	latitude: 30.272910,
// 	longitude: -97.747883
// }, {
// 	when: new Date('2018-08-27T10:00:00+0200'),
// 	maxDuration: 15
// })

// .then(([journey]) => {
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, leg.line.name, {polyline: true})
// })
// .then(([journey]) => {
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

.then((data) => {
	console.log(require('util').inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
