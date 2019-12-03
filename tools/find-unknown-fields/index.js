'use strict'

const Ajv = require('ajv')
const omit = require('lodash/omit')
const createClient = require('../..')
const vbbProfile = require('../../p/vbb')
const bvgProfile = require('../../p/bvg')
const dbProfile = require('../../p/db')
const journeysSchema = require('./journeys.schema.json')
const departuresSchema = require('./departures.schema.json')
// todo: https://github.com/epoberezkin/ajv#formats
// todo: https://github.com/epoberezkin/ajv#combining-schemas-with-ref

const journeysOpts = {
	results: 3, tickets: true, stopovers: true, remarks: true, polylines: true
}
const departuresOpts = {
	duration: 10, linesOfStops: true, remarks: true, stopovers: true, includeRelatedStations: true
}
const tasks = [
	[
		vbbProfile,
		c => c.journeys('900000175013', '900000087171', journeysOpts), // Risaer Str. to TXL
		journeysSchema
	],
	[
		bvgProfile,
		c => c.journeys('900000175013', '900000087171', journeysOpts), // Risaer Str. to TXL
		journeysSchema
	],
	[
		dbProfile,
		// Siegessäule Berlin to München Hbf
		c => c.journeys({
			type: 'location', id: '991668043', poi: true,
			name: 'Berlin, Siegessäule (Tourismus)',
			latitude: 52.515189, longitude: 13.350123
		}, '8000261', journeysOpts),
		journeysSchema
	],
	[
		vbbProfile,
		client => client.departures('900000230999', departuresOpts), // S Potsdam Hbf
		departuresSchema
	],
	[
		bvgProfile,
		client => client.departures('900000078101', departuresOpts), // U Hermannplatz
		departuresSchema
	],
]

const userAgent = 'hafas-client find-unknown-fields'
const fetchResponse = (profile, query) => {
	return new Promise((resolve, reject) => {
		query(createClient({
			...profile,
			transformResBody: (body) => {
				resolve(body)
				return body
			}
		}, userAgent)).catch(reject)
	})
}

;(async () => {
	const ajv = new Ajv({verbose: true, allErrors: true, strictKeywords: true})
	for await (const [profile, query, schema] of tasks) {
		const validate = ajv.compile(schema)
		const res = await fetchResponse(profile, query)
		if (!validate(res)) {
			for (const err of validate.errors) {
				console.error('\n', omit(err, ['schema', 'parentSchema']))
			}
		}
	}
})()
.catch((err) => {
	console.error(err)
	process.exitCode = 1
})
