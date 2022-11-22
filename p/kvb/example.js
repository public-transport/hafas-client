import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as kvbProfile} from './index.js'

const client = createClient(kvbProfile, 'hafas-client example')

const heumarkt = '900000001'
const poststr = '900000003'

// client.journeys(heumarkt, poststr, {
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

// client.departures(heumarkt, {duration: 1})
// client.arrivals(heumarkt, {duration: 10, linesOfStops: true})

client.locations('heumarkt', {results: 3})
// client.stop(heumarkt, {linesOfStops: true})
// client.nearby({
// 	type: 'location',
// 	id: '991023531',
// 	address: 'An den Dominikanern 27',
// 	latitude: 50.942454, longitude: 6.954064,
// }, {distance: 500})
// client.reachableFrom({
// 	type: 'location',
// 	id: '991023531',
// 	address: 'An den Dominikanern 27',
// 	latitude: 50.942454, longitude: 6.954064,
// }, {
// 	maxDuration: 15,
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
