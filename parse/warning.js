'use strict'

const brToNewline = require('br2nl')

const parseDateTime = require('./date-time')

// todo: is passing in profile necessary?
const parseWarning = (profile, w) => {
	// todo: hid, act, pub, lead, tckr, icoX, fLocX, tLocX, prod, comp,
	// todo: cat (1, 2), pubChL
	// pubChL:
	// [ { name: 'timetable',
	// fDate: '20180606',
	// fTime: '073000',
	// tDate: '20180713',
	// tTime: '030000' },
	// { name: 'export',
	// fDate: '20180606',
	// fTime: '073000',
	// tDate: '20180713',
	// tTime: '030000' } ]

	return {
		type: 'warning',
		summary: brToNewline(w.head),
		text: brToNewline(w.text),
		priority: w.prio,
		category: w.cat, // todo: parse to sth meaningful
		validFrom: parseDateTime(profile, w.sDate, w.sTime).toISO(),
		validUntil: parseDateTime(profile, w.eDate, w.eTime).toISO(),
		modified: parseDateTime(profile, w.lModDate, w.lModTime).toISO()
	}
}

module.exports = parseWarning
