const codesByIcon = Object.assign(Object.create(null), {
	cancel: 'cancelled',
	himWarn: 'disturbance',
})

const linkTypesByCode = Object.assign(Object.create(null), {
	BB: 'stop-website',
	// IFOPT-based DHID
	// https://wiki.openstreetmap.org/wiki/DE:Key:ref:IFOPT
	// https://trid.trb.org/view/1435440
	IF: 'stop-dhid',
	OZ: 'transit-authority',
	// todo: `{type: 'I',code: 'TD',icoX: 1,txtN: '8010224'}`
	// todo: `{type: 'I',code: 'TE',icoX: 1,txtN: '8024001'}`
})

// todo: pass in tag list from hint reference, e.g.:
// "tagL": [
// 	"RES_JNY_H3" // H3 = level 3 heading? shown on overview
// ]
// "tagL": [
// 	"RES_JNY_DTL" // only shown in journey detail
// ]
// todo: https://github.com/public-transport/hafas-client/issues/5
// todo: expose h.type somehow
// todo: https://github.com/KDE/kpublictransport/blob/39ac8f9586b9300fa8a9ba0dec010e96fab9ab08/src/lib/backends/hafasmgateparser.cpp#L56-L72
// todo: h.sty

// SNCB:
// {
// 	"type": "A",
// 	"code": "60",
// 	"prio": 10,
// 	"icoX": 2,
// 	"txtN": "Reservierungspflicht"
// }
// {
// 	"type": "A",
// 	"code": "64",
// 	"prio": 110,
// 	"icoX": 2,
// 	"txtN": "Zuschlag"
// }
// {
// 	"type": "I",
// 	"code": "CON_OVERVIEW_TARIF_HINT",
// 	"icoX": 2,
// 	"txtN": "Für diese Strecke ist ein internationales Ticket notwendig."
// }
const parseHint = (ctx, h) => {
	// todo: C

	if (h.type === 'I' && h.code && h.txtN) {
		if (h.code in linkTypesByCode) {
			const text = h.txtN === 'NULL' ? null : h.txtN
			return {type: linkTypesByCode[h.code], text}
		}
		if (h.code === 'TW' && h.txtN[0] === '$') {
			return {type: 'local-fare-zone', text: h.txtN.slice(1)}
		}
		if (h.code === 'TW' && h.txtN[0] === '#') {
			return {type: 'foreign-id', text: h.txtN.slice(1)}
		}
	}

	const text = h.txtN && h.txtN.trim() || ''
	const icon = h.icon || null
	const code = h.code || (icon && icon.type && codesByIcon[icon.type]) || null

	if (h.type === 'M') {
		return {
			type: 'status',
			summary: h.txtS && h.txtS.trim() || '',
			code,
			text
		}
	}

	if (h.type === 'L') {
		return {
			type: 'status',
			code: 'alternative-trip',
			text,
			tripId: h.jid
		}
	}
	if (h.type === 'A' || h.type === 'I') {
		return {
			type: 'hint',
			code,
			text
		}
	}

	if (
		h.type === 'D' || h.type === 'U' || h.type === 'R' || h.type === 'N' ||
		h.type === 'Y' || h.type === 'Q' || h.type === 'P'
	) {
		// todo: how can we identify the individual types?
		// todo: does `D` mean "disturbance"?
		return {
			type: 'status',
			code,
			text
		}
	}

	return null
}

export {
	parseHint,
}
