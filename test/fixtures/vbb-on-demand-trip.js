'use strict'

module.exports = {
	id: '1|42971|454|86|24102021',
	direction: 'Rufbus Niederer-Fläming',
	line: {
		type: 'line',
		id: 'r777',
		fahrtNr: '7',
		name: 'R777',
		public: true,
		adminCode: 'VTFRuf',
		productName: 'Bus',
		mode: 'bus',
		product: 'bus',
		operator: {
			type: 'operator',
			id: 'verkehrsgesellschaft-teltow-flaming-mbh',
			name: 'Verkehrsgesellschaft Teltow-Fläming mbH'
		},
	},
	reachable: true,

	origin: {},
	departure: null,
	plannedDeparture: null,
	departureDelay: null,
	departurePlatform: null,
	plannedDeparturePlatform: null,
	departurePrognosisType: null,

	destination: {},
	arrival: null,
	plannedArrival: null,
	arrivalDelay: null,
	arrivalPlatform: null,
	plannedArrivalPlatform: null,
	arrivalPrognosisType: null,
}
