'use strict'

const _parseWhen = require('../parse/when')

const parseWhen = (profile, date, rtDate, time, rtTime, tzOffset, cncl = false) => {
	// todo: compute `rtTime` offset using `rtDate`
	if (date) date = date.replace(/-/g, '')
	if (time) time = time.replace(/:/g, '')
	if (rtTime) rtTime = rtTime.replace(/:/g, '')
	return _parseWhen(profile, date, time, rtTime, tzOffset, cncl)
}

module.exports = parseWhen
