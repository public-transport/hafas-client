const vbbOnDemandTrip = {
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
			name: 'Verkehrsgesellschaft Teltow-Fläming mbH',
		},
	},

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

	remarks: [
		{
			type: 'hint',
			code: 'OPERATOR',
			text: 'VTF',
		},
		{
			type: 'hint',
			code: 'qv',
			text: 'Rufbus Bestellung unter Tel.: (03371) 62 81 81',
		},
		{
			type: 'hint',
			code: 'qw',
			text: 'Bestellannahme: täglich von 5.00 - 17.00 Uhr',
		},
		{
			type: 'hint',
			code: 'qx',
			text: 'Onlinebuchung unter: <a href="https://www.vtfonline.de/rufbusapp.html" target="_blank">https://www.vtfonline.de/rufbusapp.html</a>',
		},
		{
			type: 'hint',
			code: 'qu',
			text: 'VBB-Tarif zuzüglich des Komfortzuschlages 1,00 EUR je Fahrgast und Strecke',
		},
		{
			type: 'hint',
			code: 'hx',
			text: 'Linientaxi max. 8 Personen',
		},
		{
			id: '118634',
			type: 'warning',
			summary: 'Gemeinsam sicher unterwegs - mit Abstand und medizinischer Maske (in Berlin: FFP2)!',
			text: 'An Haltestellen und Bahnhöfen sowie in Fahrzeugen. Maskenmuffel riskieren mindestens 50 Euro.\n<a href="https://www.vbb.de/corona" target="_blank" rel="noopener">Weitere Informationen</a>',
			icon: {
				type: 'HIM0',
				title: null,
			},
			priority: 100,
			products: {
				suburban: true,
				subway: true,
				tram: true,
				bus: true,
				ferry: true,
				express: true,
				regional: true,
			},
			company: 'VBB',
			categories: [
				0,
			],
			validFrom: '2021-04-24T00:00:00+02:00',
			validUntil: '2022-12-31T00:00:00+01:00',
			modified: '2021-06-12T07:43:36+02:00',
		},
	],
};

export {
	vbbOnDemandTrip,
};
