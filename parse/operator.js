'use strict'

const slugg = require('slugg')

// todo: is passing in profile necessary?
const parseOperator = (profile, a) => {
	return {
		type: 'operator',
		id: slugg(a.name), // todo: find a more reliable way
		name: a.name
	}
}

module.exports = parseOperator
