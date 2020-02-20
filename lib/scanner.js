'use strict';

const assert = require('assert');
const objectScan = require('object-scan');

// Scan object and pre-compute results for provided needles (see object-scan for syntax)
// Results are accessed per needle through callback function 'onResult'

module.exports = (haystack, needles) => {
	const precomputed = needles.reduce((p, c) => Object.assign(p, { [c]: [] }), {});
	objectScan(needles, {
		filterFn: (key, value, { parents, matchedBy }) => {
			matchedBy.forEach((needle) => {
				precomputed[needle].push([value, parents]);
			});
		}
	})(haystack);
	return (needle, onResult) => {
		assert(precomputed[needle] !== undefined, `Needle "${needle}" needs to be precomputed`);
		precomputed[needle].forEach((args) => onResult(...args))
	};
};
