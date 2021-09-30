const expected = [
	{
		tripId: '1|15591|3|86|4102021',
		direction: 'Am Kupfergraben (Berlin)',
		line: {
			type: 'line',
			id: '12',
			fahrtNr: null,
			name: '12',
			public: true,
		},

		when: '2021-10-04T10:01:00+02:00',
		plannedWhen: '2021-10-04T10:01:00+02:00',
		delay: null,

		platform: null,
		stop: {
			type: 'station',
			id: '302207003',
			name: 'Schwedter Str. (Berlin)',
			location: {
				type: 'location',
				id: '302207003',
				latitude: 52.536601,
				longitude: 13.407591,
			}
		},
	},
	{
		tripId: '1|15615|4|86|4102021',
		direction: 'Pasedagplatz (Berlin)',
		line: {
			type: 'line',
			id: '12',
			fahrtNr: null,
			name: '12',
			public: true,
		},

		when: '2021-10-04T10:02:00+02:00',
		plannedWhen: '2021-10-04T10:02:00+02:00',
		delay: null,

		platform: null,
		stop: {
			type: 'station',
			id: '302207004',
			name: 'Schwedter Str. (Berlin)',
			location: {
				type: 'location',
				id: '302207004',
				latitude: 52.53714,
				longitude: 13.408274,
			}
		},
	},
	{
		tripId: '1|16174|2|86|4102021',
		direction: 'Schillerstr. (Berlin)',
		line: {
			type: 'line',
			id: 'm1',
			fahrtNr: null,
			name: 'M1',
			public: true,
		},

		when: '2021-10-04T10:02:00+02:00',
		plannedWhen: '2021-10-04T10:02:00+02:00',
		delay: null,

		platform: null,
		stop: {
			type: 'station',
			id: '302207004',
			name: 'Schwedter Str. (Berlin)',
			location: {
				type: 'location',
				id: '302207004',
				latitude: 52.53714,
				longitude: 13.408274,
			}
		},
	},
	{
		tripId: '1|16127|2|86|4102021',
		direction: 'Am Kupfergraben (Berlin)',
		line: {
			type: 'line',
			id: 'm1',
			fahrtNr: null,
			name: 'M1',
			public: true,
		},

		when: '2021-10-04T10:04:00+02:00',
		plannedWhen: '2021-10-04T10:04:00+02:00',
		delay: null,

		platform: null,
		stop: {
			type: 'station',
			id: '302207003',
			name: 'Schwedter Str. (Berlin)',
			location: {
				type: 'location',
				id: '302207003',
				latitude: 52.536601,
				longitude: 13.407591,
			}
		},
	}
]

export {
	expected,
}
