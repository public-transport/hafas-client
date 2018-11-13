'use strict'

const journeysFailsWithNoProduct = (cfg) => {
	const {
		test: t,
		fetchJourneys,
		fromId,
		toId,
		when,
		products
	} = cfg

	const noProducts = Object.create(null)
	for (let p of products) noProducts[p.id] = false

	t.throws(() => {
		fetchJourneys(fromId, toId, {departure: when, products: noProducts})
		// silence rejections, we're only interested in exceptions
		.catch(() => {})
	}, 'no products used')
}

module.exports = journeysFailsWithNoProduct
