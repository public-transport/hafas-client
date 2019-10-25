'use strict'

const parsePlatform = ({parsed}, platfS, platfR, cncl = false) => {
	let planned = platfS || null
	let prognosed = platfR || null

	if (cncl) {
		return {
			...parsed,
			platform: null,
			plannedPlatform: planned,
			prognosedPlatform: prognosed
		}
	}
	return {
		...parsed,
		platform: prognosed,
		plannedPlatform: planned
	}
}

module.exports = parsePlatform
