'use strict'

const findRemark = require('./find-remark')

const createParseJourney = (profile, stations, lines, hints, warnings, polylines) => {
	const parseLeg = profile.parseJourneyLeg(profile, stations, lines, hints, warnings, polylines)

	// todo: c.sDays
	// todo: c.conSubscr
	// todo: c.trfRes x vbb-parse-ticket
	const parseJourney = (j) => {
		const legs = j.secL.map(leg => parseLeg(j, leg))
		const res = {
			type: 'journey',
			legs
		}

		if (Array.isArray(j.msgL)) {
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
