import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as dartProfile} from './index.js'

const client = createClient(dartProfile, 'hafas-client example')

const mlkJrPkwyAdamsAveDsm2055 = '100002702'
const se5thStEHackleyAveDsm2294 = '100004972'

// client.journeys(mlkJrPkwyAdamsAveDsm2055, se5thStEHackleyAveDsm2294, {
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

// client.departures(mlkJrPkwyAdamsAveDsm2055, {duration: 10})
// client.arrivals(mlkJrPkwyAdamsAveDsm2055, {linesOfStops: true})

client.locations('adams ave', {results: 3})
// client.stop(mlkJrPkwyAdamsAveDsm2055, {linesOfStops: true})
// client.nearby({
// 	type: 'location',
// 	id: '980010311',
// 	address: 'Austraße 37, 6700 Bludenz',
// 	latitude: 41.6056,
// 	longitude: -93.5916,
// }, {distance: 1000})
// client.reachableFrom({
// 	type: 'location',
// 	latitude: 41.613584,
// 	longitude: -93.881803,
// 	address: 'Laurel St, Waukee, 50263',
// }, {
// 	maxDuration: 20,
// })
// client.radar({
// 	north: 41.6266,
// 	west: -93.7299,
// 	south: 41.5503,
// 	east: -93.5699,
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
