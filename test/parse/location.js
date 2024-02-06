import tap from 'tap';
import omit from 'lodash/omit.js';
import {parseLocation as parse} from '../../parse/location.js';

const profile = {
	parseLocation: parse,
	parseStationName: (_, name) => name.toLowerCase(),
	parseProductsBitmask: (_, bitmask) => [bitmask],
};

const ctx = {
	data: {},
	opt: {
		linesOfStops: false,
		subStops: true,
		entrances: true,
	},
	profile,
};

tap.test('parses an address correctly', (t) => {
	const input = {
		type: 'A',
		name: 'Foo street 3',
		lid: 'a=b@L=some%20id',
		crd: {x: 13418027, y: 52515503},
	};

	const address = parse(ctx, input);
	t.same(address, {
		type: 'location',
		id: 'some id',
		address: 'Foo street 3',
		latitude: 52.515503,
		longitude: 13.418027,
	});

	t.end();
});

tap.test('parses a POI correctly', (t) => {
	const input = {
		type: 'P',
		name: 'some POI',
		lid: 'a=b@L=some%20id',
		crd: {x: 13418027, y: 52515503},
	};

	const poi = parse(ctx, input);
	t.same(poi, {
		type: 'location',
		poi: true,
		id: 'some id',
		name: 'some POI',
		latitude: 52.515503,
		longitude: 13.418027,
	});

	const withExtId = parse(ctx, {...input, extId: 'some ext id'});
	t.equal(withExtId.id, 'some ext id');

	const withLeadingZero = parse(ctx, {...input, extId: '00some ext id'});
	t.equal(withLeadingZero.id, 'some ext id');

	t.end();
});

const fooBusStop = {
	type: 'S',
	name: 'Foo bus stop',
	lid: 'a=b@L=foo%20stop',
	crd: {x: 13418027, y: 52515503},
	pCls: 123,
};

tap.test('parses a stop correctly', (t) => {
	const stop = parse(ctx, fooBusStop);
	t.same(stop, {
		type: 'stop',
		id: 'foo stop',
		name: 'foo bus stop', // lower-cased!
		location: {
			type: 'location',
			id: 'foo stop',
			latitude: 52.515503,
			longitude: 13.418027,
		},
		products: [123],
	});

	const withoutLoc = parse(ctx, omit(fooBusStop, ['crd']));
	t.equal(withoutLoc.location, null);

	const mainMast = parse(ctx, {...fooBusStop, isMainMast: true});
	t.equal(mainMast.type, 'station');

	const meta = parse(ctx, {...fooBusStop, meta: 1});
	t.equal(meta.isMeta, true);

	const lineA = {id: 'a'};
	const withLines = parse({
		...ctx,
		opt: {...ctx.opt, linesOfStops: true},
	}, {
		...fooBusStop, lines: [lineA],
	});
	t.same(withLines.lines, [lineA]);

	t.end();
});

tap.test('falls back to coordinates from `lid`', (t) => {
	const {location} = parse(ctx, {
		type: 'S',
		name: 'foo',
		lid: 'a=b@L=foo@X=12345678@Y=23456789',
	});
	t.ok(location);
	t.equal(location.latitude, 23.456789);
	t.equal(location.longitude, 12.345678);
	t.end();
});

tap.test('handles recursive references properly', (t) => {
	const southernInput = {
		type: 'S',
		name: 'Southern Platform',
		lid: 'a=b@L=southern-platform',
		crd: {x: 22222222, y: 11111111},
		// This doesn't make sense semantically, but we test if
		// `parseLocation` falls into an endless recursive loop.
		stopLocL: [1],
	};
	const northernInput = {
		type: 'S',
		name: 'Northern Platform',
		lid: 'a=b@L=northern-platform',
		crd: {x: 44444444, y: 33333333},
		// This doesn't make sense semantically, but we test if
		// `parseLocation` falls into an endless recursive loop.
		entryLocL: [0],
	};
	const common = {locL: [southernInput, northernInput]};
	const _ctx = {...ctx, res: {common}};

	const northernExpected = {
		type: 'stop',
		id: 'northern-platform',
		name: 'northern platform', // lower-cased!
		location: {
			type: 'location',
			id: 'northern-platform',
			latitude: 33.333333, longitude: 44.444444,
		},
	};
	const southernExpected = {
		type: 'station',
		id: 'southern-platform',
		name: 'southern platform', // lower-cased!
		location: {
			type: 'location',
			id: 'southern-platform',
			latitude: 11.111111, longitude: 22.222222,
		},
		stops: [northernExpected],
	};

	const {entrances} = parse(_ctx, {
		...fooBusStop,
		entryLocL: [0],
	});
	t.same(entrances, [southernExpected.location]);

	const {type, stops} = parse(_ctx, {
		...fooBusStop,
		stopLocL: [0],
	});
	t.equal(type, 'station');
	t.same(stops, [southernExpected]);

	t.end();
});
