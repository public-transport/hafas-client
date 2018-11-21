'use strict'

const createClient = require('../..')
const vbbProfile = require('.')

const client = createClient(vbbProfile, 'hafas-client-example')

// Mittersendling to Charlottenburg
// client.journeys('8004154', '0621790', {results: 1, polylines: true})
client.departures('8004154', {duration: 5})
// client.arrivals('8004154', {duration: 10, stationLines: true})
// client.locations('mittersendling', {results: 5})
// client.stop('8004154', {stationLines: true}) // Mittersendling
// client.nearby({
// 	type: 'location',
// 	latitude: 48.153858,
// 	longitude: 11.533059
// }, {distance: 750})
// client.radar({
// 	north: 48.145121,
// 	west: 11.543736,
// 	south: 48.138339,
// 	east: 11.553776
// }, {results: 10})
// client.reachableFrom({
// 	type: 'location',
//     address: 'Pötschnerstraße 3, neuhausen',
//     latitude: 48.152499,
//     longitude: 11.531695
// }, {
// 	when: new Date('2018-08-27T10:00:00+0200'),
// 	maxDuration: 20
// })

// .then(([journey]) => {
// 	const leg = journey.legs.find(leg => leg.line)
// 	return client.trip(leg.id, leg.line.name, {polyline: true})
// })

// .then(([journey]) => {
// 	return client.refreshJourney(journey.refreshToken, {
// 		stopovers: true, remarks: true
// 	})
// })

.then((data) => {
	console.log(require('util').inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
