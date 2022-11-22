import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as invgProfile} from './index.js'

const client = createClient(invgProfile, 'hafas-client-example')

const ingolstadtHbf = '8000183'
const audiParkplatz = '84999'

client.journeys(ingolstadtHbf, audiParkplatz, {results: 1})
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

// client.departures(ingolstadtHbf, {duration: 5})
// client.arrivals(ingolstadtHbf, {duration: 10, stationLines: true})

// client.locations('tillystr 1', {results: 2})
// client.station(audiParkplatz) // Audi Parkplatz
// client.nearby({
// 	type: 'location',
// 	latitude: 48.74453,
// 	longitude: 11.43733
// }, {distance: 200})

// client.radar({
// 	north: 48.74453,
// 	west: 11.42733,
// 	south: 48.73453,
// 	east: 11.43733
// }, {results: 10})

// todo: `reachableFrom` with `Ingolstadt, Tillystraße 1` 48.745769 | 11.432814

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
