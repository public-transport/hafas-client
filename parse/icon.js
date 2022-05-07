const parseIcon = (ctx, i) => {
	if (i.res === 'Empty') return null
	const res = {
		type: i.res || null,
		title: i.text || i.txt || i.txtS || null
	}
	if (i.fg) res.fgColor = i.fg
	if (i.bg) res.bgColor = i.bg
	return res
}

export {
	parseIcon,
}
