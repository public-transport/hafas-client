
const parseBestPrice = (ctx, outDaySeg, journeys) => {
	const {profile, res} = ctx;

	const bpjourneys = outDaySeg.conRefL
		? outDaySeg.conRefL
			.map(outConLIdx => journeys.find(j => j.refreshToken == res.outConL[outConLIdx].ctxRecon))
			.filter(j => Boolean(j))
		: [];

	const amount = outDaySeg.bestPrice.amount / 100;
	const currency = bpjourneys?.[0]?.price?.currency;

	const result = {
		journeys: bpjourneys,
		from: profile.parseDateTime(ctx, outDaySeg.fromDate, outDaySeg.fromTime),
		to: profile.parseDateTime(ctx, outDaySeg.toDate, outDaySeg.toTime),
		bestPrice: amount > 0 && currency ? {amount, currency} : null,
	};

	return result;
};

export {
	parseBestPrice,
};
