const testDepartures = async (cfg) => {
	const {test: t, res, validate} = cfg;
	const ids = cfg.ids || (cfg.id
		? [cfg.id]
		: []);
	const {departures: deps} = res;

	validate(t, res, 'departuresResponse', 'res');

	for (let i = 0; i < deps.length; i++) {
		let stop = deps[i].stop;
		let name = `res.departures[${i}].stop`;
		if (stop.station) {
			stop = stop.station;
			name += '.station';
		}

		t.ok(
			ids.includes(stop.id)
			|| stop.station && ids.includes(stop.station.id),
			`${name}.id is invalid (${stop.id}), must be one of ${ids.join('/')}`,
		);
	}

	// todo: move into deps validator
	t.same(deps, deps.sort((a, b) => t.when > b.when), 'res.departures must be sorted by .when');
};

export {
	testDepartures,
};
