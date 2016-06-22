'use strict'



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
