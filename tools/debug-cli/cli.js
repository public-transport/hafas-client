#!/usr/bin/env node
'use strict'

const mri = require('mri')
const {join} = require('path')
const createClient = require('../..')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const toString = val => val + ''
const parseJSON = val => JSON.parse(val)
const parseArgs = [
	['departures', 0, toString],
	['departures', 1, parseJSON],
	['arrivals', 0, toString],
	['arrivals', 1, parseJSON],
	['journeys', 0, toString],
	['journeys', 1, toString],
	['journeys', 2, parseJSON],
	['refreshJourney', 0, toString],
	['refreshJourney', 1, parseJSON],
	['locations', 0, toString],
	['locations', 1, parseJSON],
	['stop', 0, toString],
	['stop', 1, parseJSON],
	['nearby', 0, parseJSON],
	['nearby', 1, parseJSON],
	['trip', 0, toString],
	['trip', 1, toString],
	['trip', 2, parseJSON],
	['radar', 0, parseJSON],
	['radar', 1, parseJSON],
	['reachableFrom', 0, parseJSON],
	['reachableFrom', 1, parseJSON]
]

const argv = mri(process.argv.slice(2))

const profile = require(join('../../p', argv._[0]))
const client = createClient(profile, 'hafas-client debug CLI')

const fnName = argv._[1]
const fn = client[fnName]

const args = argv._.slice(2).map((arg, i) => {
	const parser = parseArgs.find(([_fnName, _i]) => _fnName === fnName && _i === i)
	return parser ? parser[2](arg) : arg
})

fn(...args)
.then((res) => {
	process.stdout.write(JSON.stringify(res) + '\n')
})
.catch(showError)
