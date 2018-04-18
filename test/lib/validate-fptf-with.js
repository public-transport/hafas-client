'use strict'

const {defaultValidators, createRecurse} = require('validate-fptf')
const validators = require('./validators')

const create = (cfg, customValidators = {}) => {
	const vals = Object.assign({}, defaultValidators)
	for (let key of Object.keys(validators)) {
		vals[key] = validators[key](cfg)
	}
	Object.assign(vals, customValidators)
	const recurse = createRecurse(vals)

	const validateFptfWith = (t, item, allowedTypes, name) => {
		try {
			recurse(allowedTypes, item, name)
		} catch (err) {
			t.ifError(err) // todo: improve error logging
		}
	}
	return validateFptfWith
}

module.exports = create
