'use strict';

const objectScan = require('object-scan');

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
