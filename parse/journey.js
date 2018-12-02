'use strict'

const {DateTime} = require('luxon')
const findRemark = require('./find-remark')

const parseScheduledDays = (sDaysB, profile) => {
	sDaysB = Buffer.from(sDaysB, 'hex')
	const res = Object.create(null)

	let d = DateTime.fromObject({
		zone: profile.timezone, locale: profile.locale,
		year: new Date().getFullYear(),
		month: 1, day: 1,
		hour: 0, minute: 0, second: 0, millisecond: 0
	})
	for (let b = 0; b < sDaysB.length; b++) {
		for (let i = 0; i < 8; i++) {
			res[d.toISODate()] = (sDaysB[b] & Math.pow(2, 7 - i)) > 0
			d = d.plus({days: 1})
		}
	}
	return res
}

const createParseJourney = (profile, opt, data) => {
	const parseLeg = profile.parseJourneyLeg(profile, opt, data)
	const {hints, warnings} = data

	// todo: c.conSubscr
	// todo: c.trfRes x vbb-parse-ticket
	// todo: c.sotRating, c.isSotCon, c.sotCtxt
	// todo: c.showARSLink
	// todo: c.useableTime
	// todo: c.cksum
	// todo: c.isNotRdbl
	// todo: c.badSecRefX
	// todo: c.bfATS, c.bfIOSTS
	const parseJourney = (j) => {
		const legs = j.secL.map(leg => parseLeg(j, leg))
		const res = {
			type: 'journey',
			legs,
			refreshToken: j.ctxRecon || null
		}

		const freq = j.freq || {}
		if (freq.minC || freq.maxC) {
			res.cycle = {}
			if (freq.minC) res.cycle.min = freq.minC * 60
			if (freq.maxC) res.cycle.max = freq.maxC * 60
			// nr of connections in this frequency, from now on
			if (freq.numC) res.cycle.nr = freq.numC
		}

		if (opt.remarks && Array.isArray(j.msgL)) {
			res.remarks = []
			for (let ref of j.msgL) {
				const remark = findRemark(hints, warnings, ref)
				if (remark) res.remarks.push(remark)
			}
		}

		if (opt.scheduledDays) {
			res.scheduledDays = parseScheduledDays(j.sDays.sDaysB, profile)
		}

		return res
	}

	return parseJourney
}

module.exports = createParseJourney
