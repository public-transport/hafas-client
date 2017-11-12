'use strict'

const moment = require('moment-timezone')

const formatTime = (profile, when) => {
	return moment(when).tz(profile.timezone).format('HHmmss')
}

module.exports = formatTime
