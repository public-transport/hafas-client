import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as sncbProfile} from './index.js'

const client = createClient(sncbProfile, 'hafas-client-example')

const gentStPieters = '8892007'
const bruxellesMidi = '8814001'
const gentPaddenhoek = {
	type: 'location',
	address: 'Gent, Paddenhoek',
	latitude: 51.0517, longitude: 3.724878,
}

client.journeys(gentStPieters, bruxellesMidi, {stopovers: true, remarks: true})
// .then(({journeys}) => {
// 	const leg = journeys[0].legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })
// .then(({journeys}) => {
// 	return client.refreshJourney(journeys[0].refreshToken, {remarks: true})
// })

// client.departures(gentStPieters)
// client.arrivals(gentStPieters, {duration: 10, linesOfStops: true})
// client.locations('gent')
// client.stop(gentStPieters, {linesOfStops: true})
// client.nearby(gentPaddenhoek)
// client.radar({
// 	north: 51.065,
// 	west: 3.688,
// 	south: 51.04,
// 	east: 3.748
// }, {results: 10})
// client.reachableFrom(gentPaddenhoek)

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
