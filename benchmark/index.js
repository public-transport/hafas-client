'use strict'

const cloneDeep = require('lodash/cloneDeep')
const {Suite} = require('benchmark')

const createClient = require('..')
const dbProfile = require('../p/db')

const client = createClient(dbProfile, 'public-transport/hafas-client:benchmark')
const {profile} = client
const manyDepartures = require('./many-departures.json')
const mediumDepartures = require('./medium-departures.json')

const suite = new Suite()
suite

.add('parse 1200 departures', () => {
	const opt = {remarks: true}
	const res = cloneDeep(manyDepartures)

	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	res.jnyL.forEach(dep => profile.parseDeparture(ctx, dep))
})

.add('parse 45 departures', () => {
	const opt = {remarks: true}
	const res = cloneDeep(mediumDepartures)

	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	res.jnyL.forEach(dep => profile.parseDeparture(ctx, dep))
})

.on('cycle', ({target}) => {
	const perRun = Math.round(target.times.period * 100) / 100
	console.log(`${target} (${perRun}s/run)`)
})
.run()
