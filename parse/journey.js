'use strict'

const findRemark = require('./find-remark')

const createParseJourney = (profile, opt, data) => {
	const parseLeg = profile.parseJourneyLeg(profile, opt, data)
	const {hints, warnings} = data

	// todo: c.sDays
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

		if (opt.remarks && Array.isArray(j.msgL)) {
			res.remarks = []
			for (let ref of j.msgL) {
				const remark = findRemark(hints, warnings, ref)
				if (remark) res.remarks.push(remark)
			}
		}

		return res
	}

	return parseJourney
}

module.exports = createParseJourney
