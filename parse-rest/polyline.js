'use strict'

const createParsePolyline = (profile, opt, _) => {
	const parsePolyline = (p) => {
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
	return parsePolyline
}

module.exports = createParsePolyline
