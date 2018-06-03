'use strict'

const createClient = require('../..')
const cmtaProfile = require('.')

const client = createClient(cmtaProfile)

// Broadie Oaks to Domain
client.journeys('000002370', '900000024101', {results: 1, polylines: true})
// client.departures('000002370', {duration: 1})
// client.locations('Westgate', {results: 2})
// client.location('900000042101') // Spichernstr TODO
// client.nearby(52.5137344, 13.4744798, {distance: 60}) TODO
// client.radar(52.52411, 13.41002, 52.51942, 13.41709, {results: 10}) TODO

// .then(([journey]) => {
// 	const leg = journey.legs[0]
// 	return client.journeyLeg(leg.id, leg.line.name, {polyline: true})
// })
.then((data) => {
	console.log(require('util').inspect(data, {depth: null}))
})
.catch(console.error)
