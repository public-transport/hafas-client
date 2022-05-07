import objectScan from 'object-scan'

const createFindInTree = (needles) => {
	const scanner = objectScan(needles, {
		filterFn: ({ value, parents, matchedBy, context }) => {
			matchedBy.forEach((needle) => {
				context[needle].push([value, parents])
			})
		}
	})

	return (haystack) => {
		const context = Object.create(null)
		needles.forEach((needle) => {
			context[needle] = []
		})
		return scanner(haystack, context)
	}
}

export {
	createFindInTree,
}
