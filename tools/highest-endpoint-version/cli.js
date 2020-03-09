#!/usr/bin/env node
'use strict'

const mri = require('mri')

const argv = mri(process.argv.slice(2), {
	boolean: [
		'help', 'h',
		'silent', 's',
	]
})

if (argv.help || argv.h) {
	process.stdout.write(`
Usage:
    highest-endpoint-version <profile>
Options:
    --silent  -s  Output just the version instead of a pretty
                  represenation.
Examples:
    highest-endpoint-version oebb
\n`)
	process.exit(0)
}

const {join} = require('path')
const createClient = require('../..')

const profile = require(join(__dirname, '..', '..', 'p', argv._[0]))
const id = (ctx, val) => val
const origTransformReqBody = profile.transformReqBody || id

const checkWithVersion = async (version) => {
	const transformReqBody = (ctx, body) => {
		body = origTransformReqBody(ctx, body)
		return {...body, ver: version}
	}
	const client = createClient({
		...profile, transformReqBody
	}, 'hafas-client-highest-endpoint-version')

	try {
		await client.locations('foo', {results: 1})
	} catch (err) {
		if (err && err.code === 'VERSION') return false
		const wrapped = new Error(`check for ${version} support failed with an unknown error`)
		wrapped.originalError = err
		throw wrapped
	}
	return true
}

const silent = argv.silent || argv.s

;(async () => {
	for (let minor = 16; minor <= 35; minor++) {
		const v = '1.' + minor
		if (await checkWithVersion(v)) {
			if (!silent) console.log(v + ' is supported ✔︎')
		} else {
			if (silent) console.log(v)
			else console.log(v + ' is not supported ✘')
			process.exit(0)
		}
	}
	process.exit(1)
})()
.catch((err) => {
	console.error(err)
	process.exit(1)
})
