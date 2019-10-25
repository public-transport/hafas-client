'use strict'

const slugg = require('slugg')

const parseOperator = ({parsed}, a) => {
	const name = a.name && a.name.trim()
	if (!name) return null
	return {
		...parsed,
		type: 'operator',
		id: slugg(a.name), // todo: find a more reliable way
		name
	}
}

module.exports = parseOperator
