'use strict'

const moment = require('moment-timezone')

const formatDate = (profile, when) => {
	return moment(when).tz(profile.timezone).format('YYYYMMDD')
}

module.exports = formatDate
