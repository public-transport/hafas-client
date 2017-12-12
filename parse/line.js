'use strict'

// todo: are p.number and p.line ever different?
// todo: operator from p.oprX?
const parseLine = (profile, p) => {
	if (!p) return null // todo: handle this upstream
	const res = {
		type: 'line',
		name: p.line || p.name,
		public: true
	}

	if (p.cls) res.class = p.cls
	if (p.prodCtx) res.productCode = +p.prodCtx.catCode

	// todo: parse mode, remove from profiles

	return res
}

module.exports = parseLine
