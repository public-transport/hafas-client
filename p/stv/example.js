import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as stvProfile} from './index.js'

const client = createClient(stvProfile, 'hafas-client example')

const grazSonnenhang = '460413500'
const grazHödlweg = '460415400'

// client.journeys(grazSonnenhang, grazHödlweg, {
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

// client.departures(grazSonnenhang, {duration: 1})
// client.arrivals(grazSonnenhang, {duration: 10, linesOfStops: true})

client.locations('sonnenhang', {results: 3})
// client.stop(grazSonnenhang, {linesOfStops: true})
// client.nearby({
// 	type: 'location',
// 	id: '980027564',
// 	address: 'Eisengasse 10, 8020 Graz',
// 	latitude: 47.076553,
// 	longitude: 15.406064,
// }, {distance: 1000})
// client.reachableFrom({
// 	type: 'location',
// 	id: '980027564',
// 	address: 'Eisengasse 10, 8020 Graz',
// 	latitude: 47.076553,
// 	longitude: 15.406064,
// }, {
// 	maxDuration: 30,
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
