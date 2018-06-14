'use strict'

const a = require('assert')
const is = require('@sindresorhus/is')

const validateItem = require('validate-fptf/lib/item')
const validateReference = require('validate-fptf/lib/reference')

// todo: this is copied code, DRY this up!
// see https://github.com/public-transport/validate-fptf/blob/373b4847ec9668c4a9ec9b0dbd50f8a70ffbe127/line.js
const validateLineWithoutMode = (validate, line, name) => {
	validateItem(line, name)

	a.strictEqual(line.type, 'line', name + '.type must be `line`')

	validateReference(line.id, name + '.id')

	a.strictEqual(typeof line.name, 'string', name + '.name must be a string')
	a.ok(line.name.length > 0, name + '.name can\'t be empty')

	// skipping line validation here
	// see https://github.com/public-transport/hafas-client/issues/8#issuecomment-355839965
	if (is.undefined(line.mode) || is.null(line.mode)) {
		console.error(`ÖBB: Missing \`mode\` for line ${line.name} (at ${name}).`)
	}

	if (!is.undefined(line.subMode)) {
	a.fail(name + '.subMode is reserved an should not be used for now')
	}

	// todo: routes

	if (!is.null(line.operator) && !is.undefined(line.operator)) {
		validate(['operator'], line.operator, name + '.operator')
	}
}

module.exports = validateLineWithoutMode
