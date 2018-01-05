'use strict'

const {DateTime} = require('luxon')

const formatDate = (profile, when) => {
	return DateTime.fromMillis(+when, {
		locale: profile.locale,
		zone: profile.timezone
	}).toFormat('yyyyMMdd')
}

module.exports = formatDate
