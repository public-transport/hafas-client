'use strict'

const hints = Object.assign(Object.create(null), {
	fb: {
		type: 'hint',
		code: 'bicycle-conveyance',
		text: 'bicycles conveyed'
	},
	nf: {
		type: 'hint',
		code: 'no-bicycle-conveyance',
		text: 'bicycles not conveyed'
	},
	k2: {
		type: 'hint',
		code: '2nd-class-only',
		text: '2. class only'
	},
	eh: {
		type: 'hint',
		code: 'boarding-ramp',
		text: 'vehicle-mounted boarding ramp available'
	},
	wv: {
		type: 'hint',
		code: 'wifi',
		text: 'WiFi available'
	},
	sn: {
		type: 'hint',
		code: 'snacks',
		text: 'snacks available for purchase'
	},
	bf: {
		type: 'hint',
		code: 'barrier-free',
		text: 'barrier-free'
	},
	rg: {
		type: 'hint',
		code: 'barrier-free-vehicle',
		text: 'barrier-free vehicle'
	},
	bt: {
		type: 'hint',
		code: 'on-board-bistro',
		text: 'Bordbistro available'
	},
	br: {
		type: 'hint',
		code: 'on-board-restaurant',
		text: 'Bordrestaurant available'
	},
	ki: {
		type: 'hint',
		code: 'childrens-area',
		text: `children's area available`
	},
	ls: {
		type: 'hint',
		code: 'power-sockets',
		text: 'power sockets available'
	},
	ev: {
		type: 'hint',
		code: 'replacement-service',
		text: 'replacement service'
	},
	kl: {
		type: 'hint',
		code: 'air-conditioned',
		text: 'air-conditioned vehicle'
	},
	r0: {
		type: 'hint',
		code: 'upward-escalator',
		text: 'upward escalator'
	},
	au: {
		type: 'hint',
		code: 'elevator',
		text: 'elevator available'
	}
})

// todo: is passing in profile necessary?
const parseHint = (profile, h) => {
	// todo: C

	const text = h.txtN && h.txtN.trim() || ''

	if (h.type === 'M') {
		return {
			type: 'status',
			code: h.code || null,
			summary: h.txtS && h.txtS.trim() || '',
			text
		}
	}
	if (h.type === 'D') {
		return {
			type: 'status',
			code: h.code || null,
			text
		}
	}

	// todo: find sth more reliable than this
	if (h.type === 'P' && text.toLowerCase() === 'journey cancelled') {
		return {
			type: 'status',
			code: 'journey-cancelled',
			text
			// todo: `h.sIdx`
		}
	}
	if (h.type === 'U' && text.toLowerCase() === 'stop cancelled') {
		return {
			type: 'status',
			code: 'stop-cancelled',
			text
		}
	}
	// todo:
	// {
	//   "type": "U",
	//   "code": "",
	//   "icoX": 3,
	//   "txtN": "entrance and exit not possible"
	// }
	if (h.type === 'U') {
		return {
			type: 'status',
			code: h.code || null,
			text
		}
	}

	if (h.type === 'L') {
		return {
			type: 'status',
			code: 'alternative-trip',
			text,
			journeyId: h.jid
		}
	}
	if (h.type === 'A') {
		return hints[h.code && h.code.trim().toLowerCase()] || null
	}
	if (h.type === 'R') {
		// todo: how can we identify the individual types?
		return {
			type: 'status',
			code: h.code,
			text
		}
	}
	return null
}

module.exports = parseHint
