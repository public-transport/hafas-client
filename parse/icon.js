'use strict'

const parseIcon = (profile, i) => {
	const res = {
		type: i.res || null,
		title: i.text || null
	}
	if (i.fg) res.fgColor = i.fg
	if (i.bg) res.bgColor = i.bg
	return res
}

module.exports = parseIcon
