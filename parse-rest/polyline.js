// todo:
// parameter: polyEnc (optional)
// possible values: DLT, GPA, N N
// Defines encoding of the returned polyline. Possible values are N (no encoding / compression), DLT (delta to the previous coordinate), GPA (Google encoded polyline format) defaults to N. Not all option might be available in your installation.

const parsePolyline = (ctx, p) => {
	const coordinates = []
	for (let i = 0; i < p.crd.length; i += 2) {
		coordinates.push({
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'Point',
				coordinates: [p.crd[i], p.crd[i + 1]]
			}
		})
	}

	return {
		type: 'FeatureCollection',
		features: coordinates
	}
}

export {
	parsePolyline,
}
