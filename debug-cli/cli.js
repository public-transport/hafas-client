#!/usr/bin/env node
'use strict'

const mri = require('mri')
const {join} = require('path')
const {to: fromCli} = require('cli-native')
const createClient = require('..')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const argv = mri(process.argv.slice(2))

const profile = require(join('../p', argv._[0]))
const client = createClient(profile, 'hafas-client debug CLI')

const fn = client[argv._[1]]
const args = argv._.slice(2).map(arg => fromCli(arg))

fn(...args)
.then((res) => {
	process.stdout.write(JSON.stringify(res) + '\n')
})
.catch(showError)
