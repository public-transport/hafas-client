'use strict'

const {DateTime, IANAZone} = require('luxon')

const timezones = new WeakMap()

// todo: change to `(profile) => (when) => {}`
const formatDate = (profile, when) => {
	let timezone
	if (timezones.has(profile)) timezone = timezones.get(profile)
	else {
		timezone = new IANAZone(profile.timezone)
		timezones.set(profile, timezone)
	}

	return DateTime.fromMillis(+when, {
		locale: profile.locale,
		zone: timezone
	}).toFormat('yyyyMMdd')
}

module.exports = formatDate
