import tap from 'tap';

import {createClient} from '../../index.js';
import {profile as rawProfile} from '../../p/db/index.js';
import {data as loyaltyCards} from '../../p/db/loyalty-cards.js';

const client = createClient(rawProfile, 'public-transport/hafas-client:test');
const {profile} = client;

const opt = {
	results: null,
	via: null,
	stopovers: false,
	transfers: -1,
	transferTime: 0,
	accessibility: 'none',
	bike: false,
	walkingSpeed: 'normal',
	startWithWalking: true,
	tickets: false,
	polylines: false,
	subStops: true,
	entrances: true,
	remarks: true,
	scheduledDays: false,
	departure: '2023-09-12T08:09:10+02:00',
	products: {},

	firstClass: false,
	age: 24,
	loyaltyCard: {
		type: loyaltyCards.BAHNCARD,
		discount: 25,
	},
};

const berlinWienQuery0 = Object.freeze({
	getPasslist: false,
	maxChg: -1,
	minChgTime: 0,
	depLocL: [{
		type: 'S',
		lid: 'A=1@L=8098160@',
	}],
	viaLocL: [],
	arrLocL: [{
		type: 'S',
		lid: 'A=1@L=8000284@',
	}],
	jnyFltrL: [
		{type: 'PROD', mode: 'INC', value: '1023'},
		{type: 'META', mode: 'INC', meta: 'notBarrierfree'},
	],
	gisFltrL: [],
	getTariff: false,
	ushrp: true,
	getPT: true,
	getIV: false,
	getPolyline: false,
	outDate: '20230912',
	outTime: '080910',
	outFrwd: true,
});

tap.test('formats a journeys() request correctly (DB)', (t) => {
	const ctx = {profile, opt};

	// transformJourneysQuery() mutates its 2nd argument!
	const query = {...berlinWienQuery0};
	const req = profile.transformJourneysQuery(ctx, query);

	t.same(req, {
		...berlinWienQuery0,
		trfReq: {
			jnyCl: 2,
			tvlrProf: [{
				type: 'Y', // "young"
				age: 24,
				redtnCard: 2, // BahnCard 25
			}],
			cType: 'PK',
		},
	});
	t.end();
});
