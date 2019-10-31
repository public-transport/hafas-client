'use strict'

const formatStopReq = (ctx, stopRef) => {
	return {
		meth: 'LocDetails',
		req: {
			locL: [stopRef]
		}
	}
}

module.exports = formatStopReq
