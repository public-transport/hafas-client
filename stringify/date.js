'use strict'

const moment = require('moment-timezone')

const stringifyDate = (tz, when) => {
	moment(when).tz(tz).format('YYYYMMDD')
}

module.exports = stringifyDate
