'use strict'

const createClient = require('./rest-exe')

const TOKEN = process.env.TOKEN
if (!TOKEN) throw new Error('missing TOKEN env var')

const profile = {
	endpoint: 'https://dbrest-rt.hafas.de/openapi/1.23/'
}

const {
	locations, nearby,
	departures, arrivals,
	journeys, trip, tripAlternatives
} = createClient(profile, TOKEN, 'hafas-client example')

const berlinOstkreuz = '8011162'
const berlinSchönefeld = '8010109'
const berlinWestkreuz = '8089047'
const berlinMesseSüd = '8089328'
const berlinYorckstrS1 = '8089051'
const somewhereInBerlin = {type: 'location', address: 'foo', latitude: 52.51072, longitude: 13.37793}

// journeys(berlinOstkreuz, '8000261', {
// 	results: 3,
// 	stopovers: true,
// 	remarks: true
// })
// .then(journeys => journeys.flatMap(j => [...j.legs, '---']))
// .then(([journey]) => journey.legs.map(l => l.tripId).find(tripId => !!tripId))
// .then(trip)
// tripAlternatives()

locations('leopoldplatz ber')
// nearby({type: 'location', latitude: 52.4751309, longitude: 13.3656537})
// departures(berlinYorckstrS1, {
// 	remarks: true
// })
// .then(deps => deps.map(d => [d.line && d.line.name, d.stop && d.stop.name]))
// arrivals(berlinYorckstrS1, {
// 	remarks: true
// })

.then(data => console.log(require('util').inspect(data, {depth: null, colors: true})))
.catch((err) => {
	console.error(err)
	process.exit(1)
})
