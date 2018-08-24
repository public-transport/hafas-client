'use strict'

const createClient = require('../..')
const cmtaProfile = require('.')

const client = createClient(cmtaProfile)

// Broadie Oaks to Domain
client.journeys('000002370', '000005919', {results: 1, polylines: true})
// client.departures('000002370', {duration: 1})
// client.locations('Westgate', {results: 2})
// client.location('000005534') // Downtown light rail station
// client.nearby({
//    type: 'location',
//    latitude: 30.266222,
//    longtitude: -97.746058
// }, {distance: 60})
// client.radar(30.240877, -97.804588, 30.225378, -97.786692, {results: 10})
// .then(([journey]) => {
// 	const leg = journey.legs[0]
// 	return client.journeyLeg(leg.id, leg.line.name, {polyline: true})
// })
.then((data) => {
	console.log(require('util').inspect(data, {depth: null}))
})
.catch(console.error)
