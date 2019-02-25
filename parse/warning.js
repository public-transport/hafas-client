'use strict'

const brToNewline = require('br2nl')
const omit = require('lodash/omit')

const parseDateTime = require('./date-time')

const typesByIcon = Object.assign(Object.create(null), {
	HimWarn: 'status'
})

const parseMsgEdge = (profile, data) => (e) => {
	const res = omit(e, ['icoX', 'fLocX', 'tLocX'])
	const icons = data.icoL || []
	res.icon = 'number' === typeof e.icoX && icons[e.icoX] || null
	res.fromLoc = 'number' === typeof e.fLocX && data.locations[e.fLocX] || null
	res.toLoc = 'number' === typeof e.tLocX && data.locations[e.tLocX] || null
	return res
}
const parseMsgEvent = (profile, data) => (e) => {
	return {
		fromLoc: 'number' === typeof e.fLocX && data.locations[e.fLocX] || null,
		toLoc: 'number' === typeof e.tLocX && data.locations[e.tLocX] || null,
		start: parseDateTime(profile, e.fDate, e.fTime, null),
		end: parseDateTime(profile, e.tDate, e.tTime, null),
		sections: e.sectionNums || [] // todo: parse
	}
}

const parseWarning = (profile, w, data) => {
	const icons = data.icoL || []
	// todo: act, pub, lead, tckr, fLocX, tLocX, prod, comp,
	// todo: cat (1, 2), pubChL, rRefL, impactL
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
	// { name: '1',
	// fDate: '20190219',
	// fTime: '000000',
	// tDate: '20190225',
	// tTime: '120000' }

	const icon = 'number' === typeof w.icoX && icons[w.icoX] || null
	const type = icon && icon.res && typesByIcon[icon.res] || 'warning'

	const res = {
		type,
		id: w.hid || null,
		summary: w.head ? brToNewline(w.head) : null, // todo: decode HTML entities?
		text: w.text ? brToNewline(w.text) : null, // todo: decode HTML entities?
		icon,
		priority: w.prio,
		category: w.cat || null // todo: parse to sth meaningful
	}
	if ('prod' in w) res.products = profile.parseProducts(w.prod)

	if (w.edgeRefL && data.himMsgEdgeL) {
		res.edges = w.edgeRefL
		.map(i => data.himMsgEdgeL[i])
		.filter(e => !!e)
		.map(parseMsgEdge(profile, data))
	}
	if (w.eventRefL && data.himMsgEventL) {
		res.events = w.eventRefL
		.map(i => data.himMsgEventL[i])
		.filter(e => !!e)
		.map(parseMsgEvent(profile, data))
	}

	// todo: pass tzOffset to `parseDateTime`
	if (w.sDate && w.sTime) res.validFrom = parseDateTime(profile, w.sDate, w.sTime, null)
	if (w.eDate && w.eTime) res.validUntil = parseDateTime(profile, w.eDate, w.eTime, null)
	if (w.lModDate && w.lModTime) res.modified = parseDateTime(profile, w.lModDate, w.lModTime, null)

	return res
}

module.exports = parseWarning
