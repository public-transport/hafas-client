import baseProfile from './base.json'
import {products} from './products.js'

const profile = {
	...baseProfile,
	locale: 'at-DE',
	timezone: 'Europe/Vienna',

	products,

	trip: true,
	refreshJourney: true,
	reachableFrom: true,
	refreshJourneyUseOutReconL: true,
}

export {
	profile,
}
