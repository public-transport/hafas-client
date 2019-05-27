'use strict'

const Ajv = require('ajv')
const omit = require('lodash/omit')
const createClient = require('..')

const tasks = []

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
