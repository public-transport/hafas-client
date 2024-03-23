
const parseBestPrice = (ctx, outDaySeg, journeys) => {
	const {profile, res} = ctx;

	const bpjourneys = outDaySeg.conRefL
		? outDaySeg.conRefL
			.map(i => journeys.find(j => j.refreshToken == res.outConL[i].ctxRecon))
			.filter(j => Boolean(j))
		: [];

	const amount = outDaySeg.bestPrice.amount / 100;
	const currency = bpjourneys?.[0]?.price?.currency;

	const result = {
		journeys: bpjourneys,
		fromDate: profile.parseDateTime(ctx, outDaySeg.fromDate, outDaySeg.fromTime),
		toDate: profile.parseDateTime(ctx, outDaySeg.toDate, outDaySeg.toTime),
		bestPrice: amount > 0 && currency ? {amount, currency} : undefined,
	};

	return result;
};

export {
	parseBestPrice,
};
