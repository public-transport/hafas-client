// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

import tap from 'tap'

import {createClient} from '../index.js'
import {profile as rawProfile} from '../p/db/index.js'
const resDTZOffset0 = require('./fixtures/db-journey-dtzoffset-0.json')
const resATZOffset0 = require('./fixtures/db-journey-atzoffset-0.json')

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	stopovers: false,
	tickets: false,
	polylines: false,
	subStops: true,
	entrances: true,
	remarks: true,
}

// https://github.com/public-transport/hafas-client/issues/237

tap.test('parses a journey whose first leg has a dTZOffset of 0 (#237)', (t) => {
	const common = profile.parseCommon({profile, opt, res: resDTZOffset0})
	const ctx = {profile, opt, common, res: resDTZOffset0}
	const journey = profile.parseJourney(ctx, resDTZOffset0.outConL[0])

	const firstLeg = journey.legs[0]
	t.notOk(/Z$/.test(firstLeg.departure), 'firstLeg.departure has TZ offset "Z"')
	t.end()
})

tap.test('parses a journey whose first leg has a aTZOffset of 0 (#237)', (t) => {
	const common = profile.parseCommon({profile, opt, res: resATZOffset0})
	const ctx = {profile, opt, common, res: resATZOffset0}
	const journey = profile.parseJourney(ctx, resATZOffset0.outConL[0])

	const lastLeg = journey.legs[0]
	t.notOk(/Z$/.test(lastLeg.departure), 'lastLeg.departure has TZ offset "Z"')
	t.end()
})
