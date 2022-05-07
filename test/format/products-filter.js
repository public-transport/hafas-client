import tap from 'tap'
import {formatProductsFilter as format} from '../../format/products-filter.js'

const products = [
	{
		id: 'train',
		bitmasks: [1, 2],
		default: true
	},
	{
		id: 'bus',
		bitmasks: [4],
		default: true
	},
	{
		id: 'tram',
		bitmasks: [8, 32],
		default: false
	},
]

const ctx = {
	common: {},
	opt: {},
	profile: {products}
}

tap.test('formatProductsFilter works without customisations', (t) => {
	const expected = 1 | 2 | 4
	const filter = {}
	t.same(format(ctx, filter), {
		type: 'PROD',
		mode: 'INC',
		value: expected + ''
	})
	t.end()
})

tap.test('formatProductsFilter works with customisations', (t) => {
	t.equal(+format(ctx, {
		bus: true
	}).value, 1 | 2 | 4)
	t.equal(+format(ctx, {
		bus: false
	}).value, 1 | 2)
	t.equal(+format(ctx, {
		tram: true
	}).value, 1 | 2 | 4 | 8 | 32)
	t.end()
})
