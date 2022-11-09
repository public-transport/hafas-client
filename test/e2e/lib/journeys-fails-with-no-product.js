const journeysFailsWithNoProduct = async (cfg) => {
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

	await t.rejects(async () => {
		await fetchJourneys(fromId, toId, {departure: when, products: noProducts})
	})
}

export {
	journeysFailsWithNoProduct,
}
