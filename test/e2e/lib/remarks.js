const WEEK = 7 * 24 * 60 * 60 * 1000;

const testRemarks = async (cfg) => {
	const {
		test: t,
		fetchRemarks,
		validate,
		when,
	} = cfg;

	const res = await fetchRemarks({
		results: 10,
		from: when,
		to: new Date(when + WEEK),
	});
	const {
		remarks,
		realtimeDataUpdatedAt,
	} = res;

	for (let i = 0; i < res.remarks.length; i++) {
		const rem = res.remarks[i];
		const name = `res.remarks[${i}]`;
		validate(t, rem, 'remark', name);
	}

	// most endpoints currently don't provide this info for remarks()
	if (realtimeDataUpdatedAt !== null) {
		validate(t, realtimeDataUpdatedAt, 'realtimeDataUpdatedAt', 'res.realtimeDataUpdatedAt');
	}
};

export {
	testRemarks,
};
