'use strict'

const testDeparturesWithoutUnrelatedStations = async (cfg) => {
	const {
		test: t,
		fetchDepartures,
		id,
		when
		// duration, products
	} = cfg

	const relatedLines = cfg.linesOfRelatedStations
	.map(lName => lName.toLowerCase().trim())

	const isUnrelatedLine = (dep) => {
		if (!dep.line || !dep.line.name) return false
		return relatedLines.includes(dep.line.name.toLowerCase().trim())
	}

	const depsWith = await fetchDepartures(id, {
		when,
		duration: cfg.duration || 20,
		products: cfg.products || {}
	})
	t.ok(depsWith.some(isUnrelatedLine), 'precondition failed: no line at related station found')

	const depsWithout = await fetchDepartures(id, {
		includeRelatedStations: false,
		when,
		duration: cfg.duration || 20,
		products: cfg.products || {}
	})

	const unrelatedDep = depsWithout.find(isUnrelatedLine)
	if (unrelatedDep) t.fail('line at related station: ' + unrelatedDep.line.name)
	else t.pass('no lines from related stations')
}

module.exports = testDeparturesWithoutUnrelatedStations
