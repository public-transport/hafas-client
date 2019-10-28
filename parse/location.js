'use strict'

const {parse} = require('qs')

const POI = 'P'
const STATION = 'S'
const ADDRESS = 'A'

const leadingZeros = /^0+/

// todo: what is s.rRefL?
const parseLocation = (profile, opt, {lines}, l) => {
	const lid = parse(l.lid, {delimiter: '@'})
	const res = {
		type: 'location',
		id: (l.extId || lid.L || '').replace(leadingZeros, '') || null
	}

	if (l.crd) {
		res.latitude = l.crd.y / 1000000
		res.longitude = l.crd.x / 1000000
	}

	if (l.type === STATION) {
		const stop = {
			type: l.isMainMast ? 'station' : 'stop',
			id: res.id,
			name: l.name ? profile.parseStationName(l.name) : null,
			location: 'number' === typeof res.latitude ? res : null // todo: remove `.id`
		}

		if ('pCls' in l) stop.products = profile.parseProducts(l.pCls)
		if ('meta' in l) stop.isMeta = !!l.meta

		if (
			opt.linesOfStops &&
			Array.isArray(l.pRefL) &&
			Array.isArray(lines)
		) {
			stop.lines = []
			for (let pRef of l.pRefL) {
				const line = lines[pRef]
				if (line) stop.lines.push(line)
			}
		}

		return stop
	}

	if (l.type === ADDRESS) res.address = l.name
	else res.name = l.name
	if (l.type === POI) res.poi = true

	return res
}

module.exports = parseLocation
