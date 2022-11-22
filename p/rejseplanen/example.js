import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as rejseplanenProfile} from './index.js'

const client = createClient(rejseplanenProfile, 'hafas-client-example')

// from København Central to Aalborg
// client.journeys('8600626', '8600020', {results: 1})
// .then(({journeys}) => {

// 	const leg = journeys[0].legs[0]
// 	return client.trip(leg.tripId, leg.line.name)
// })

client.departures('8600626', {duration: 5})
// client.locations('KØbenhaven', {results: 2})
// client.stop('8600626') // København Central
// client.nearby({
// 	type: 'location',
// 	latitude: 55.673,
// 	longitude: 12.566
// }, {distance: 200})
// client.radar({
// 	north: 55.673,
// 	west: 12.566,
// 	south: 55.672,
// 	east: 12.567
// }, {results: 10})

.then(data => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
