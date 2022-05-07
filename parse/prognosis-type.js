const parsePrognosisType = (_, progType) => {
	return {
		'PROGNOSED': 'prognosed',
		'CALCULATED': 'calculated',
		// todo: are there more?
	}[progType] || null
}

export {
	parsePrognosisType,
}
