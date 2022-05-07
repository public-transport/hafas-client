const testJourneysStationToStation = async (cfg) => {
	const {test: t, res, validate} = cfg
	const fromIds = cfg.fromIds || (cfg.fromId ? [cfg.fromId] : [])
	const toIds = cfg.toIds || (cfg.toId ? [cfg.toId] : [])

	validate(t, res, 'journeysResult', 'res')
	const {journeys} = res

	t.ok(journeys.length >= 4, 'journeys must have >=4 items')
	for (let i = 0; i < journeys.length; i++) {
		const j = journeys[i]
		const n = `res.journeys[${i}]`

		const o = j.legs[0].origin
		const d = j.legs[j.legs.length - 1].destination
		t.ok(
			fromIds.includes(o.id) ||
			(o.station && fromIds.includes(o.station.id)),
			`invalid ${n}.legs[0].origin`
		)
		t.ok(
			toIds.includes(d.id) ||
			(d.station && toIds.includes(d.station.id)),
			`invalid ${n}.legs[${j.legs.length - 1}].destination`
		)
	}
}

export {
	testJourneysStationToStation,
}
