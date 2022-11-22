import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as salzburgProfile} from './index.js'

const client = createClient(salzburgProfile, 'hafas-client example')

const salzburgGaswerkgasse = '455001300'
const oberndorfKrankenhaus = '455110200'

// client.journeys(salzburgGaswerkgasse, oberndorfKrankenhaus, {
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

// client.departures(salzburgGaswerkgasse, {duration: 1})
// client.arrivals(salzburgGaswerkgasse, {duration: 10, linesOfStops: true})

client.locations('krankenhaus', {results: 3})
// client.stop(salzburgGaswerkgasse, {linesOfStops: true})
// client.nearby({
// 	type: 'location',
// 	id: '980100611',
// 	address: 'Rupertgasse 5, 5020 Salzburg',
// 	latitude: 47.806891,
// 	longitude: 13.050503,
// }, {distance: 1000})
// client.reachableFrom({
// 	type: 'location',
// 	id: '980100611',
// 	address: 'Rupertgasse 5, 5020 Salzburg',
// 	latitude: 47.806891,
// 	longitude: 13.050503,
// }, {
// 	maxDuration: 30,
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
