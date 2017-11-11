'use strict'

const slugg = require('slugg')

const parseOperator = (a) => {
	return {
		type: 'operator',
		id: slugg(a.name), // todo: find a more reliable way
		name: a.name
	}
}

module.exports = parseOperator
