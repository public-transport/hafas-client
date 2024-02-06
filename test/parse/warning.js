import tap from 'tap';
import {parseWarning as parse} from '../../parse/warning.js';
import merge from 'lodash/merge.js';

const profile = {
	parseProductsBitmask: (_, bitmask) => [bitmask],
	parseDateTime: (_, date, time) => date + ':' + time,
};
const ctx = {
	data: {},
	opt: {},
	profile,
};

tap.test('parses warnings correctly', (t) => {
	const input = {
		hid: 'some warning ID', // todo: null
		head: 'some<br>summary', // todo: null
		text: 'some long<br>text<br><br />body', // todo: null
		icon: {type: 'HimWarn'}, // todo: null
		prio: 123,
		cat: 1,
	};
	const expected = {
		id: 'some warning ID',
		type: 'status',
		summary: 'some\nsummary',
		text: 'some long\ntext\n\nbody',
		icon: {type: 'HimWarn'},
		priority: 123,
		category: 1,
	};

	t.same(parse(ctx, input), expected);

	// without basic fields
	t.same(parse(ctx, {...input, hid: null}), {...expected, id: null});
	t.same(parse(ctx, {...input, head: null}), {...expected, summary: null});
	t.same(parse(ctx, {...input, text: null}), {...expected, text: null});
	t.same(parse(ctx, {...input, cat: null}), {...expected, category: null});

	// without icon
	t.same(parse(ctx, {...input, icon: null}), {
		...expected, type: 'warning', icon: null,
	});

	// with products
	t.same(parse(ctx, {...input, prod: 123}), {
		...expected, products: [123],
	});

	// validFrom, validUntil, modified
	t.same(parse(ctx, {
		...input,
		sDate: '20190101', sTime: '094020',
		eDate: '20190101', eTime: '114020',
		lModDate: '20190101', lModTime: '084020',
	}), {
		...expected,
		validFrom: '20190101:094020',
		validUntil: '20190101:114020',
		modified: '20190101:084020',
	});

	// events
	const ctxWithHimMsgEventL = {
		...ctx,
		res: {
			common: {
				himMsgEventL: [{
					fDate: '20211111', fTime: '123456',
					tDate: '20211221', tTime: '012345',
				}],
			},
		},
	};
	const inputWithEventRefL = {
		...input,
		eventRefL: [0],
	};
	const expectedWithEvents = {
		...expected,
		events: [{
			fromLocation: null,
			toLocation: null,
			start: '20211111:123456',
			end: '20211221:012345',
			sections: [],
		}],
	};
	t.same(parse(
		ctxWithHimMsgEventL,
		inputWithEventRefL,
	), expectedWithEvents);
	// without res.common.himMsgEventL[].{f,t}Time
	t.same(parse(
		merge(ctxWithHimMsgEventL, {
			res: {
				common: {
					himMsgEventL: [{
						fTime: null,
						tTime: null,
					}],
				},
			},
		}),
		inputWithEventRefL,
	), merge(expectedWithEvents, {
		events: [{
			start: '20211111:000000',
			end: '20211221:000000',
		}],
	}));

	// todo: .edges

	t.end();
});
