const formatLinesReq = (ctx, query) => {
	return {
		meth: 'LineMatch',
		req: {
			input: query,
		}
	}
}

export {
	formatLinesReq,
}
