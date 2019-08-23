'use strict'

const get = require('lodash/get')
const {findIdxRefs, resolveIdxRefs} = require('../lib/resolve-idx-refs')

// todo: move to separate file
const parseIcon = (i) => {
	const res = {
		type: i.res || null,
		title: i.text || null
	}
	if (i.fg) res.fgColor = i.fg
	if (i.bg) res.bgColor = i.bg
	return res
}

const parseCommonData = (profile, opt, res) => {
	const c = res.common || {}

	res.operators = []
	if (Array.isArray(c.opL)) {
		res.operators = c.opL.map(op => profile.parseOperator(profile, op))
		resolveIdxRefs(res, '**.oprX', res.operators, 'operator')
	}

	res.icons = []
	if (Array.isArray(c.icoL)) {
		res.icons = c.icoL.map(parseIcon)
		resolveIdxRefs(res, '**.icoX', res.icons, 'icon')
	}

	res.lines = []
	if (Array.isArray(c.prodL)) {
		const parse = profile.parseLine(profile, opt, res)
		res.lines = c.prodL.map(parse)

		resolveIdxRefs(res, '**.prodX', res.lines, 'line')
		findIdxRefs(res, '**.pRefL', (idxs, parent) => {
			parent.lines = idxs.filter(idx => !!res.lines[idx]).map(idx => res.lines[idx])
		})
		// todo
		// resolveIdxRefs(res, '**.dep.dProdX', res.lines, 'departureLine')
		// resolveIdxRefs(res, '**.arr.aProdX', res.lines, 'arrivalLine')
	}

	res.locations = []
	if (Array.isArray(c.locL)) {
		const parse = loc => profile.parseLocation(profile, opt, res, loc)
		res.locations = c.locL.map(parse)

		for (let i = 0; i < res.locations.length; i++) {
			const raw = c.locL[i]
			const loc = res.locations[i]
			if ('number' === typeof raw.mMastLocX) {
				loc.station = Object.assign({}, res.locations[raw.mMastLocX])
				loc.station.type = 'station'
			} else if (raw.isMainMast) loc.type = 'station'
		}

		// todo: correct props?
		resolveIdxRefs(res, '**.locX', res.locations, 'location')
		findIdxRefs(res, '**.ani.fLocX', (idxs, parent) => {
			parent.fromLocations = idxs.map(idx => res.locations[idx])
		})
		findIdxRefs(res, '**.ani.tLocX', (idxs, parent) => {
			parent.toLocations = idxs.map(idx => res.locations[idx])
		})
		resolveIdxRefs(res, '**.fLocX', res.locations, 'fromLocation')
		resolveIdxRefs(res, '**.tLocX', res.locations, 'toLocation')
	}

	res.hints = []
	if (opt.remarks && Array.isArray(c.remL)) {
		res.hints = c.remL.map(hint => profile.parseHint(profile, hint, {...c, ...res}))
		resolveIdxRefs(res, '**.remX', res.hints, 'hint')
	}
	res.warnings = []
	if (opt.remarks && Array.isArray(c.himL)) {
		res.warnings = c.himL.map(w => profile.parseWarning(profile, w, {...c, ...res}))
		resolveIdxRefs(res, '**.himX', res.warnings, 'warning')
	}

	res.polylines = []
	if (opt.polylines && Array.isArray(c.polyL)) {
		const parse = profile.parsePolyline(profile, opt, res)
		res.polylines = c.polyL.map(parse)
		// todo: **.ani.poly -> parsePolyline()

		findIdxRefs(res, '**.polyG.polyXL', (idxs, _, path) => {
			const idx = idxs.find(idx => !!res.polylines[idx]) // find any given polyline
			const jny = get(res, path.slice(0, -2))
			jny.polyline = res.polylines[idx]
		})
	}

	return res
}

module.exports = parseCommonData
