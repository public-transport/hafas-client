import {DateTime} from 'luxon'
import {findRemarks} from './find-remarks.js'

const parseScheduledDays = (sDaysB, year, profile) => {
	sDaysB = Buffer.from(sDaysB, 'hex')
	const res = Object.create(null)

	let d = DateTime.fromObject({
		year, // Expected to be in the correct tz offset!
		month: 1, day: 1,
		hour: 0, minute: 0, second: 0, millisecond: 0
	}, {
		zone: profile.timezone,
		locale: profile.locale,
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
		const year = parseInt(j.date.slice(0, 4))
		res.scheduledDays = parseScheduledDays(j.sDays.sDaysB, year, profile)
	}

	return res
}

export {
	parseJourney,
}
