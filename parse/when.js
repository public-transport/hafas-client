'use strict'

const parseWhen = (profile, date, timeS, timeR, tzOffset, cncl = false) => {
	const parse = profile.parseDateTime

	let planned = timeS ? parse(profile, date, timeS, tzOffset, false) : null
	let prognosed = timeR ? parse(profile, date, timeR, tzOffset, false) : null
	let delay = null

	if (planned && prognosed) {
		const tPlanned = parse(profile, date, timeS, tzOffset, true)
		const tPrognosed = parse(profile, date, timeR, tzOffset, true)
		delay = Math.round((tPrognosed - tPlanned) / 1000)
	}

	if (cncl) {
		return {
			when: null,
			plannedWhen: planned,
			prognosedWhen: prognosed,
			delay
		}
	}
	return {
		when: prognosed,
		plannedWhen: planned,
		delay
	}
}

module.exports = parseWhen
