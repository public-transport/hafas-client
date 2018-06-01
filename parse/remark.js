'use strict'

const hints = Object.assign(Object.create(null), {
	fb: {
		type: 'hint',
		code: 'bicycle-con',
		text: 'bicycles conveyed'
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
const parseRemark = (profile, r) => {
	// todo: U "stop cancelled"?
	// todo: P "journey cancelled", `r.sIdx`?
	// todo: C
	if (t.type === 'L') {
		return {
			type: 'status',
			code: 'alternative-trip',
			text: r.txtN,
			journeyId: r.jid
		}
	}
	if (t.type === 'A') return hints[r.code && r.code.trim()] || null
	if (t.type === 'R') {
		// todo: how can we identify the individual types?
		return {
			type: 'status',
			code: r.code,
			text: r.txtN || ''
		}
	}
	return null
}

module.exports = parseRemark
