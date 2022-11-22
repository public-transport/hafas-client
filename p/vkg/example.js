import {inspect} from 'util'
import {createClient} from '../../index.js'
import {profile as vkgProfile} from './index.js'

const client = createClient(vkgProfile, 'hafas-client-example')

const spittalMittelschule = '420512200'
const klagenfurtSteingasse = '420649500'

// client.journeys(spittalMittelschule, klagenfurtSteingasse, {results: 1, stopovers: true})

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, {polyline: true})
// })

// client.departures(spittalMittelschule, {duration: 1})
// client.arrivals(spittalMittelschule, {duration: 10, linesOfStops: true})

client.locations('steingasse', {results: 3})
// client.stop(spittalMittelschule, {linesOfStops: true})
// client.nearby({
// 	type: 'location',
// 	latitude: 46.617968,
// 	longitude: 14.297595,
// }, {distance: 500})
// client.reachableFrom({
// 	type: 'location',
// 	id: '980025809',
// 	address: 'Eckengasse 9, 9020 Klagenfurt am Wörthersee',
// 	latitude: 46.617968,
// 	longitude: 14.297595,
// }, {
// 	maxDuration: 8,
// })

.then((data) => {
	console.log(inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
