'use strict'

const slugg = require('slugg')

const parseOperator = (profile, a) => {
	const name = a.name && a.name.trim()
	if (!name) return null
	return {
		type: 'operator',
		id: slugg(a.name), // todo: find a more reliable way
		name
	}
}

module.exports = parseOperator
