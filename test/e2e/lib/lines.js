const testLines = async (cfg) => {
	const {
		test: t,
		fetchLines,
		validate,
		query,
	} = cfg;

	const res = await fetchLines(query);
	const {
		lines,
		realtimeDataUpdatedAt,
	} = res;

	for (let i = 0; i < res.lines.length; i++) {
		const l = res.lines[i];
		const name = `res.lines[${i}]`;
		validate(t, l, 'line', name);
	}

	validate(t, realtimeDataUpdatedAt, 'realtimeDataUpdatedAt', 'res.realtimeDataUpdatedAt');
};

export {
	testLines,
};
