import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vorProfile} from './index.js'

const client = createClient(vorProfile, 'hafas-client example')

const stPöltenLinzerTor = '431277900'
const eisenstadtSchlossplatz = '415003300'

// client.journeys(stPöltenLinzerTor, eisenstadtSchlossplatz, {
// 	results: 1, stopovers: true,
// })
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs.find(l => !!l.line)
// 	return client.trip(leg.tripId, {polyline: true})
// })

// client.departures(stPöltenLinzerTor, {duration: 20})
// client.arrivals(stPöltenLinzerTor, {duration: 10, linesOfStops: true})

client.locations('schlossplatz', {results: 3})
// client.stop(stPöltenLinzerTor, {linesOfStops: true})
// client.nearby({
// 	type: 'location',
// 	id: '980021284',
// 	address: 'Christalniggasse 6, 2500 Baden',
// 	latitude: 48.005516,
// 	longitude: 16.241404,
// }, {distance: 1000})
// client.reachableFrom({
// 	type: 'location',
// 	id: '980021284',
// 	address: 'Christalniggasse 6, 2500 Baden',
// 	latitude: 48.005516,
// 	longitude: 16.241404,
// }, {
// 	maxDuration: 30,
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
