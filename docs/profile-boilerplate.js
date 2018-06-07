'use strict'

// see the ./writing-a-profile.md guide
const products = [
	{
		id: 'nationalExp',
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
	}
]

const transformReqBody = (body) => {
	// get these from the recorded app requests
	// body.client = { … }
	// body.ver = …
	// body.auth = { … }
	// body.lang = …
	return body
}

const insaProfile = {
	// locale: …,
	// timezone: …,
	// endpoint: …,
	transformReqBody,

	products: products,

	journeyLeg: false,
	radar: false
}

module.exports = insaProfile
