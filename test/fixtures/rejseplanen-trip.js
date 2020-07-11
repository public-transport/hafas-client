'use strict'

const aalborg = {
	type: 'stop',
	id: '8600020',
	name: 'Aalborg St.',
	location: {
		type: 'location',
		id: '8600020',
		latitude: 57.043037,
		longitude: 9.917044
	},
	products: {
		'national-train': true,
		'national-train-2': true,
		'local-train': true,
		o: true,
		's-tog': false,
	}
}

const hobro = {
	type: 'stop',
	id: '8600032',
	name: 'Hobro St.',
	location: {
		type: 'location',
		id: '8600032',
		latitude: 56.643539,
		longitude: 9.78279
	},
	products: {
		'national-train': true,
		'national-train-2': true,
		'local-train': true,
		o: true,
		's-tog': false,
	}
}

module.exports = {
	origin: aalborg,
	destination: hobro,
	arrival: '2020-07-13T11:25:00+02:00',
	plannedArrival: '2020-07-13T11:25:00+02:00',
	arrivalDelay: null,
	departure: '2020-07-13T10:35:00+02:00',
	plannedDeparture: '2020-07-13T10:35:00+02:00',
	departureDelay: null,
	reachable: true,
	line: {
		type: 'line',
		id: 'replacement-bus-rod',
		fahrtNr: '20002',
		name: 'Replacement bus RØD',
		public: true,
		adminCode: '000001',
		mode: 'train',
		product: 'o',
		operator: {type: 'operator', id: 'dsb', name: 'DSB'},
	},
	direction: null,
	arrivalPlatform: null,
	plannedArrivalPlatform: null,
	departurePlatform: null,
	plannedDeparturePlatform: null,
	stopovers: [
		{
			stop: aalborg,
			arrival: null,
			plannedArrival: null,
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			departure: '2020-07-13T10:35:00+02:00',
			plannedDeparture: '2020-07-13T10:35:00+02:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null
		},
		{
			stop: hobro,
			arrival: '2020-07-13T11:25:00+02:00',
			plannedArrival: '2020-07-13T11:25:00+02:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			departure: null,
			plannedDeparture: null,
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null
		}
	],
	remarks: [{
		type: 'hint',
		code: 'NO',
		text: 'Vi kører med Togbusser på denne tur, som derfor varer længere end normalt. Tiderne, du ser i Rejseplanen, er kun vejledende. Togbusserne kører i pendulfart mellem stationerne. Det skyldes akutte driftsforstyrrelser. I Togbussen kan du ikke tage din cykel med.',
	}, {
		type: 'status',
		code: 'text.realtime.journey.additional.service',
		text: 'Extra bus or train',
	}],
	id: '1|51255|0|86|13072020'
}
