const rsagJourneys = {
	type: 'journey',
	legs: [
		{
			tripId: '1|224173|2|80|19012021',
			direction: 'Güstrow',
			line: {
				type: 'line',
				id: '800156-s2',
				fahrtNr: '670',
				name: 'S2',
				public: true,
				adminCode: '800156',
				productName: 'S',
				mode: 'train',
				product: 's-bahn',
				operator: {
					type: 'operator',
					id: 'db-regio-ag-nordost',
					name: 'DB Regio AG Nordost',
				},
			},
			reachable: true,
			currentLocation: {
				type: 'location',
				latitude: 54.078242,
				longitude: 12.131078,
			},

			origin: {
				type: 'stop',
				id: '8010304',
				name: 'Rostock Hbf',
				location: {
					type: 'location',
					id: '8010304',
					latitude: 54.078242,
					longitude: 12.131078,
				},
				products: {
					'ice': true,
					'ic-ec': true,
					'long-distance-train': false,
					'regional-train': true,
					's-bahn': true,
					'bus': false,
					'ferry': false,
					'u-bahn': false,
					'tram': false,
					'on-call': false,
				},
			},
			departure: '2021-01-19T14:14:00+01:00',
			plannedDeparture: '2021-01-19T14:14:00+01:00',
			departureDelay: 0,
			departurePlatform: '1',
			plannedDeparturePlatform: '1',
			departurePrognosisType: 'prognosed',

			destination: {
				type: 'stop',
				id: '8010153',
				name: 'Güstrow',
				location: {
					type: 'location',
					id: '8010153',
					latitude: 53.800601,
					longitude: 12.172833,
				},
				products: {
					'ice': false,
					'ic-ec': true,
					'long-distance-train': false,
					'regional-train': true,
					's-bahn': true,
					'bus': false,
					'ferry': false,
					'u-bahn': false,
					'tram': false,
					'on-call': false,
				},
			},
			arrival: '2021-01-19T14:44:00+01:00',
			plannedArrival: '2021-01-19T14:44:00+01:00',
			arrivalDelay: 0,
			arrivalPlatform: '4',
			plannedArrivalPlatform: '4',
			arrivalPrognosisType: 'prognosed',

			cycle: {min: 3600, max: 3600, nr: 3},
		},
	],
	refreshToken: '¶HKI¶T$A=1@O=Rostock Hbf@L=8010304@a=128@$A=1@O=Güstrow@L=8010153@a=128@$202101191414$202101191444$      S2$$1$$$$',
	cycle: {min: 3600},
};

export {
	rsagJourneys,
};
