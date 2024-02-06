import tap from 'tap';
import {parseDateTime as parse} from '../../parse/date-time.js';

const ctx = {
	common: {},
	opt: {},
	profile: {
		timezone: 'Europe/Berlin',
		locale: 'de-DE',
	},
};

tap.test('date & time parsing returns a timestamp', (t) => {
	const iso = parse(ctx, '20190819', '203000', undefined, false);
	const ts = parse(ctx, '20190819', '203000', undefined, true);
	t.equal(ts, Number(new Date(iso)));
	t.equal(ts, 1566239400 * 1000);
	t.end();
});

tap.test('date & time parsing uses tzOffset', (t) => {
	const iso = parse(ctx, '20190819', '203000', -120, false);
	t.equal(iso, '2019-08-19T20:30:00-02:00');
	t.end();
});

tap.test('date & time parsing works with day "overflow"', (t) => {
	const iso = parse(ctx, '20190819', '02203000', undefined, false);
	t.equal(iso, '2019-08-21T20:30:00+02:00');
	t.end();
});

// #106
tap.test('date & time parsing works with day "overflow" & tzOffset', (t) => {
	const iso = parse(ctx, '20190819', '02203000', -120, false);
	t.equal(iso, '2019-08-21T20:30:00-02:00');
	t.end();
});

tap.test('date & time parsing works with summer & winter time', (t) => {
	const iso = parse(ctx, '20190219', '203000', undefined, false);
	t.equal(iso, '2019-02-19T20:30:00+01:00');
	t.end();
});

tap.test('date & time parsing uses profile.timezone', (t) => {
	const iso = parse({
		...ctx,
		profile: {...ctx.profile, timezone: 'Europe/Moscow'},
	}, '20190819', '203000', undefined, false);
	t.equal(iso, '2019-08-19T20:30:00+03:00');
	t.end();
});
