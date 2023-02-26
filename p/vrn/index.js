import baseProfile from './base.json'
import {products} from './products.js'

const profile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products,

	trip: true,
	radar: true,
	reachableFrom: true,
	refreshJourney: true,
	refreshJourneyUseOutReconL: true,
}

export {
	profile,
}
