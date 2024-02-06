import tap from 'tap';
import {parseOperator as parse} from '../../parse/operator.js';

const ctx = {
	data: {},
	opt: {},
	profile: {},
};
tap.test('parses an operator correctly', (t) => {
	const op = {
		name: 'Berliner Verkehrsbetriebe',
		icoX: 1,
		id: 'Berliner Verkehrsbetriebe',
	};

	t.same(parse(ctx, op), {
		type: 'operator',
		id: 'berliner-verkehrsbetriebe',
		name: 'Berliner Verkehrsbetriebe',
	});
	t.end();
});
