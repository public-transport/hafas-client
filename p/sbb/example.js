'use strict'

const createClient = require('../../')
const sbbProfile = require('.')

const client = createClient(sbbProfile, 'hafas-client-example')

const zurich1 = '8530813' // Zürich Kreuzplatz
const zurich2 = '8503000' // Zürich HB
const basel1 = '8500073'  // Basel Aeschenplatz
const basel2 = '8500010'  // Basel SBB
const baden1 = '8590197'
const baden2 = '8590173'
const locBaden = { type: 'location', latitude: 47.476, longitude: 8.30613 }

// client.journeys(zurich1, basel1, { results: 1 })
// client.journeys(zurich2, basel2, { results: 1 })
client.journeys(baden1, baden2, { results: 1 })
// .then(({journeys}) => {
// 	const leg = journeys[0].legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })
// .then(({journeys}) => {
// 	return client.refreshJourney(journeys[0].refreshToken, {remarks: true})
// })

// client.departures(zurich2, {duration: 1})
// client.arrivals(zurich2, {duration: 10, linesOfStops: true})
// client.locations('Basel', { results: 2 })
// client.locations('Luzern', { poi: true, stops: false })
// client.stop(basel2)
// client.nearby(locBaden, { distance: 100 })
// client.radar({
// 	north: 47.5,
// 	west: 8.2,
// 	south: 47.3,
// 	east: 8.5,
// }, { results: 10 })
// client.reachableFrom({
// 	type: 'location',
// 	id: '980023031',
// 	latitude: 47.052417,
// 	longitude: 8.304487,
// 	name: 'Luzern, Adlun',
// 	poi: true
// }, {
// 	maxDuration: 20
// })


.then((data) => {
	console.log(require('util').inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
