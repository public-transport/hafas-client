const dbJourney = {
	type: 'journey',
	legs: [
		{
			origin: {
				type: 'stop',
				id: '8000207',
				name: 'Köln Hbf',
				location: {
					type: 'location',
					id: '8000207',
					latitude: 50.942823,
					longitude: 6.959197,
				},
				products: {
					nationalExpress: true,
					national: true,
					regionalExpress: true,
					regional: true,
					suburban: true,
					bus: true,
					ferry: false,
					subway: false,
					tram: true,
					taxi: false,
				}
			},
			destination: {
				type: 'stop',
				id: '8073368',
				name: 'Köln Messe/Deutz Gl.11-12',
				location: {
					type: 'location',
					id: '8073368',
					latitude: 50.940602,
					longitude: 6.975162,
				},
				products: {
					nationalExpress: true,
					national: true,
					regionalExpress: true,
					regional: true,
					suburban: true,
					bus: true,
					ferry: false,
					subway: false,
					tram: true,
					taxi: false,
				},
				station: {
					type: 'station',
					id: '8003368',
					name: 'Köln Messe/Deutz',
					location: {
						type: 'location',
						id: '8003368',
						latitude: 50.940989,
						longitude: 6.974578,
					},
					products: {
						nationalExpress: true,
						national: true,
						regionalExpress: true,
						regional: true,
						suburban: true,
						bus: true,
						ferry: false,
						subway: false,
						tram: true,
						taxi: false,
					}
				}
			},
			arrival: '2020-04-11T05:20:00+02:00',
			plannedArrival: '2020-04-11T05:20:00+02:00',
			arrivalDelay: null,
			departure: '2020-04-11T05:17:00+02:00',
			plannedDeparture: '2020-04-11T05:17:00+02:00',
			departureDelay: null,
			public: true,
			walking: true,
			distance: null,
			transfer: true,
		},
		{
			origin: {
				type: 'stop',
				id: '8073368',
				name: 'Köln Messe/Deutz Gl.11-12',
				location: {
					type: 'location',
					id: '8073368',
					latitude: 50.940602,
					longitude: 6.975162,
				},
				products: {
					nationalExpress: true,
					national: true,
					regionalExpress: true,
					regional: true,
					suburban: true,
					bus: true,
					ferry: false,
					subway: false,
					tram: true,
					taxi: false,
				},
				station: {
					type: 'station',
					id: '8003368',
					name: 'Köln Messe/Deutz',
					location: {
						type: 'location',
						id: '8003368',
						latitude: 50.940989,
						longitude: 6.974578,
					},
					products: {
						nationalExpress: true,
						national: true,
						regionalExpress: true,
						regional: true,
						suburban: true,
						bus: true,
						ferry: false,
						subway: false,
						tram: true,
						taxi: false,
					}
				}
			},
			destination: {
				type: 'stop',
				id: '8000284',
				name: 'Nürnberg Hbf',
				location: {
					type: 'location',
					id: '8000284',
					latitude: 49.445435,
					longitude: 11.08227,
				},
				products: {
					nationalExpress: true,
					national: true,
					regionalExpress: false,
					regional: true,
					suburban: true,
					bus: true,
					ferry: false,
					subway: true,
					tram: true,
					taxi: false,
				}
			},
			arrival: '2020-04-11T09:01:00+02:00',
			plannedArrival: '2020-04-11T09:01:00+02:00',
			arrivalDelay: null,
			arrivalPrognosisType: 'prognosed',
			departure: '2020-04-11T05:20:00+02:00',
			plannedDeparture: '2020-04-11T05:20:00+02:00',
			departureDelay: null,
			departurePrognosisType: 'prognosed',
			reachable: true,
			tripId: '1|301001|0|80|11042020',
			line: {
				type: 'line',
				id: 'ice-523',
				fahrtNr: '523',
				name: 'ICE 523',
				public: true,
				adminCode: '80____',
				productName: 'ICE',
				mode: 'train',
				product: 'nationalExpress',
				operator: {
					type: 'operator',
					id: 'db-fernverkehr-ag',
					name: 'DB Fernverkehr AG',
				}
			},
			direction: 'München Hbf',
			arrivalPlatform: '9',
			plannedArrivalPlatform: '9',
			departurePlatform: '11',
			plannedDeparturePlatform: '11',
			remarks: [
					{
					text: 'Komfort Check-in möglich (Infos unter bahn.de/kci)',
					type: 'hint',
					code: 'komfort-checkin',
					summary: 'Komfort-Checkin available',
				}
			]
		}
	],
	refreshToken: '¶HKI¶D$A=1@O=Köln Hbf@L=8000207@a=128@$A=1@O=Köln Messe/Deutz Gl.11-12@L=8073368@a=128@$202004110517$202004110520$$$1$§T$A=1@O=Köln Messe/Deutz Gl.11-12@L=8073368@a=128@$A=1@O=Nürnberg Hbf@L=8000284@a=128@$202004110520$202004110901$ICE  523$$1$',
	price: {amount: 49.9, currency: 'EUR', hint: null},
}

export {
	dbJourney,
}
