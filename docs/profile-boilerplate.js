// Refer to the the ./writing-a-profile.md guide.

const products = [
	{
		id: 'commuterTrain',
		mode: 'train',
		bitmasks: [16],
		name: 'ACME Commuter Rail',
		short: 'CR',
		default: true
	},
	{
		id: 'metro',
		mode: 'train',
		bitmasks: [8],
		name: 'Foo Bar Metro',
		short: 'M',
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

	trip: false,
	radar: false
}

export {
	insaProfile,
}
