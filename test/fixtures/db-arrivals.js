const dbArrivals = [
	{
		tripId: '1|1144239|52|80|9062020',
		stop: {
			type: 'stop',
			id: '730985',
			name: 'Jungfernheide Bahnhof (S+U), Berlin',
			location: {
				type: 'location',
				id: '730985',
				latitude: 52.530866,
				longitude: 13.300781
			},
			products: {
				nationalExpress: false,
				national: false,
				regionalExpress: false,
				regional: true,
				suburban: true,
				bus: true,
				ferry: false,
				subway: true,
				tram: false,
				taxi: false
			},
			station: {
				type: 'station',
				id: '8011167',
				name: 'Berlin Jungfernheide',
				location: {
					type: 'location',
					id: '8011167',
					latitude: 52.530291,
					longitude: 13.299451
				},
				products: {
					nationalExpress: false,
					national: false,
					regionalExpress: false,
					regional: true,
					suburban: true,
					bus: true,
					ferry: false,
					subway: true,
					tram: false,
					taxi: false
				},
				lines: [
					{
						type: 'line',
						id: '3-bb-re6',
						fahrtNr: null,
						name: 'Bus RE6',
						public: true,
						mode: 'train',
						product: 'regional'
					},
					{
						type: 'line',
						id: '3-08-sev-1491900-5842741',
						fahrtNr: null,
						name: 'Bus SEV',
						public: true,
						mode: 'train',
						product: 'regional'
					},
					{
						type: 'line',
						id: 'rb',
						fahrtNr: null,
						name: 'RB',
						public: true,
						mode: 'train',
						product: 'regional'
					},
					{
						type: 'line',
						id: 're',
						fahrtNr: null,
						name: 'RE',
						public: true,
						mode: 'train',
						product: 'regional'
					},
					{
						type: 'line',
						id: 're',
						fahrtNr: null,
						name: 'RE',
						public: true,
						mode: 'train',
						product: 'regional'
					},
					{
						type: 'line',
						id: '4-08-2',
						fahrtNr: null,
						name: 'S 2',
						public: true,
						mode: 'train',
						product: 'suburban'
					},
					{
						type: 'line',
						id: '4-08-25',
						fahrtNr: null,
						name: 'S 25',
						public: true,
						mode: 'train',
						product: 'suburban'
					},
					{
						type: 'line',
						id: '4-08-41',
						fahrtNr: null,
						name: 'S 41',
						public: true,
						mode: 'train',
						product: 'suburban'
					},
					{
						type: 'line',
						id: '4-08-42',
						fahrtNr: null,
						name: 'S 42',
						public: true,
						mode: 'train',
						product: 'suburban'
					},
					{
						type: 'line',
						id: '4-08-46',
						fahrtNr: null,
						name: 'S 46',
						public: true,
						mode: 'train',
						product: 'suburban'
					},
					{
						type: 'line',
						id: '5-vbbbvb-n7',
						fahrtNr: null,
						name: 'Bus N7',
						public: true,
						mode: 'bus',
						product: 'bus'
					},
					{
						type: 'line',
						id: '5-vbbbvb-x9',
						fahrtNr: null,
						name: 'Bus X9',
						public: true,
						mode: 'bus',
						product: 'bus'
					},
					{
						type: 'line',
						id: '5-vbbbvb-109',
						fahrtNr: null,
						name: 'Bus 109',
						public: true,
						mode: 'bus',
						product: 'bus'
					},
					{
						type: 'line',
						id: '5-vbbbvb-m21',
						fahrtNr: null,
						name: 'Bus M21',
						public: true,
						mode: 'bus',
						product: 'bus'
					},
					{
						type: 'line',
						id: '5-vbbbvb-m27',
						fahrtNr: null,
						name: 'Bus M27',
						public: true,
						mode: 'bus',
						product: 'bus'
					},
					{
						type: 'line',
						id: '7-vbbbvu-7',
						fahrtNr: null,
						name: 'U 7',
						public: true,
						mode: 'train',
						product: 'subway'
					}
				]
			},
			lines: [
				{
					type: 'line',
					id: '5-vbbbvb-n7',
					fahrtNr: null,
					name: 'Bus N7',
					public: true,
					mode: 'bus',
					product: 'bus'
				},
				{
					type: 'line',
					id: '5-vbbbvb-x9',
					fahrtNr: null,
					name: 'Bus X9',
					public: true,
					mode: 'bus',
					product: 'bus'
				},
				{
					type: 'line',
					id: '5-vbbbvb-m21',
					fahrtNr: null,
					name: 'Bus M21',
					public: true,
					mode: 'bus',
					product: 'bus'
				},
				{
					type: 'line',
					id: '5-vbbbvb-m27',
					fahrtNr: null,
					name: 'Bus M27',
					public: true,
					mode: 'bus',
					product: 'bus'
				},
				{
					type: 'line',
					id: '7-vbbbvu-7',
					fahrtNr: null,
					name: 'U 7',
					public: true,
					mode: 'train',
					product: 'subway'
				}
			]
		},
		when: '2020-06-09T17:21:00+02:00',
		plannedWhen: '2020-06-09T17:04:00+02:00',
		delay: 1020,
		platform: null,
		plannedPlatform: null,
		prognosisType: 'prognosed',
		direction: null,
		provenance: 'Rathaus Spandau (S+U), Berlin',
		origin: null,
		destination: null,
		line: {
			type: 'line',
			id: '7-vbbbvu-7',
			fahrtNr: '19245',
			name: 'U 7',
			public: true,
			adminCode: 'vbbBVU',
			productName: 'U',
			mode: 'train',
			product: 'subway',
			operator: { type: 'operator', id: 'nahreisezug', name: 'Nahreisezug' }
		},
		remarks: []
	}
]

export {
	dbArrivals,
}
