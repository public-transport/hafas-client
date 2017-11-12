'use strict'

const moment = require('moment-timezone')

const parseDateTime = (profile, date, time) => {
	let offset = 0 // in days
	if (time.length > 6) {
		offset = +time.slice(0, -6)
		time = time.slice(-6)
	}

	return moment.tz(date + 'T' + time, profile.timezone)
	.add(offset, 'days')
}

module.exports = parseDateTime
