'use strict'

const omit = require('lodash/omit')
const _parseHint = require('../parse/hint')

const parseHint = (profile, hint, _) => {
	return _parseHint(profile, {
		...omit(hint, ['value']),
		code: hint.key,
		txtN: hint.value
		// todo: map hint.routeIdxFrom & hint.routeIdxTo
	}, _)
}

module.exports = parseHint
