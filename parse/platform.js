'use strict'

const parsePlatform = (ctx, platfS, platfR, cncl = false) => {
	let planned = platfS || null
	let prognosed = platfR || null

	if (cncl) {
		return {
			platform: null,
			plannedPlatform: planned,
			prognosedPlatform: prognosed
		}
	}
	return {
		platform: prognosed,
		plannedPlatform: planned
	}
}

module.exports = parsePlatform
