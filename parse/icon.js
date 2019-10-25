'use strict'

const parseIcon = ({parsed}, i) => {
	const res = {
		...parsed,
		type: i.res || null,
		title: i.text || i.txt || i.txtS || null
	}
	if (i.fg) res.fgColor = i.fg
	if (i.bg) res.bgColor = i.bg
	return res
}

module.exports = parseIcon
