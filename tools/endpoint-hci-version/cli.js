#!/usr/bin/env node

import {parseArgs} from 'node:util';
import {createClient} from '../../index.js';

const {
	values: flags,
	positionals: args,
} = parseArgs({
	options: {
		help: {
			type: 'boolean',
			short: 'h',
		},
		silent: {
			type: 'boolean',
			short: 's',
		},
	},
	strict: true,
	allowPositionals: true,
});

if (flags.help) {
	process.stdout.write(`
Usage:
    endpoint-hci-version <profile>
Options:
    --silent  -s  Output just the version instead of a pretty
                  represenation.
Examples:
    endpoint-hci-version oebb
\n`);
	process.exit(0);
}

const profileName = args[0];
const silent = flags.silent;
(async () => {
	const {profile} = await import(`../../p/${profileName}/index.js`);

	const client = createClient(
		profile,
		'hafas-client-endpoint-hci-version',
	);

	const {hciVersion: v} = await client.serverInfo();

	if ('string' !== typeof v || !v) {
		throw new Error('invalid/unexpected server response');
	}
	if (silent) {
		console.log(v);
	} else {
		console.log(v + ' reported as the endpoint version ✔︎');
	}
})()
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
