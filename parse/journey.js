'use strict'

const {DateTime} = require('luxon')
const findRemarks = require('./find-remarks')

// todo: DRY with parse/date-time.js
const parseDate = (date) => {
	const res = {
		year: parseInt(date.substr(-8, 4)),
		month: parseInt(date.substr(-4, 2)),
		day: parseInt(date.substr(-2, 2)),
	}
	if (!Number.isInteger(res.year) || !Number.isInteger(res.month) || !Number.isInteger(res.day)) {
		throw new Error('invalid date format: ' + date)
	}
	return res
}

const parseScheduledDays = (sDaysB, fpB, fpE, profile) => {
	sDaysB = Buffer.from(sDaysB, 'hex')
	const res = Object.create(null)

	const _fpB = parseDate(fpB)
	let d = DateTime.fromObject({
		zone: profile.timezone, locale: profile.locale,
		year: _fpB.year, month: _fpB.month, day: _fpB.day,
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

// todo: c.conSubscr (e.g. `F`)
// todo: c.trfRes x vbb-parse-ticket
// todo: c.sotRating, c.isSotCon, c.sotCtxt
// todo: c.showARSLink
// todo: c.useableTime
// todo: c.cksum (e.g. `b3a94228_3`), c.cksumDti (e.g. `c2717eb3_3`)
// todo: c.isNotRdbl
// todo: c.badSecRefX
// todo: c.bfATS, c.bfIOSTS
// todo: c.recState (e.g. `U`)
// todo: c.intvlSubscr (e.g. `F`)

const parseJourney = (ctx, j) => { // j = raw jouney
	const {profile, opt} = ctx

	const legs = j.secL.map(l => profile.parseJourneyLeg(ctx, l, j.date))
	const res = {
		type: 'journey',
		legs,
		refreshToken: (j.recon && j.recon.ctx) || j.ctxRecon || null
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
		res.remarks = findRemarks(j.msgL).map(([remark]) => remark)
	}

	if (opt.scheduledDays) {
		// sDaysB is a bitmap mapping all days from fpB (first date of schedule) to fpE (last date in schedule).
		const {sDaysB} = j.sDays
		const {fpB, fpE} = ctx.res
		if (sDaysB && fpB && fpE) {
			res.scheduledDays = parseScheduledDays(sDaysB, fpB, fpE, profile)
		}
	}

	return res
}

module.exports = parseJourney
