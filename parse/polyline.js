'use strict'

const {toGeoJSON} = require('@mapbox/polyline')
const distance = require('gps-distance')

const createParsePolyline = (profile, opt, {locations}) => {
	// todo: what is p.delta?
	// todo: what is p.type?
	// todo: what is p.crdEncS?
	// todo: what is p.crdEncF?
	const parsePolyline = (p) => {
		const shape = toGeoJSON(p.crdEncYX)
		if (shape.coordinates.length === 0) return null

		const res = shape.coordinates.map(crd => ({
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'Point',
				coordinates: crd
			}
		}))

		if (Array.isArray(p.ppLocRefL)) {
			for (let ref of p.ppLocRefL) {
				const p = res[ref.ppIdx]
				const loc = locations[ref.locX]
				if (p && loc) p.properties = loc
			}

			// Often there is one more point right next to each point at a station.
			// We filter them here if they are < 5m from each other.
			for (let i = 1; i < res.length; i++) {
				const p1 = res[i - 1].geometry.coordinates
				const p2 = res[i].geometry.coordinates
				const d = distance(p1[1], p1[0], p2[1], p2[0])
				if (d >= .005) continue
				const l1 = Object.keys(res[i - 1].properties).length
				const l2 = Object.keys(res[i].properties).length
				if (l1 === 0 && l2 > 0) res.splice(i - 1, 1)
				else if (l2 === 0 && l1 > 0) res.splice(i, 1)
			}
		}

		return {
			type: 'FeatureCollection',
			features: res
		}
	}
	return parsePolyline
}

module.exports = createParsePolyline
