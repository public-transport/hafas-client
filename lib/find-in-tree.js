'use strict';

const scanner = require('object-scan');

const findInTree = (haystack, needles) => {
	const result = Object.create(null);
	needles.forEach((needle) => {
		result[needle] = [];
	});
	scanner(needles, {
		filterFn: (key, value, { parents, matchedBy }) => {
			matchedBy.forEach((needle) => {
				result[needle].push([value, parents]);
			});
		}
	})(haystack);
	return result;
};

module.exports = findInTree;
