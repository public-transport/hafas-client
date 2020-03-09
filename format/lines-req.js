'use strict'

const formatLinesReq = (ctx, query) => {
	return {
		meth: 'LineMatch',
		req: {
			input: query,
		}
	}
}

module.exports = formatLinesReq
