import {findRemarks} from './find-remarks.js'

// todo: c.conSubscr (e.g. `F`, `U`) – is this journey subscribed to?
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
// todo: https://gist.github.com/derhuerst/ca801d0d93bc4ff8276f9c760b3240b4#file-subscription-journey-js-L3295-L3363
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

	const msgL = (
		(Array.isArray(j.msgL) && j.msgL)
		|| (Array.isArray(j.messageList) && j.messageList)
		|| null
	)
	if (opt.remarks && msgL) {
		res.remarks = findRemarks(ctx, msgL).map(([remark]) => remark)
	}

	if (opt.scheduledDays && j.sDays) {
		// todo [breaking]: rename to scheduledDates
		res.scheduledDays = profile.parseScheduledDays(ctx, j.sDays)
	}

	return res
}

export {
	parseJourney,
}
