import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vmtProfile} from './index.js'

const client = createClient(vmtProfile, 'hafas-client-example')

const jena = '190014'
const gothaZOB = '167280'

client.journeys(jena, gothaZOB, {results: 1})
// client.departures(jena)
// client.arrivals(jena, {duration: 10, linesOfStops: true})
// client.locations('ohrdruf', {results: 2})
// client.stop(jena, {linesOfStops: true}) // Dammtor
// client.nearby({
// 	type: 'location',
// 	latitude: 50.975615,
// 	longitude: 11.032374
// })
// client.reachableFrom({
// 	type: 'location',
// 	id: '980348376',
// 	address: 'Erfurt, Grafengasse 12',
// 	latitude: 50.975993, longitude: 11.031553
// }, {
// 	when: new Date('2020-03-04T10:00:00+01:00')
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
