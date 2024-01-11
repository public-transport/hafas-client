import isRoughlyEqual from 'is-roughly-equal'

const testJourneysStationToPoi = async (cfg) => {
	const {test: t, res, validate} = cfg
	const fromIds = cfg.fromIds || (cfg.fromId ? [cfg.fromId] : [])
	const {id, name, latitude, longitude} = cfg.to

	validate(t, res, 'journeysResult', 'res')
	const {journeys} = res

	t.ok(journeys.length >= 3, 'journeys must have >=3 items')
	for (let i = 0; i < journeys.length; i++) {
		const j = journeys[i]

		let o = j.legs[0].origin
		const oN = `res.journeys[0].legs[0].destination`
		t.ok(
			fromIds.includes(o.id) ||
			(o.station && fromIds.includes(o.station.id)),
			`invalid ${oN}.legs[0].origin`
		)

		let d = j.legs[j.legs.length - 1].destination
		let dN = `res.journeys[${i}].legs[${j.legs.length - 1}].destination`
		if (d.station) {
			d = d.station
			dN += '.station'
		}

		t.equal(d.type, 'location', dN + '.type is invalid')
		// t.equal(d.id, id, dN + '.id is invalid')
		t.equal(d.name, name, dN + '.name is invalid')
		t.ok(isRoughlyEqual(.0001, d.latitude, latitude), dN + '.latitude is invalid')
		t.ok(isRoughlyEqual(.0001, d.longitude, longitude), dN + '.longitude is invalid')
	}
}

export {
	testJourneysStationToPoi,
}
