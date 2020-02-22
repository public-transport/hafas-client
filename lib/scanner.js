'use strict';

const objectScan = require('object-scan');

// Traverses object and returns object containing all matches of form:
// { [needle]: [match, ...] } where match is [value, parents]
// Refer to object-scan for needle syntax

module.exports = (haystack, needles) => {
	const result = Object.create(null);
	needles.forEach((needle) => {
		result[needle] = [];
	});
	objectScan(needles, {
		filterFn: (key, value, { parents, matchedBy }) => {
			matchedBy.forEach((needle) => {
				result[needle].push([value, parents]);
			});
		}
	})(haystack);
	return result;
};
