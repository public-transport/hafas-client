// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

const baseProfile = require('./base.json')

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

const profile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products: products,

	refreshJourneyUseOutReconL: true,
	journeysOutFrwd: false,
	trip: true,
	radar: true,
	remarks: true, // `.svcResL[0].res.msgL[]` is missing though 🤔
	lines: false, // `.svcResL[0].res.lineL[]` is missing 🤔
}

export {
	profile,
}
