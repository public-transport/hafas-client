'use strict'

const isRoughlyEqual = require('is-roughly-equal')

const co = require('./co')

const testJourneysWalkingSpeed = co(function* (cfg) {
	const {test: t, journeys, validate, from, to, products, difference: dT} = cfg

	const [journeyWithFastWalking] = yield journeys(from, to, {
		results: 1, products, walkingSpeed: 'fast'
	})
	const legWithFastWalking = journeyWithFastWalking.legs.find(l => l.mode === 'walking')
	t.ok(legWithFastWalking, 'no walking leg in journey with fast walking')

	const [journeyWithSlowWalking] = yield journeys(from, to, {
		results: 1, products, walkingSpeed: 'slow'
	})
	const legWithSlowWalking = journeyWithSlowWalking.legs.find(l => l.mode === 'walking')
	t.ok(legWithSlowWalking, 'no walking leg in journey with slow walking')

	const fastDist = legWithFastWalking.distance
	const slowDist = legWithSlowWalking.distance
	t.ok(isRoughlyEqual(100, fastDist, slowDist), 'precondition failed')
	const fastDur = new Date(legWithFastWalking.arrival) - new Date(legWithFastWalking.departure)
	const slowDur = new Date(legWithSlowWalking.arrival) - new Date(legWithSlowWalking.departure)
	// console.error(fastDur / 1000 / 60, slowDur / 1000 / 60)
	t.notOk(isRoughlyEqual(dT, fastDur, slowDur), 'walkingSpeed not applied')
	t.end()
})

module.exports = testJourneysWalkingSpeed
