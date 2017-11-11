'use strict'

const moment = require('moment-timezone')

const formatTime = (tz, when) => {
	return moment(when).tz(tz).format('HHmmss')
}

module.exports = formatTime
