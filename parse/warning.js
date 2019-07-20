'use strict'

const brToNewline = require('@derhuerst/br2nl')

const parseDateTime = require('./date-time')

const typesByIcon = Object.assign(Object.create(null), {
	HimWarn: 'status'
})

// todo: is passing in profile necessary?
const parseWarning = (profile, w, icons) => {
	// todo: pass `d`/`d.common` in, parse `w.fLocX`/`w.tLocX`/`w.icoX`
	// todo: hid, act, pub, lead, tckr, comp,
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

	const icon = 'number' === typeof w.icoX && icons[w.icoX] || null
	const type = icon && icon.res && typesByIcon[icon.res] || 'warning'

	const res = {
		id: w.hid || null,
		type,
		summary: w.head ? brToNewline(w.head) : null, // todo: decode HTML entities
		text: w.text ? brToNewline(w.text) : null, // todo: decode HTML entities
		priority: w.prio,
		category: w.cat || null // todo: parse to sth meaningful
	}
	if ('prod' in w) res.products = profile.parseProducts(61442)

	if (w.sDate && w.sTime) res.validFrom = parseDateTime(profile, w.sDate, w.sTime, null)
	if (w.eDate && w.eTime) res.validUntil = parseDateTime(profile, w.eDate, w.eTime, null)
	if (w.lModDate && w.lModTime) res.modified = parseDateTime(profile, w.lModDate, w.lModTime, null)

	return res
}

module.exports = parseWarning
