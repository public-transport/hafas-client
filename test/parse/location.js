'use strict'

const test = require('tape')
const omit = require('lodash/omit')
const parse = require('../../parse/location')

const profile = {
	parseStationName: (_, name) => name.toLowerCase(),
	parseProductsBitmask: (_, bitmask) => [bitmask]
}

const ctx = {
	data: {},
	opt: {
		linesOfStops: false
	},
	profile
}

test('parses an address correctly', (t) => {
	const input = {
		type: 'A',
		name: 'Foo street 3',
		lid: 'a=b@L=some%20id',
		crd: {x: 13418027, y: 52515503}
	}

	const address = parse(ctx, input)
	t.deepEqual(address, {
		type: 'location',
		id: 'some id',
		address: 'Foo street 3',
		latitude: 52.515503,
		longitude: 13.418027
	})

	t.end()
})

test('parses a POI correctly', (t) => {
	const input = {
		type: 'P',
		name: 'some POI',
		lid: 'a=b@L=some%20id',
		crd: {x: 13418027, y: 52515503}
	}

	const poi = parse(ctx, input)
	t.deepEqual(poi, {
		type: 'location',
		poi: true,
		id: 'some id',
		name: 'some POI',
		latitude: 52.515503,
		longitude: 13.418027
	})

	const withExtId = parse(ctx, {...input, extId: 'some ext id'})
	t.equal(withExtId.id, 'some ext id')

	const withLeadingZero = parse(ctx, {...input, extId: '00some ext id'})
	t.equal(withLeadingZero.id, 'some ext id')

	t.end()
})

test('parses a stop correctly', (t) => {
	const input = {
		type: 'S',
		name: 'Foo bus stop',
		lid: 'a=b@L=foo%20stop',
		crd: {x: 13418027, y: 52515503},
		pCls: 123
	}

	const stop = parse(ctx, input)
	t.deepEqual(stop, {
		type: 'stop',
		id: 'foo stop',
		name: 'foo bus stop', // lower-cased!
		location: {
			type: 'location',
			id: 'foo stop',
			latitude: 52.515503,
			longitude: 13.418027
		},
		products: [123]
	})

	const withoutLoc = parse(ctx, omit(input, ['crd']))
	t.equal(withoutLoc.location, null)

	const mainMast = parse(ctx, {...input, isMainMast: true})
	t.equal(mainMast.type, 'station')

	const meta = parse(ctx, {...input, meta: 1})
	t.equal(meta.isMeta, true)

	const lineA = {id: 'a'}
	const withLines = parse({
		...ctx,
		opt: {...ctx.opt, linesOfStops: true}
	}, {
		...input, lines: [lineA]
	})
	t.deepEqual(withLines.lines, [lineA])

	t.end()
})
