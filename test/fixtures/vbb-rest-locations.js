const expected = [
	{
		type: 'station',
		id: '900020201',
		name: 'S+U Jungfernheide Bhf (Berlin)',
		location: {
			type: 'location',
			id: '900020201',
			latitude: 52.530434,
			longitude: 13.300134
		},
		products: {
			suburban: true,
			subway: true,
			tram: false,
			bus: true,
			ferry: false,
			express: false,
			regional: true
		},
		lines: [
			{
				type: 'line',
				id: 's41',
				fahrtNr: null,
				name: 'S41',
				public: true,
				mode: 'train',
				product: 'suburban'
			},
			{
				type: 'line',
				id: 's42',
				fahrtNr: null,
				name: 'S42',
				public: true,
				mode: 'train',
				product: 'suburban'
			},
			{
				type: 'line',
				id: 's46',
				fahrtNr: null,
				name: 'S46',
				public: true,
				mode: 'train',
				product: 'suburban'
			},
			{
				type: 'line',
				id: 'u7',
				fahrtNr: null,
				name: 'U7',
				public: true,
				mode: 'train',
				product: 'subway'
			},
			{
				type: 'line',
				id: '109',
				fahrtNr: null,
				name: '109',
				public: true,
				mode: 'bus',
				product: 'bus'
			},
			{
				type: 'line',
				id: 'm21',
				fahrtNr: null,
				name: 'M21',
				public: true,
				mode: 'bus',
				product: 'bus'
			},
			{
				type: 'line',
				id: 'm27',
				fahrtNr: null,
				name: 'M27',
				public: true,
				mode: 'bus',
				product: 'bus'
			},
			{
				type: 'line',
				id: 'n7',
				fahrtNr: null,
				name: 'N7',
				public: true,
				mode: 'bus',
				product: 'bus'
			},
			{
				type: 'line',
				id: 'rb10',
				fahrtNr: null,
				name: 'RB10',
				public: true,
				mode: 'train',
				product: 'regional'
			},
			{
				type: 'line',
				id: 'rb13',
				fahrtNr: null,
				name: 'RB13',
				public: true,
				mode: 'train',
				product: 'regional'
			},
			{
				type: 'line',
				id: 're2',
				fahrtNr: null,
				name: 'RE2',
				public: true,
				mode: 'train',
				product: 'regional'
			},
			{
				type: 'line',
				id: 're4',
				fahrtNr: null,
				name: 'RE4',
				public: true,
				mode: 'train',
				product: 'regional'
			},
			{
				type: 'line',
				id: 're6',
				fahrtNr: null,
				name: 'RE6',
				public: true,
				mode: 'train',
				product: 'regional'
			}
		]
	},
	{
		type: 'station',
		id: '900020207',
		name: 'Tegeler Weg/S Jungfernheide (Berlin)',
		location: {
			type: 'location',
			id: '900020207',
			latitude: 52.52941,
			longitude: 13.296242
		},
		products: {
			suburban: false,
			subway: false,
			tram: false,
			bus: true,
			ferry: false,
			express: false,
			regional: false
		},
		lines: [
			{
				type: 'line',
				id: 's41',
				fahrtNr: null,
				name: 'S41',
				public: true,
				mode: 'train',
				product: 'suburban'
			},
			{
				type: 'line',
				id: 's42',
				fahrtNr: null,
				name: 'S42',
				public: true,
				mode: 'train',
				product: 'suburban'
			},
			{
				type: 'line',
				id: 's46',
				fahrtNr: null,
				name: 'S46',
				public: true,
				mode: 'train',
				product: 'suburban'
			},
			{
				type: 'line',
				id: 'u7',
				fahrtNr: null,
				name: 'U7',
				public: true,
				mode: 'train',
				product: 'subway'
			},
			{
				type: 'line',
				id: '109',
				fahrtNr: null,
				name: '109',
				public: true,
				mode: 'bus',
				product: 'bus'
			},
			{
				type: 'line',
				id: 'm21',
				fahrtNr: null,
				name: 'M21',
				public: true,
				mode: 'bus',
				product: 'bus'
			},
			{
				type: 'line',
				id: 'm27',
				fahrtNr: null,
				name: 'M27',
				public: true,
				mode: 'bus',
				product: 'bus'
			},
			{
				type: 'line',
				id: 'n7',
				fahrtNr: null,
				name: 'N7',
				public: true,
				mode: 'bus',
				product: 'bus'
			},
			{
				type: 'line',
				id: 'rb10',
				fahrtNr: null,
				name: 'RB10',
				public: true,
				mode: 'train',
				product: 'regional'
			},
			{
				type: 'line',
				id: 'rb13',
				fahrtNr: null,
				name: 'RB13',
				public: true,
				mode: 'train',
				product: 'regional'
			},
			{
				type: 'line',
				id: 're2',
				fahrtNr: null,
				name: 'RE2',
				public: true,
				mode: 'train',
				product: 'regional'
			},
			{
				type: 'line',
				id: 're4',
				fahrtNr: null,
				name: 'RE4',
				public: true,
				mode: 'train',
				product: 'regional'
			},
			{
				type: 'line',
				id: 're6',
				fahrtNr: null,
				name: 'RE6',
				public: true,
				mode: 'train',
				product: 'regional'
			}
		]
	},
	{
		type: 'location',
		id: '900981212',
		latitude: 52.546813,
		longitude: 13.273589,
		name: 'Berlin, Sportplatz Jungfernheide'
	},
]

export {
	expected,
}
