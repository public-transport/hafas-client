'use strict'

// todo: what is p.number vs p.line?
// todo: what is p.icoX?
// todo: what is p.oprX?
const parseLine = (p) => {
	if (!p) return null // todo: handle this upstream
	const res = {type: 'line', name: p.line || p.name}

	if (p.cls) res.class = p.cls
	if (p.prodCtx) {
		res.productCode = +p.prodCtx.catCode
		res.productName = p.prodCtx.catOutS
	}

	return res
}

module.exports = parseLine
