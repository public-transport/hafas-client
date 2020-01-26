'use strict'

const scanner = require('object-scan')

// For all items in `tree` matching a path selector specified
// in `selector`, call `onResult` with the item, its parent and
// the path to the item.
// Example:
// tree: {foo: [{bar: 1}], hey: {there: [{bar: 2}]}}
// selector: **[*].bar
const findInTree = (tree, selector, onResult) => {
	scanner([selector], {
		joined: false,
		filterFn: (key, value, { parents }) => {
			onResult(value, parents[0], key);
		}
	})(tree);
}

module.exports = findInTree
