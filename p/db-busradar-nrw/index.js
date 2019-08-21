'use strict'

// DB Busradar NRW app does not allow selecting specific modes of transport to filter results,
// so the bitmasks had to be determined by querying some stations and looking at the results..
const products = [
	{
		id: 'nationalExpress',
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
	// 4: not always true when a station has RE stopping at it, maybe something else?
	/*
	{
		id: 'regionalExp',
		mode: 'train',
		bitmasks: [4],
		name: 'Regionalexpress',
		short: 'RE',
		default: true
	},
	*/
	// 8: also used for replacement service incl. S-Bahn replacement
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
	// 128, 256: unused?
	/*
	{
		id: 'subway',
		mode: 'train',
		bitmasks: [128],
		name: 'U-Bahn',
		short: 'U',
		default: true
	},
	{
		id: 'tram',
		mode: 'train',
		bitmasks: [256],
		name: 'Tram',
		short: 'T',
		default: true
	},
	*/
	{
		id: 'taxi',
		mode: 'taxi',
		bitmasks: [512],
		name: 'AnrufSammelTaxi',
		short: 'AST',
		default: true
	}
]

const transformReqBody = (body) => {
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
	body.lang = 'eng'
	return body
}

const dbbusradarnrwProfile = {
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	endpoint: 'https://db-regio.hafas.de/bin/hci/mgate.exe',
	transformReqBody,

	products: products,

	trip: true,
	radar: true
}

module.exports = dbbusradarnrwProfile

