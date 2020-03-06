'use strict'

module.exports = {
	type: 'stop',
	id: '8011155',
	ids: {
		dhid: 'de:11000:900100003',
		VBB: '900100003'
	},
	name: 'Berlin Alexanderplatz',
	location: {
		type: 'location',
		id: '8011155',
		latitude: 52.521526,
		longitude: 13.411088
	},
	products: {
		nationalExpress: false,
		national: false,
		regionalExp: false,
		regional: true,
		suburban: true,
		bus: true,
		ferry: false,
		subway: true,
		tram: true,
		taxi: false
	},
	transitAuthority: 'VBB',
}
