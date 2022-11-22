import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vvvProfile} from './index.js'

const client = createClient(vvvProfile, 'hafas-client example')

const bregenzLandeskrankenhaus = '480195700'
const bludenzGymnasium = '480031300'

// client.journeys(bregenzLandeskrankenhaus, bludenzGymnasium, {
// 	results: 1, stopovers: true,
// })
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })

// client.departures(bregenzLandeskrankenhaus, {duration: 1})
// client.arrivals(bregenzLandeskrankenhaus, {duration: 10, linesOfStops: true})

client.locations('krankenhaus', {results: 3})
// client.stop(bregenzLandeskrankenhaus, {linesOfStops: true})
// client.nearby({
// 	type: 'location',
// 	id: '980010311',
// 	address: 'Austraße 37, 6700 Bludenz',
// 	latitude: 47.149626,
// 	longitude: 9.822693,
// }, {distance: 1000})
// client.reachableFrom({
// 	type: 'location',
// 	id: '980010311',
// 	address: 'Austraße 37, 6700 Bludenz',
// 	latitude: 47.149626,
// 	longitude: 9.822693,
// }, {
// 	maxDuration: 30,
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
