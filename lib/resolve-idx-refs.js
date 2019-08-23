'use strict'

const scanner = require('object-scan')
const toPath = require('lodash/toPath')
const get = require('lodash/get')

// For all items in `tree` matching a path selector specified
// in `selector`, call `onRef` with the item, its parent and
// the path to the item.
// Example:
// tree: {foo: [{bar: 1}], hey: {there: [{bar: 2}]}}
// selector: **[*].bar
const findIdxRefs = (tree, selector, onRef) => {
	const scan = scanner([selector])
	for (const pathStr of scan(tree)) {
		const path = toPath(pathStr)
		const val = get(tree, path)
		const parent = get(tree, path.slice(0, -1), {})
		onRef(val, parent, path)
	}
}

// For all items in `tree` matching a path selector specified
// in `selector`:
// - interpret the item as an index in `source`
// - set the parent's field `prop` to `source[item]`
const resolveIdxRefs = (tree, selector, source, prop) => {
	findIdxRefs(tree, selector, (idx, parent) => {
		if ('number' === typeof idx) parent[prop] = source[idx]
	})
}

module.exports = {
	findIdxRefs,
	resolveIdxRefs
}
