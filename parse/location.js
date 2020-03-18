'use strict'

const {parse} = require('qs')

const POI = 'P'
const STATION = 'S'
const ADDRESS = 'A'

const leadingZeros = /^0+/

// todo: what is l.wt? is it "weight"?
// 	- `6733` for 8013074 with p/vmt
// 	- `3933` for 8012092 with p/vmt
// 	- `2062` for 8010168 with p/vmt
const parseLocation = (ctx, l) => {
	const {profile, opt} = ctx

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
			name: l.name || lid.O ? profile.parseStationName(ctx, l.name || lid.O) : null,
			location: 'number' === typeof res.latitude ? res : null // todo: remove `.id`
		}

		if ('pCls' in l) stop.products = profile.parseProductsBitmask(ctx, l.pCls)
		if ('meta' in l) stop.isMeta = !!l.meta

		if (opt.linesOfStops && Array.isArray(l.lines)) {
			stop.lines = l.lines
		}

		const locHints = (l.remarkRefs || [])
		.filter(ref => !!ref.hint && Array.isArray(ref.tagL))
		.filter(({tagL}) => (
			tagL.includes('RES_LOC') ||
			tagL.find(t => t.slice(0, 8) === 'RES_LOC_') // e.g. `RES_LOC_H3`
		))
		.map(ref => ref.hint)
		const hints = [
			...(l.hints || []),
			...locHints,
		]
		const byType = type => hints.find(h => h.type === type)

		const transitAuthority = (byType('transit-authority') || {}).text
		if (transitAuthority) stop.transitAuthority = transitAuthority

		const dhid = (byType('stop-dhid') || {}).text
		if (dhid) {
			if (!stop.ids) stop.ids = {}
			stop.ids.dhid = dhid
		}

		const otherIds = hints
		.filter(h => h.type === 'foreign-id')
		.filter(h => 'string' === typeof h.text && h.text.includes(':'))
		.map(({text}) => {
			const i = text.indexOf(':')
			return [text.slice(0, i), text.slice(i + 1)]
		})
		if (otherIds.length > 0) {
			if (!stop.ids) stop.ids = {}
			for (const [src, id] of otherIds) stop.ids[src] = id
		}

		return stop
	}

	if (l.type === ADDRESS) res.address = l.name
	else res.name = l.name
	if (l.type === POI) res.poi = true

	return res
}

module.exports = parseLocation
