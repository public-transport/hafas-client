import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vvtProfile} from './index.js'

const client = createClient(vvtProfile, 'hafas-client-example')

const innsbruckMitterweg = '476152300'
const kufsteinListstr = '476603100'

// client.journeys(innsbruckMitterweg, kufsteinListstr, {results: 1, stopovers: true})

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })

client.departures(innsbruckMitterweg, {duration: 1})
// client.arrivals(innsbruckMitterweg, {duration: 10, linesOfStops: true})

// client.locations('liststr', {results: 3})
// client.stop(innsbruckMitterweg, {linesOfStops: true})
// client.nearby({
// 	type: 'location',
// 	latitude: 53.554422,
// 	longitude: 9.977934
// }, {distance: 500})
// client.reachableFrom( {
// 	type: 'location',
// 	id: '980113702',
// 	address: 'Stadlweg 1, 6020 Innsbruck',
// 	latitude: 47.267106,
// 	longitude: 11.426701,
// }, {
// 	maxDuration: 8,
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
