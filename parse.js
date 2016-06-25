'use strict'

const moment = require('moment-timezone')



const dateTime = (timezone) => (date, time) => {
	let offset = 0 // in days
	if (time.length > 6) {
		offset = +time.slice(0, -6)
		time = time.slice(-6)
	}
	return moment.tz(date + 'T' + time, timezone)
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
module.exports = {
	dateTime,
	location, product, remark, agency
}
