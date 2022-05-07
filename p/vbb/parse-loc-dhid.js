const dhidPrefix = 'A×'

const parseAndAddLocationDHID = (loc, l) => {
	if (!Array.isArray(l.gidL)) return;

	const dhidGid = l.gidL.find(gid => gid.slice(0, dhidPrefix.length) === dhidPrefix)
	if (!dhidGid) return;
	const dhid = dhidGid.slice(dhidPrefix.length)

	// It seems that the DHID of the parent station is being used, not of the stop.
	// if (!loc.ids) loc.ids = {}
	// loc.ids.dhid = dhid
	// todo: use loc.ids.stationDHID instead?
	loc.stationDHID = dhid
}

export {
	parseAndAddLocationDHID,
}
