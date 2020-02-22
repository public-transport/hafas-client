'use strict';

const objectScan = require('object-scan');

// Scan object and pre-compute results for provided needles (see object-scan for syntax)
// Results are accessed per needle through callback function 'onResult'

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
