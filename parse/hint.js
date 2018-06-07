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
	}
})

// todo: is passing in profile necessary?
const parseHint = (profile, h) => {
	// todo: U "stop cancelled"?
	// todo: C

	// todo: find sth more reliable than this
	if (h.type === 'P' && h.txtN.toLowerCase().trim() === 'journey cancelled') {
		return {
			type: 'status',
			code: 'journey-cancelled',
			text: h.txtN
			// todo: `h.sIdx`
		}
	}
	if (h.type === 'L') {
		return {
			type: 'status',
			code: 'alternative-trip',
			text: h.txtN,
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
			text: h.txtN || ''
		}
	}
	return null
}

module.exports = parseHint
