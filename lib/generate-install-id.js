#!/usr/bin/env node

const {randomBytes} = require('crypto')

const id = randomBytes(6).toString('hex')
process.stdout.write(JSON.stringify(id) + '\n')
