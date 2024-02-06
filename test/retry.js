import tap from 'tap';

import {createClient} from '../index.js';
import {withRetrying} from '../retry.js';
import {profile as vbbProfile} from '../p/vbb/index.js';

const userAgent = 'public-transport/hafas-client:test';
const spichernstr = '900000042101';

tap.test('withRetrying works', (t) => {
	// for the first 3 calls, return different kinds of errors
	let calls = 0;
	const failingRequest = async (ctx, userAgent, reqData) => {
		calls++;
		if (calls === 1) {
			const err = new Error('HAFAS error');
			err.isHafasError = true;
			return Promise.reject(err);
		}
		if (calls === 2) {
			const err = new Error('fetch error');
			err.code = 'EFOO';
			return Promise.reject(err);
		}
		if (calls < 4) {
			return Promise.reject(new Error('generic error'));
		}
		return {
			res: [],
			common: {},
		};
	};

	const profile = withRetrying({
		...vbbProfile,
		request: failingRequest,
	}, {
		retries: 3,
		minTimeout: 100,
		factor: 2,
		randomize: false,
	});
	const client = createClient(profile, userAgent);

	t.plan(2 + 4);
	client.departures(spichernstr, {duration: 1})
		.then((res) => {
			const {
				departures: deps,
				realtimeDataUpdatedAt,
			} = res;
			t.same(deps, [], 'resolved with invalid value');
			t.equal(realtimeDataUpdatedAt, null, 'resolved with invalid value');
		})
		.catch(t.ifError);

	setTimeout(() => t.equal(calls, 1), 50); // buffer
	setTimeout(() => t.equal(calls, 2), 200); // 100 + buffer
	setTimeout(() => t.equal(calls, 3), 450); // 100 + 200 + buffer
	setTimeout(() => t.equal(calls, 4), 900); // 100 + 200 + 400 + buffer
});
