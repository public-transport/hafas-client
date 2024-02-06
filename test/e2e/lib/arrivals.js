const testArrivals = async (cfg) => {
	const {test: t, res, validate} = cfg;
	const ids = cfg.ids || (cfg.id
		? [cfg.id]
		: []);
	const {arrivals: arrs} = res;

	validate(t, res, 'arrivalsResponse', 'res');

	for (let i = 0; i < arrs.length; i++) {
		let stop = arrs[i].stop;
		let name = `res.arrivals[${i}].stop`;
		if (stop.station) {
			stop = stop.station;
			name += '.station';
		}

		t.ok(
			ids.includes(stop.id)
			|| stop.station && ids.includes(stop.station.id),
			name + '.id is invalid',
		);
	}

	// todo: move into arrivals validator
	t.same(arrs, arrs.sort((a, b) => t.when > b.when), 'res.arrivals must be sorted by .when');
};

export {
	testArrivals,
};
