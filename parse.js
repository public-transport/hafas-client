'use strict'

const moment = require('moment-timezone')



const dateTime = (tz, date, time) => {
	let offset = 0 // in days
	if (time.length > 6) {
		offset = +time.slice(0, -6)
		time = time.slice(-6)
	}
	return moment.tz(date + 'T' + time, tz)
	.add(offset, 'days')
	.valueOf()
}



const types = {P: 'poi', S: 'station', A: 'address'}
// todo: what is s.rRefL?
const location = (l) => {
	const type = types[l.type] || 'unknown'
	const result = {
		  type, name: l.name
		, latitude:  l.crd ? l.crd.y / 1000000 : null
		, longitude: l.crd ? l.crd.x / 1000000 : null
	}
	if (type === 'poi' || type === 'station') result.id = parseInt(l.extId)
	if ('pCls' in l) result.products = l.pCls
	return result
}



// todo: what is p.number vs p.line?
// todo: what is p.icoX?
// todo: what is p.cls?
// todo: what is p.oprX?
const product = (p) => {
	if (!p.prodCtx) return null
	return {
		name: p.name, nr: +p.number, class: p.cls,
		productCode: +p.prodCtx.catCode, productName: p.prodCtx.catOutS
	}
}



const remark = (r) => null // todo



const agency = (a) => a.name



// s = stations, p = products, r = remarks, c = connection
const stop = (tz, s, p, r, c) => (st) => {
	const result = {station:   s[parseInt(st.locX)]}
	if (st.aTimeR || st.aTimeS) result.arrival =
		new Date(dateTime(tz, c.date, st.aTimeR || st.aTimeS))
	if (st.dTimeR || st.dTimeS) result.departure =
		new Date(dateTime(tz, c.date, st.dTimeR || st.dTimeS))
	return result
}

// todo: finish parseRemark first
// s = stations, p = products, r = remarks, c = connection
const applyRemark = (s, p, r, c) => (rm) => null

// todo: pt.sDays
// todo: pt.dep.dProgType, pt.arr.dProgType
// todo: what is pt.jny.dirFlg?
// todo: how does pt.freq work?
// s = stations, p = products, r = remarks, c = connection
const part = (tz, s, p, r, c) => (pt) => {
	const result = {
		  from:      s[parseInt(pt.dep.locX)]
		, to:        s[parseInt(pt.arr.locX)]
		, start:     new Date(dateTime(tz, c.date, pt.dep.dTimeR || pt.dep.dTimeS))
		, end:       new Date(dateTime(tz, c.date, pt.arr.aTimeR || pt.arr.aTimeS))
	}
	if (pt.dep.dTimeR && pt.dep.dTimeS) result.delay =
		dateTime(tz, c.date, pt.dep.dTimeR) - dateTime(tz, c.date, pt.dep.dTimeS)
	if (pt.type === 'WALK') result.type = 'walking'
	else if (pt.type === 'JNY') {
		result.product = p[parseInt(pt.jny.prodX)]
		result.direction = pt.jny.dirTxt // todo: parse this
		if (pt.jny.stopL) result.passed = pt.jny.stopL.map(stop(tz, s, p, r, c))
		if (Array.isArray(pt.jny.remL))
			pt.jny.remL.forEach(applyRemark(s, p, r, c))

		if (pt.jny.freq && pt.jny.freq.jnyL)
			result.alternatives = pt.jny.freq.jnyL
				.filter((a) => a.stopL[0].locX === pt.dep.locX)
				.map((a) => ({
					product: p[parseInt(a.prodX)],
					when:    new Date(dateTime(tz, c.date, a.stopL[0].dTimeS))
				}))
	}
	return result
}

// todo: c.sDays
// todo: c.dep.dProgType, c.arr.dProgType
// todo: c.conSubscr
// todo: c.trfRes x vbb-parse-ticket
// todo: use computed information from part
// s = stations, p = products, r = remarks
const route = (tz, s, p, r) => (c) => {
	const parts = c.secL.map(part(tz, s, p, r, c))
	return {
		  parts
		, from:  parts[0].from
		, start: parts[0].start
		, to:    parts[parts.length - 1].to
		, end:   parts[parts.length - 1].end
	}
}

// todo: what is d.jny.dirFlg?
// todo: d.stbStop.dProgType
// todo: what is d.stbStop.dTimeR?
// tz = timezone, s = stations, p = products, r = remarks
const departure = (tz, s, p, r) => (d) => {
	const result = {
		  station:   s[parseInt(d.stbStop.locX)]
		, when:      new Date(dateTime(tz, d.date, d.stbStop.dTimeR || d.stbStop.dTimeS))
		, direction: d.dirTxt
		, product:   p[parseInt(d.prodX)]
		, remarks:   d.remL ? d.remL.map((rm) => r[parseInt(rm.remX)]) : null
		, trip:      +d.jid.split('|')[1]
	}
	if (d.stbStop.dTimeR && d.stbStop.dTimeS) result.delay =
		dateTime(tz, d.date, d.stbStop.dTimeR) - dateTime(tz, d.date, d.stbStop.dTimeS)
	return result
}

// todo: remarks
// todo: products
// todo: what is s.pCls?
// todo: what is s.wt?
// todo: what is s.dur?
const nearby = (n) => {
	const result = location(n)
	result.distance = n.dist
	return result
}

// todo: what is m.dirGeo? maybe the speed?
// todo: what is m.stopL?
// todo: what is m.proc? wut?
// todo: what is m.pos?
// todo: what is m.ani.dirGeo[n]? maybe the speed?
// todo: what is m.ani.proc[n]? wut?
// todo: how does m.ani.poly work?
// tz = timezone, l = locations, p = products, r = remarks
const movement = (tz, l, p, r) => (m) => {
	const result = {
		  direction: m.dirTxt
		, product:   p[m.prodX]
		, latitude:  m.pos ? m.pos.y / 1000000 : null
		, longitude: m.pos ? m.pos.x / 1000000 : null
		, nextStops: m.stopL.map((s) => ({
			  station:   l[s.locX]
			, departure: s.dTimeR || s.dTimeS ?
				new Date(dateTime(tz, m.date, s.dTimeR || s.dTimeS)) : null
			, arrival: s.aTimeR || s.aTimeS ?
				new Date(dateTime(tz, m.date, s.aTimeR || s.aTimeS)) : null
		}))
		, frames: []
	}
	if (m.ani && Array.isArray(m.ani.mSec))
		for (let i = 0; i < m.ani.mSec.length; i++)
			result.frames.push({
				from: l[m.ani.fLocX[i]],
				to: l[m.ani.tLocX[i]],
				t: m.ani.mSec[i]
			})
	return result
}



module.exports = {
	dateTime,
	location, product, remark, agency,
	stop, applyRemark, part, route,
	departure,
	nearby,
	movement
}
