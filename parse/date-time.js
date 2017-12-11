'use strict'

const {DateTime} = require('luxon')

const validDate = /^(\d{4})-(\d{2})-(\d{2})$/

const parseDateTime = (profile, date, time) => {
	const pDate = [date.substr(-8, 4), date.substr(-4, 2), date.substr(-2, 2)]
	if (!pDate[0] || !pDate[1] || !pDate[2]) {
		throw new Error('invalid date format: ' + date)
	}

	const pTime = [time.substr(-6, 2), time.substr(-4, 2), time.substr(-2, 2)]
	if (!pTime[0] || !pTime[1] || !pTime[2]) {
		throw new Error('invalid time format: ' + time)
	}

	const offset = time.length > 6 ? parseInt(time.slice(0, -6)) : 0

	console.error(pDate, pTime, offset)
	const dt = DateTime.fromISO(pDate.join('-') + 'T' + pTime.join(':'), {
		locale: profile.locale,
		zone: profile.timezone
	})
	return offset > 0 ? dt.plus({days: offset}) : dt
}

module.exports = parseDateTime
