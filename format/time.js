'use strict'

const {DateTime} = require('luxon')

const formatTime = (profile, when) => {
	return DateTime.fromMillis(+when, {
		locale: profile.locale,
		zone: profile.timezone
	}).toFormat('HHmmss')
}

module.exports = formatTime
