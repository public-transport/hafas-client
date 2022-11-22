import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as mobilNrwProfile} from './index.js'

const client = createClient(mobilNrwProfile, 'hafas-client-example')

const soest = '8000076'
const aachenHbf = '8000001'

client.journeys(soest, aachenHbf, {results: 1, stopovers: true})
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

// client.locations('soest', {results: 3})
// client.reachableFrom({
// 	type: 'location',
// 	id: '980301639',
// 	latitude: 51.387609,
// 	longitude: 6.684019,
// 	address: 'Duisburg, Am Mühlenberg 1',
// }, {
// 	maxDuration: 15,
// })
// client.nearby({
// 	type: 'location',
// 	latitude: 51.4503,
// 	longitude: 6.6581,
// }, {distance: 1200})

// client.station(soest)
// client.departures(soest, {duration: 20})

// client.radar({
// 	north: 51.4358,
// 	west: 6.7625,
// 	south: 51.4214,
// 	east: 6.7900,
// }, {results: 10})

// client.remarks()

.then(data => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
