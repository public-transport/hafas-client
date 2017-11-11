'use strict'

const moment = require('moment-timezone')

const stringifyTime = (tz, when) => {
	return moment(when).tz(tz).format('HHmmss')
}

module.exports = stringifyTime
