'use strict'

const {parse} = require('qs')

const POI = 'P'
const STATION = 'S'
const ADDRESS = 'A'

const leadingZeros = /^0+/

const parseNr = nr => parseFloat(nr.slice(0, 2) + '.' + nr.slice(2))

// todo: what is s.rRefL?
const parseLocation = (ctx, l) => {
	const {profile, opt} = ctx

	const lid = parse(l.lid, {delimiter: '@'})
	const res = {
		type: 'location',
		id: (l.extId || lid.L || lid.b || '').replace(leadingZeros, '') || null,

		latitude: (
			l.crd && 'number' === typeof l.crd.y
			? parseNr(l.crd.y + '')
			: (lid.Y ? parseNr(lid.Y) : null)
		),
		longitude: (
			l.crd && 'number' === typeof l.crd.x
			? parseNr(l.crd.x + '')
			: (lid.X ? parseNr(lid.X) : null)
		),
	}

	if (l.type === STATION) {
		const stop = {
			type: l.isMainMast ? 'station' : 'stop',
			id: res.id,
			name: l.name || id.O ? profile.parseStationName(ctx, l.name || id.O) : null,
			location: 'number' === typeof res.latitude ? res : null // todo: remove `.id`
		}

		if ('pCls' in l) stop.products = profile.parseProductsBitmask(ctx, l.pCls)
		if ('meta' in l) stop.isMeta = !!l.meta

		if (opt.linesOfStops && Array.isArray(l.lines)) {
			stop.lines = l.lines
		}

		return stop
	}

	if (l.type === ADDRESS) res.address = l.name
	else res.name = l.name
	if (l.type === POI) res.poi = true

	return res
}

module.exports = parseLocation
