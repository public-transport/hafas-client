'use strict'

// DB Busradar NRW app does not allow selecting specific modes of transport to filter results,
// so the bitmasks had to be determined by querying some stations and looking at the results..
const products = [
	{
		id: 'national-express',
		mode: 'train',
		bitmasks: [1],
		name: 'InterCityExpress',
		short: 'ICE',
		default: true
	},
	{
		id: 'national',
		mode: 'train',
		bitmasks: [2],
		name: 'InterCity & EuroCity',
		short: 'IC/EC',
		default: true
	},
	// todo: not always true when a station has RE stopping at it
	// maybe something else?
	{
		id: 'regional-express',
		mode: 'train',
		bitmasks: [4],
		name: 'Regionalexpress',
		short: 'RE',
		default: true
	},
	// todo: also used for replacement service incl. S-Bahn replacement
	{
		id: 'regional',
		mode: 'train',
		bitmasks: [8],
		name: 'Regionalzug',
		short: 'RB/RE',
		default: true
	},
	{
		id: 'suburban',
		mode: 'train',
		bitmasks: [16],
		name: 'S-Bahn',
		short: 'S',
		default: true
	},
	{
		id: 'bus',
		mode: 'bus',
		bitmasks: [32],
		name: 'Bus',
		short: 'Bus',
		default: true
	},
	{
		id: 'ferry',
		mode: 'watercraft',
		bitmasks: [64],
		name: 'Ferry',
		short: 'F',
		default: true
	},
	// todo: are `128` & `256` unused?
	{
		id: 'taxi',
		mode: 'taxi',
		bitmasks: [512],
		name: 'AnrufSammelTaxi',
		short: 'AST',
		default: true
	}
]

const transformReqBody = (_, body) => {
	body.client = {
		id: 'DB-REGIO',
		name: 'DB Busradar NRW',
		os: 'Android 9',
		type: 'AND',
		v: 100021
	}
	body.ext = 'DB.REGIO.1'
	body.ver = '1.10'
	body.auth = {type: 'AID', aid: 'OGBAqytjHhCvr0J4'}
	return body
}

const dbBusradarNrwProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://db-regio.hafas.de/bin/hci/mgate.exe',
	transformReqBody,

	products: products,

	journeysOutFrwd: false,
	trip: true,
	radar: true,
	remarks: false, // seems like ver >= 1.20 is required
	lines: false, // seems like ver >= 1.16 is required
}

module.exports = dbBusradarNrwProfile

