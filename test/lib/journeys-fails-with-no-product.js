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

	const productsObj = Object.create(null)
	for (let p of products) productsObj[p.id] = false

	t.throws(() => {
		client.journeys(fromId, toId, {departure: when, products})
		// silence rejections, we're only interested in exceptions
		.catch(() => {})
	})
}

module.exports = journeysFailsWithNoProduct
