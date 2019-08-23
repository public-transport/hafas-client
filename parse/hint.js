'use strict'

const codesByIcon = Object.assign(Object.create(null), {
	cancel: 'cancelled'
})

// todo: is passing in profile necessary?
// todo: pass in tag list from hint reference, e.g.:
// "tagL": [
// 	"RES_JNY_H3" // H3 = level 3 heading? shown on overview
// ]
// "tagL": [
// 	"RES_JNY_DTL" // only shown in journey detail
// ]
const parseHint = (profile, h, _) => {
	// todo: C
	// todo:
	// { type: 'Q',
	//   code: '',
	//   icoX: 11,
	//   txtN:
	//    'RE  3132: Berlin Zoologischer Garten - Brandenburg Hbf: Information. A railway carriage is missing',
	//   sIdx: 4 }

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
			code: h.code || null,
			text: h.txtN || null
		}
	}

	if (h.type === 'D' || h.type === 'U' || h.type === 'R' || h.type === 'N' || h.type === 'Y') {
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

module.exports = parseHint
