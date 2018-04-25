'use strict'

const {defaultValidators} = require('validate-fptf')
const anyOf = require('validate-fptf/lib/any-of')

const validators = require('./validators')

const create = (cfg, customValidators = {}) => {
	const val = Object.assign({}, defaultValidators)
	for (let key of Object.keys(validators)) {
		val[key] = validators[key](cfg)
	}
	Object.assign(val, customValidators)

	const validateFptfWith = (t, item, allowedTypes, name) => {
		try {
			if ('string' === typeof allowedTypes) {
				val[allowedTypes](val, item, name)
			} else {
				anyOf(allowedTypes, val, item, name)
			}
			t.pass(name + ' is valid')
		} catch (err) {
			t.ifError(err) // todo: improve error logging
		}
	}
	return validateFptfWith
}

module.exports = create
