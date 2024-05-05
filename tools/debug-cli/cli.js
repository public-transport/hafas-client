#!/usr/bin/env node

import {parseArgs} from 'node:util';
import {createClient} from '../../index.js';

const showError = (err) => {
	console.error(err);
	process.exit(1);
};

const toString = val => String(val);
const parseJsObject = val => {
	const res = eval(`(${val})`);
	return res && 'object' === typeof res
		? res
		: {};
};

const methodsAndTheirArgs = [
	['departures', 0, toString],
	['departures', 1, parseJsObject],
	['arrivals', 0, toString],
	['arrivals', 1, parseJsObject],
	['journeys', 0, toString],
	['journeys', 1, toString],
	['journeys', 2, parseJsObject],
	['bestPrices', 0, toString],
	['bestPrices', 1, toString],
	['bestPrices', 2, parseJsObject],
	['refreshJourney', 0, toString],
	['refreshJourney', 1, parseJsObject],
	['journeysFromTrip', 0, toString],
	['journeysFromTrip', 1, parseJsObject],
	['journeysFromTrip', 2, toString],
	['journeysFromTrip', 3, parseJsObject],
	['locations', 0, toString],
	['locations', 1, parseJsObject],
	['stop', 0, toString],
	['stop', 1, parseJsObject],
	['nearby', 0, parseJsObject],
	['nearby', 1, parseJsObject],
	['trip', 0, toString],
	['trip', 1, parseJsObject],
	['tripsByName', 0, toString],
	['tripsByName', 1, parseJsObject],
	['radar', 0, parseJsObject],
	['radar', 1, parseJsObject],
	['reachableFrom', 0, parseJsObject],
	['reachableFrom', 1, parseJsObject],
	['remarks', 0, parseJsObject],
	['lines', 0, toString],
	['lines', 1, parseJsObject],
	['serverInfo', 0, parseJsObject],
];

const {
	positionals: args,
} = parseArgs({
	strict: true,
	allowPositionals: true,
});

const profileName = args[0];
const fnName = args[1];

const parsedArgs = args.slice(2)
	.map((arg, i) => {
		const parser = methodsAndTheirArgs.find(([_fnName, _i]) => _fnName === fnName && _i === i);
		return parser
			? parser[2](arg)
			: arg;
	});
(async () => {
	const {profile} = await import(`../../p/${profileName}/index.js`);

	const client = createClient(profile, 'hafas-client debug CLI');

	const fn = client[fnName];

	const res = await fn(...parsedArgs);
	process.stdout.write(JSON.stringify(res) + '\n');
})()
	.catch(showError);
