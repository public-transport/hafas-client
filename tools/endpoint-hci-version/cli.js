#!/usr/bin/env node

import mri from 'mri'
import {createClient} from '../../index.js'

const argv = mri(process.argv.slice(2), {
	boolean: [
		'help', 'h',
		'silent', 's',
	]
})

if (argv.help || argv.h) {
	process.stdout.write(`
Usage:
    endpoint-hci-version <profile>
Options:
    --silent  -s  Output just the version instead of a pretty
                  represenation.
Examples:
    endpoint-hci-version oebb
\n`)
	process.exit(0)
}

const silent = argv.silent || argv.s

;(async () => {
	const {profile} = import(`../../p/${argv._[0]}/index.js`)

	const client = createClient(
		profile,
		'hafas-client-endpoint-hci-version',
	)

	const {hciVersion: v} = await client.serverInfo()

	if ('string' !== typeof v || !v) {
		throw new Error('invalid/unexpected server response')
	}
	if (silent) console.log(v)
	else console.log(v + ' reported as the endpoint version ✔︎')
})()
.catch((err) => {
	console.error(err)
	process.exit(1)
})
