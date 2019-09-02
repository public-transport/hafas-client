'use strict'

const scanner = require('object-scan')
const toPath = require('lodash/toPath')
const get = require('lodash/get')

// For all items in `tree` matching a path selector specified
// in `selector`, call `onResult` with the item, its parent and
// the path to the item.
// Example:
// tree: {foo: [{bar: 1}], hey: {there: [{bar: 2}]}}
// selector: **[*].bar
const findInTree = (tree, selector, onResult) => {
	const scan = scanner([selector])
	for (const pathStr of scan(tree)) {
		const path = toPath(pathStr)
		const val = get(tree, path)
		const parent = get(tree, path.slice(0, -1), {})
		onResult(val, parent, path)
	}
}

module.exports = findInTree
