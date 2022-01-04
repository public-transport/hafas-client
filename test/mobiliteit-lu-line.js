'use strict'

const tap = require('tap')

const createClient = require('..')
const rawProfile = require('../p/mobiliteit-lu')

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	linesOfStops: false, // parse & expose lines at the stop/station?
	remarks: true,
}

tap.test('parses a line correctly (mobiliteit.lu)', (t) => {
	const rawLine = {
		pid: 'L::1::IC::B1303038328::IC_1303038328::*',
		name: 'IC 108',
		number: '108',
		icoX: 0,
		cls: 2,
		oprX: 0,
		prodCtx: {
			name: 'IC   108',
			num: '108',
			matchId: '108',
			catOut: 'IC      ',
			catOutS: 'CIC',
			catOutL: 'IC      ',
			catIn: 'CIC',
			catCode: '1',
			admin: 'C88---',
		},
	}

	const ctx = {profile, opt}
	const stop = profile.parseLine(ctx, rawLine)

	t.same(stop, {
		type: 'line',
		id: 'ic-108',
		fahrtNr: '108',
		name: 'IC 108',
		public: true,
		adminCode: 'C88---',
		productName: 'IC',
		mode: 'train',
		product: 'national-train',
	})
	t.end()
})
