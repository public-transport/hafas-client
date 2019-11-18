'use strict'

const parseWhen = (ctx, date, timeS, timeR, tzOffset, cncl = false) => {
	const {parsed, parse} = ctx

	let planned = timeS ? parse('dateTime', date, timeS, tzOffset, false) : null
	let prognosed = timeR ? parse('dateTime', date, timeR, tzOffset, false) : null
	let delay = null

	if (planned && prognosed) {
		const tPlanned = parse('dateTime', date, timeS, tzOffset, true)
		const tPrognosed = parse('dateTime', date, timeR, tzOffset, true)
		delay = Math.round((tPrognosed - tPlanned) / 1000)
	}

	if (cncl) {
		return {
			...parsed,
			when: null,
			plannedWhen: planned,
			prognosedWhen: prognosed,
			delay
		}
	}
	return {
		...parsed,
		when: prognosed,
		plannedWhen: planned,
		delay
	}
}

module.exports = parseWhen
