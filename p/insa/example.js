import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as insaProfile} from './index.js'

const client = createClient(insaProfile, 'hafas-client-example')

const hellestr1 = {
	type: 'location',
	id: '980801263',
	address: 'Magdeburg - Leipziger Straße, Hellestraße 1',
	latitude: 52.116706, longitude: 11.621821
}

// from Magdeburg-Neustadt to Magdeburg-Buckau
client.journeys('008010226', '008013456', {results: 1})

// client.departures('008010226', { duration: 5 })
// client.arrivals('8010226', {duration: 10, linesOfStops: true})
// client.locations('Magdeburg Hbf', {results: 2})
// client.locations('Kunstmuseum Kloster Unser Lieben Frauen Magdeburg', {results: 2})
// client.stop('008010226') // Magdeburg-Neustadt
// client.nearby(hellestr1)
// client.radar({
// 	north: 52.148364,
// 	west: 11.600826,
// 	south: 52.108486,
// 	east: 11.651451
// }, {results: 10})
// client.reachableFrom(hellestr1, {maxDuration: 10})

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, leg.line.name)
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

.then(data => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
