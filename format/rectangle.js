const formatRectangle = (profile, north, west, south, east) => {
	return {
		llCrd: {
			x: profile.formatCoord(west),
			y: profile.formatCoord(south)
		},
		urCrd: {
			x: profile.formatCoord(east),
			y: profile.formatCoord(north)
		}
	}
}

export {
	formatRectangle,
}
