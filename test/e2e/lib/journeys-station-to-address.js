import isRoughlyEqual from 'is-roughly-equal';

const testJourneysStationToAddress = async (cfg) => {
	const {test: t, res, validate, fromId} = cfg;
	const {address, latitude, longitude} = cfg.to;

	validate(t, res, 'journeysResult', 'res');
	const {journeys} = res;

	t.ok(journeys.length >= 3, 'journeys must have >=3 items');
	for (let i = 0; i < journeys.length; i++) {
		const j = journeys[i];

		const firstLeg = j.legs[0];
		const orig = firstLeg.origin.station || firstLeg.origin;
		t.ok(orig.id, fromId);

		const d = j.legs[j.legs.length - 1].destination;
		const n = `res.journeys[0].legs[${i}].destination`;

		t.equal(d.type, 'location', n + '.type is invalid');
		t.equal(d.address, address, n + '.address is invalid');
		t.ok(isRoughlyEqual(0.0001, d.latitude, latitude), n + '.latitude is invalid');
		t.ok(isRoughlyEqual(0.0001, d.longitude, longitude), n + '.longitude is invalid');
	}
};

export {
	testJourneysStationToAddress,
};
