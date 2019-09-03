'use strict'

const brToNewline = require('@derhuerst/br2nl')
const omit = require('lodash/omit')

const typesByIcon = Object.assign(Object.create(null), {
	HimWarn: 'status'
})

const parseMsgEdge = (profile) => (e) => {
	const res = omit(e, [
		'icoX',
		'fLocX', 'fromLocation',
		'tLocX', 'toLocation'
	])
	res.icon = e.icon || null
	// todo: rename `Loc` -> `Location` [breaking]
	res.fromLoc = e.fromLocation || null
	res.toLoc = e.toLocation || null
	return res
}
const parseMsgEvent = (profile) => (e) => {
	return {
		// todo: rename `Loc` -> `Location` [breaking]
		fromLoc: e.fromLocation || null,
		toLoc: e.toLocation || null,
		start: profile.parseDateTime(profile, e.fDate, e.fTime, null),
		end: profile.parseDateTime(profile, e.tDate, e.tTime, null),
		sections: e.sectionNums || [] // todo: parse
	}
}

const parseWarning = (profile, w, data) => {
	// todo: act, pub, lead, tckr, prod, comp,
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

	const icon = w.icon || null
	const type = icon && icon.type && typesByIcon[icon.type] || 'warning'

	const res = {
		id: w.hid || null,
		type,
		summary: w.head ? brToNewline(w.head) : null, // todo: decode HTML entities?
		text: w.text ? brToNewline(w.text) : null, // todo: decode HTML entities?
		icon, // todo: parse icon
		priority: w.prio,
		category: w.cat || null // todo: parse to sth meaningful
	}
	if ('prod' in w) res.products = profile.parseProducts(w.prod)

	if (w.edgeRefL && data.himMsgEdgeL) {
		res.edges = w.edgeRefL
		.map(i => data.himMsgEdgeL[i])
		.filter(e => !!e)
		.map(parseMsgEdge(profile))
	}
	if (w.eventRefL && data.himMsgEventL) {
		res.events = w.eventRefL
		.map(i => data.himMsgEventL[i])
		.filter(e => !!e)
		.map(parseMsgEvent(profile))
	}

	if (w.sDate && w.sTime) res.validFrom = profile.parseDateTime(profile, w.sDate, w.sTime, null)
	if (w.eDate && w.eTime) res.validUntil = profile.parseDateTime(profile, w.eDate, w.eTime, null)
	if (w.lModDate && w.lModTime) res.modified = profile.parseDateTime(profile, w.lModDate, w.lModTime, null)

	return res
}

module.exports = parseWarning
