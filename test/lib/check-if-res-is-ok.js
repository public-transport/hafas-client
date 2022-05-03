'use strict'

const tap = require('tap')
const checkIfResIsOk = require('../../lib/check-if-res-is-ok')
const {
	INVALID_REQUEST,
	NOT_FOUND,
	HafasError,
	HafasInvalidRequestError,
	HafasNotFoundError,
} = require('../../lib/errors')

const resParameter = require('../fixtures/error-parameter.json')
const resNoMatch = require('../fixtures/error-no-match.json')
const resH9360 = require('../fixtures/error-h9360.json')
const resLocation = require('../fixtures/error-location.json')

const secret = Symbol('secret')

tap.test('checkIfResponseIsOk properly throws HAFAS "H9360" errors', (t) => {
	try {
		checkIfResIsOk({
			body: resH9360,
			errProps: {secret},
		})
	} catch (err) {
		t.ok(err)

		t.ok(err instanceof HafasError)
		t.equal(err.isHafasError, true)
		t.equal(err.message.slice(0, 7), 'H9360: ')
		t.ok(err.message.length > 7)

		t.ok(err instanceof HafasInvalidRequestError)
		t.equal(err.isCausedByServer, false)
		t.equal(err.code, INVALID_REQUEST)
		t.equal(err.hafasCode, 'H9360')

		t.equal(err.hafasResponseId, resH9360.id)
		t.equal(err.hafasMessage, 'HAFAS Kernel: Date outside of the timetable period.')
		t.equal(err.hafasDescription, 'Fehler bei der Datumseingabe oder Datum außerhalb der Fahrplanperiode (01.05.2022 - 10.12.2022)')
		t.equal(err.secret, secret)

		t.end()
	}
})

tap.test('checkIfResponseIsOk properly throws HAFAS "LOCATION" errors', (t) => {
	try {
		checkIfResIsOk({
			body: resLocation,
			errProps: {secret},
		})
	} catch (err) {
		t.ok(err)

		t.ok(err instanceof HafasError)
		t.equal(err.isHafasError, true)
		t.equal(err.message.slice(0, 10), 'LOCATION: ')
		t.ok(err.message.length > 10)

		t.ok(err instanceof HafasNotFoundError)
		t.equal(err.isCausedByServer, false)
		t.equal(err.code, NOT_FOUND)
		t.equal(err.hafasCode, 'LOCATION')

		t.equal(err.hafasResponseId, resLocation.id)
		t.equal(err.hafasMessage, 'HCI Service: location missing or invalid')
		t.equal(err.hafasDescription, 'Während der Suche ist ein interner Fehler aufgetreten')
		t.equal(err.secret, secret)

		t.end()
	}
})

tap.test('checkIfResponseIsOk properly parses an unknown HAFAS errors', (t) => {
	const body = {
		ver: '1.42',
		id: '1234567890',
		err: 'FOO',
		errTxt: 'random errTxt',
		errTxtOut: 'even more random errTxtOut',
		svcResL: [],
	}

	try {
		checkIfResIsOk({
			body,
			errProps: {secret},
		})
	} catch (err) {
		t.ok(err)

		t.ok(err instanceof HafasError)
		t.equal(err.isHafasError, true)
		t.equal(err.message, `${body.err}: ${body.errTxt}`)

		t.equal(err.isCausedByServer, false)
		t.equal(err.code, null)
		t.equal(err.hafasCode, body.err)

		t.equal(err.hafasResponseId, body.id)
		t.equal(err.hafasMessage, body.errTxt)
		t.equal(err.hafasDescription, body.errTxtOut)
		t.equal(err.secret, secret)

		t.end()
	}
})
