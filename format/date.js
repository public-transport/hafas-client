'use strict'

const moment = require('moment-timezone')

const formatDate = (tz, when) => {
	moment(when).tz(tz).format('YYYYMMDD')
}

module.exports = formatDate
