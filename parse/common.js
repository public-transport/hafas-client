'use strict'

const get = require('lodash/get')
const findInTree = require('../lib/find-in-tree')

const parseCommonData = (_ctx) => {
	const {parse, opt, res} = _ctx
	const c = res.common || {}

	const common = {}
	const ctx = {..._ctx, common}

	common.operators = []
	if (Array.isArray(c.opL)) {
		common.operators = c.opL.map(op => parse('operator', op))
		findInTree(res, '**.oprX', (idx, parent) => {
			if ('number' === typeof idx) parent.operator = common.operators[idx]
		})
	}

	common.icons = []
	if (Array.isArray(c.icoL)) {
		common.icons = c.icoL.map(icon => parse('icon', icon))
		findInTree(res, '**.icoX', (idx, parent) => {
			if ('number' === typeof idx) parent.icon = common.icons[idx]
		})
	}

	common.lines = []
	if (Array.isArray(c.prodL)) {
		common.lines = c.prodL.map(l => parse('line', l))

		findInTree(res, '**.prodX', (idx, parent) => {
			if ('number' === typeof idx) parent.line = common.lines[idx]
		})
		findInTree(res, '**.pRefL', (idxs, parent) => {
			parent.lines = idxs.filter(idx => !!common.lines[idx]).map(idx => common.lines[idx])
		})
		// todo
		// **.dep.dProdX: departureLine -> common.lines[idx]
		// **.arr.aProdX: arrivalLine -> common.lines[idx]
	}

	common.locations = []
	if (Array.isArray(c.locL)) {
		common.locations = c.locL.map(loc => parse('location', loc))

		for (let i = 0; i < common.locations.length; i++) {
			const raw = c.locL[i]
			const loc = common.locations[i]
			if ('number' === typeof raw.mMastLocX) {
				loc.station = Object.assign({}, common.locations[raw.mMastLocX])
				loc.station.type = 'station'
			} else if (raw.isMainMast) loc.type = 'station'
		}

		// todo: correct props?
		findInTree(res, '**.locX', (idx, parent) => {
			if ('number' === typeof idx) parent.location = common.locations[idx]
		})
		findInTree(res, '**.ani.fLocX', (idxs, parent) => {
			parent.fromLocations = idxs.map(idx => common.locations[idx])
		})
		findInTree(res, '**.ani.tLocX', (idxs, parent) => {
			parent.toLocations = idxs.map(idx => common.locations[idx])
		})
		findInTree(res, '**.fLocX', (idx, parent) => {
			if ('number' === typeof idx) parent.fromLocation = common.locations[idx]
		})
		findInTree(res, '**.tLocX', (idx, parent) => {
			if ('number' === typeof idx) parent.toLocation = common.locations[idx]
		})
	}

	common.hints = []
	if (opt.remarks && Array.isArray(c.remL)) {
		common.hints = c.remL.map(hint => parse('hint', hint))
		findInTree(res, '**.remX', (idx, parent) => {
			if ('number' === typeof idx) parent.hint = common.hints[idx]
		})
	}
	common.warnings = []
	if (opt.remarks && Array.isArray(c.himL)) {
		common.warnings = c.himL.map(w => parse('warning', w))
		findInTree(res, '**.himX', (idx, parent) => {
			if ('number' === typeof idx) parent.warning = common.warnings[idx]
		})
	}

	common.polylines = []
	if (opt.polylines && Array.isArray(c.polyL)) {
		common.polylines = c.polyL.map(p => parse('polyline', p))
		// todo: **.ani.poly -> parsePolyline()

		findInTree(res, '**.polyG.polyXL', (idxs, _, path) => {
			const idx = idxs.find(idx => !!common.polylines[idx]) // find any given polyline
			const jny = get(res, path.slice(0, -2))
			jny.polyline = common.polylines[idx]
		})
	}

	return common
}

module.exports = parseCommonData
