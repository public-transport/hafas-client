'use strict'

// todo: what is p.number vs p.line?
// todo: what is p.icoX?
// todo: what is p.oprX?
const parseLine = (p) => {
	if (!p) return null

	const result = {type: 'line', name: p.line || p.name}
	if (p.cls) result.class = p.cls
	if (p.prodCtx) {
		result.productCode = +p.prodCtx.catCode
		result.productName = p.prodCtx.catOutS
	}
	return result
}

module.exports = parseLine
