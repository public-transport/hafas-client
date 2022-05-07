import {findRemarks} from './find-remarks.js'

const ARRIVAL = 'a'
const DEPARTURE = 'd'

// todo: pt.jny.dirFlg – https://github.com/alexander-albers/tripkit/blob/07047c6ddef24339ebd49a86a78158bca8047421/Sources/TripKit/Provider/AbstractHafasClientInterfaceProvider.swift#L347-L353 & https://github.com/alexander-albers/tripkit/commit/07047c6ddef24339ebd49a86a78158bca8047421#commitcomment-68471656
// todo: d.stbStop.dProgType/d.stbStop.aProgType
// todo: d.stbStop.dProdX/aProdX can be different than d.prodX

const createParseArrOrDep = (prefix) => {
	if (prefix !== ARRIVAL && prefix !== DEPARTURE) throw new Error('invalid prefix')

	const parseArrOrDep = (ctx, d) => { // d = raw arrival/departure
		const {profile, opt} = ctx
		const {locL} = ctx.res.common

		const tPlanned = d.stbStop[prefix + 'TimeS']
		const tPrognosed = d.stbStop[prefix + 'TimeR']
		const tzOffset = d.stbStop[prefix + 'TZOffset'] || null
		const cancelled = !!d.stbStop[prefix + 'Cncl']
		const plPlanned = d.stbStop[prefix + 'PlatfS'] || (d.stbStop[prefix + 'PltfS'] && d.stbStop[prefix + 'PltfS'].txt) || null
		const plPrognosed = d.stbStop[prefix + 'PlatfR'] || (d.stbStop[prefix + 'PltfR'] && d.stbStop[prefix + 'PltfR'].txt) || null

		const res = {
			tripId: d.jid,
			stop: d.stbStop.location || null,
			...profile.parseWhen(ctx, d.date, tPlanned, tPrognosed, tzOffset, cancelled),
			...profile.parsePlatform(ctx, plPlanned, plPrognosed, cancelled),
			prognosisType: profile.parsePrognosisType(ctx, d.stbStop[prefix + 'ProgType']) || null,
			// todo: for arrivals, this is the *origin*, not the *direction*
			direction: prefix === DEPARTURE && d.dirTxt && profile.parseStationName(ctx, d.dirTxt) || null,
			provenance: prefix === ARRIVAL && d.dirTxt && profile.parseStationName(ctx, d.dirTxt) || null,
			line: d.line || null,
			remarks: [],
			origin: null,
			destination: null
		}

		if (prefix === DEPARTURE && Array.isArray(d.prodL) && d.prodL[0] && locL[d.prodL[0].tLocX]) {
			res.destination = profile.parseLocation(ctx, locL[d.prodL[0].tLocX])
		}

		if (prefix === ARRIVAL && Array.isArray(d.prodL) && d.prodL[0] && locL[d.prodL[0].fLocX]) {
			res.origin = profile.parseLocation(ctx, locL[d.prodL[0].fLocX])
		}

		if (d.pos) {
			res.currentTripPosition = {
				type: 'location',
				latitude: d.pos.y / 1000000,
				longitude: d.pos.x / 1000000,
			}
		}

		if (cancelled) {
			res.cancelled = true
			Object.defineProperty(res, 'canceled', {value: true})
		}

		if (opt.remarks) {
			res.remarks = findRemarks([
				...(d.remL || []),
				...(d.msgL || []),
				...(d.stbStop.remL || []),
				...(d.stbStop.msgL || []),
			]).map(([remark]) => remark)
		}

		if (opt.stopovers && Array.isArray(d.stopL)) {
			// Filter stations the train passes without stopping, as this doesn't comply with FPTF (yet).
			const stopovers = d.stopL
			.map(st => profile.parseStopover(ctx, st, d.date))
			.filter(st => !st.passBy)
			if (prefix === ARRIVAL) res.previousStopovers = stopovers
			else if (prefix === DEPARTURE) res.nextStopovers = stopovers
		}

		return res
	}

	return parseArrOrDep
}

export {
	createParseArrOrDep,
}
