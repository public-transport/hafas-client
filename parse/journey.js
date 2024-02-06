import {findRemarks} from './find-remarks.js';

// todo: c.conSubscr (e.g. `F`)
// todo: c.trfRes x vbb-parse-ticket
// todo: c.sotRating, c.isSotCon, c.sotCtxt
// todo: c.showARSLink
// todo: c.useableTime
// todo: c.cksum (e.g. `b3a94228_3`), c.cksumDti (e.g. `c2717eb3_3`)
// todo: c.isNotRdbl
// todo: c.badSecRefX
// todo: c.bfATS, c.bfIOSTS
// todo: c.recState (e.g. `U`)
// todo: c.intvlSubscr (e.g. `F`)

const parseJourney = (ctx, j) => { // j = raw jouney
	const {profile, opt} = ctx;

	const legs = [];
	for (const l of j.secL) {
		let date = j.date;
		// Next-day DEVI legs in an overnight journey lack both
		// - the "01" prefix in {dep.d,arr.a}Time{S,R} and
		// - the jny.trainStartDate field.
		// However, we can use the previous leg's effective date.
		const prevLeg = legs[legs.length - 1] || null;
		if (l.type === 'DEVI' && prevLeg?.arrival) {
			// todo: parse effective date from jny.ctxRecon/gis.ctx instead?
			// todo: prefer plannedArrival?
			date = [
				prevLeg.arrival.slice(0, 4), // year
				prevLeg.arrival.slice(5, 7), // month
				prevLeg.arrival.slice(8, 10), // day
			].join('');
		}

		const leg = profile.parseJourneyLeg(ctx, l, date);
		legs.push(leg);
	}

	const res = {
		type: 'journey',
		legs,
		refreshToken: j.recon && j.recon.ctx || j.ctxRecon || null,
	};

	const freq = j.freq || {};
	if (freq.minC || freq.maxC) {
		res.cycle = {};
		if (freq.minC) {
			res.cycle.min = freq.minC * 60;
		}
		if (freq.maxC) {
			res.cycle.max = freq.maxC * 60;
		}
		// nr of connections in this frequency, from now on
		if (freq.numC) {
			res.cycle.nr = freq.numC;
		}
	}

	if (opt.remarks && Array.isArray(j.msgL)) {
		res.remarks = findRemarks(j.msgL)
			.map(([remark]) => remark);
	}

	if (opt.scheduledDays && j.sDays) {
		// todo [breaking]: rename to scheduledDates
		res.scheduledDays = profile.parseScheduledDays(ctx, j.sDays);
	}

	return res;
};

export {
	parseJourney,
};
