'use strict'

const hints = Object.assign(Object.create(null), {
	fb: {
		type: 'hint',
		code: 'bicycle-conveyance',
		summary: 'bicycles conveyed'
	},
	fr: {
		type: 'hint',
		code: 'bicycle-conveyance-reservation',
		summary: 'bicycles conveyed, subject to reservation'
	},
	nf: {
		type: 'hint',
		code: 'no-bicycle-conveyance',
		summary: 'bicycles not conveyed'
	},
	k2: {
		type: 'hint',
		code: '2nd-class-only',
		summary: '2. class only'
	},
	eh: {
		type: 'hint',
		code: 'boarding-ramp',
		summary: 'vehicle-mounted boarding ramp available'
	},
	wv: {
		type: 'hint',
		code: 'wifi',
		summary: 'WiFi available'
	},
	wi: {
		type: 'hint',
		code: 'wifi',
		summary: 'WiFi available'
	},
	sn: {
		type: 'hint',
		code: 'snacks',
		summary: 'snacks available for purchase'
	},
	mb: {
		type: 'hint',
		code: 'snacks',
		summary: 'snacks available for purchase'
	},
	mp: {
		type: 'hint',
		code: 'snacks',
		summary: 'snacks available for purchase at the seat'
	},
	bf: {
		type: 'hint',
		code: 'barrier-free',
		summary: 'barrier-free'
	},
	rg: {
		type: 'hint',
		code: 'barrier-free-vehicle',
		summary: 'barrier-free vehicle'
	},
	bt: {
		type: 'hint',
		code: 'on-board-bistro',
		summary: 'Bordbistro available'
	},
	br: {
		type: 'hint',
		code: 'on-board-restaurant',
		summary: 'Bordrestaurant available'
	},
	ki: {
		type: 'hint',
		code: 'childrens-area',
		summary: `children's area available`
	},
	kr: {
		type: 'hint',
		code: 'kids-service',
		summary: 'DB Kids Service available'
	},
	ls: {
		type: 'hint',
		code: 'power-sockets',
		summary: 'power sockets available'
	},
	ev: {
		type: 'hint',
		code: 'replacement-service',
		summary: 'replacement service'
	},
	kl: {
		type: 'hint',
		code: 'air-conditioned',
		summary: 'air-conditioned vehicle'
	},
	r0: {
		type: 'hint',
		code: 'upward-escalator',
		summary: 'upward escalator'
	},
	au: {
		type: 'hint',
		code: 'elevator',
		summary: 'elevator available'
	},
	ck: {
		type: 'hint',
		code: 'komfort-checkin',
		summary: 'Komfort-Checkin available'
	},
	it: {
		type: 'hint',
		code: 'ice-sprinter',
		summary: 'ICE Sprinter service'
	},
	rp: {
		type: 'hint',
		code: 'compulsory-reservation',
		summary: 'compulsory seat reservation'
	},
	sk: {
		type: 'hint',
		code: 'oversize-luggage-forbidden',
		summary: 'oversize luggage not allowed'
	},
	hu: {
		type: 'hint',
		code: 'animals-forbidden',
		summary: 'animals not allowed, except guide dogs'
	},
	ik: {
		type: 'hint',
		code: 'baby-cot-required',
		summary: 'baby cot/child seat required'
	},
	ee: {
		type: 'hint',
		code: 'on-board-entertainment',
		summary: 'on-board entertainment available'
	},
	toilet: {
		type: 'hint',
		code: 'toilet',
		summary: 'toilet available'
	},
	iz: {
		type: 'hint',
		code: 'intercity-2',
		summary: 'Intercity 2'
	}
})

const codesByIcon = Object.assign(Object.create(null), {
	cancel: 'cancelled'
})

// todo: is passing in profile necessary?
const parseHint = (profile, h, icons) => {
	// todo: C

	const text = h.txtN && h.txtN.trim() || ''
	const icon = 'number' === typeof h.icoX && icons[h.icoX] || null
	const code = h.code || (icon && icon.res && codesByIcon[icon.res]) || null

	if (h.type === 'M') {
		return {
			type: 'status',
			summary: h.txtS && h.txtS.trim() || '',
			code,
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
	if (h.type === 'G' && text.toLowerCase() === 'platform change') {
		return {
			type: 'status',
			code: 'changed platform',
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
	if (h.type === 'A') {
		const hint = hints[h.code && h.code.trim().toLowerCase()]
		if (hint) {
			return Object.assign({text: h.txtN}, hint)
		}
		return null
	}

	if (h.type === 'D' || h.type === 'U' || h.type === 'R' || h.type === 'N') {
		// todo: how can we identify the individual types?
		return {
			type: 'status',
			code,
			text
		}
	}
	return null
}

module.exports = parseHint
