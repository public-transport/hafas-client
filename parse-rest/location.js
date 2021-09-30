import {parse} from 'qs'

const leadingZeros = /^0+/

const parseNr = nr => parseFloat(nr.slice(0, 2) + '.' + nr.slice(2))

const parseLocation = (ctx, l) => {
	const {profile, opt} = ctx

	const id = parse(l.id, {delimiter: '@'})
	const latitude = 'number' === typeof l.lat ?
		l.lat :
		(id.Y ? parseNr(id.Y) : null)
	const longitude = 'number' === typeof l.lon ?
		l.lon :
		(id.X ? parseNr(id.X) : null)

	const res = {
		type: 'location',
		id: (l.extId || id.L || id.b || '').replace(leadingZeros, '') || null,
		latitude, longitude
	}

	// todo: l.notes https://github.com/public-transport/hafas-client/issues/130

	if (l.type === 'S' || l.type === 'ST' || id.A === '1') {
		// todo: l.altId, l.mainMastAltId

		const stop = {
			type: 'stop',
			id: res.id,
			name: l.name || id.O ? profile.parseStationName(ctx, l.name || id.O) : null,
			location: 'number' === typeof res.latitude ? res : null
		}

		if ('products' in l) stop.products = profile.parseProductsBitmask(ctx, l.products)

		if (opt.linesOfStops && Array.isArray(l.productAtStop)) {
			stop.lines = l.productAtStop.map(p => profile.parseLine(ctx, {
				...p, prodCtx: {...p, ...p.prodCtx}
			}))
		}

		if (l.hasMainMast) {
			stop.station = parseLocation(ctx, {
				type: 'ST',
				id: l.mainMastId,
				extId: l.mainMastExtId
			})
			stop.station.type = 'station'
		} else {
			stop.type = 'station'
		}

		return stop
	}

	if (l.type === 'A' || l.type === 'ADR') res.address = l.name
	else res.name = l.name
	if (l.type === 'P') res.poi = true

	return res
}

const parseLocationsResult = (ctx, l) => {
	const {profile} = ctx
	if (l.StopLocation) {
		return profile.parseLocation(ctx, {
			type: 'ST', ...l.StopLocation,
		})
	}
	if (l.CoordLocation) {
		return profile.parseLocation(ctx, {
			type: 'ADR', ...l.CoordLocation,
		})
	}
	return null
}

export {
	parseLocation,
	parseLocationsResult,
}
