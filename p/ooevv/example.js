import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as ooevvProfile} from './index.js'

const client = createClient(ooevvProfile, 'hafas-client example')

const linzTheatergasse = '444670100'
const amstettenStadtbad = '431507400'

// client.journeys(linzTheatergasse, amstettenStadtbad, {
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

client.departures(linzTheatergasse, {duration: 12 * 60})
// client.arrivals(linzTheatergasse, {duration: 10, linesOfStops: true})

// client.locations('theatergasse', {results: 3})
// client.stop(linzTheatergasse, {linesOfStops: true})
// client.nearby({
// 	type: 'location',
// 	id: '980115190',
// 	address: 'Steingasse 19, 4020 Linz',
// 	latitude: 48.301181,
// 	longitude: 14.284057,
// }, {distance: 1000})
// client.reachableFrom({
// 	type: 'location',
// 	id: '980115190',
// 	address: 'Steingasse 19, 4020 Linz',
// 	latitude: 48.301181,
// 	longitude: 14.284057,
// }, {
// 	maxDuration: 30,
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
