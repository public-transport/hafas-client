'use strict'

module.exports = [
	{
		tripId: '1|31015|8|86|19082019',
		stop: {
			type: 'stop',
			id: '900000100004',
			name: 'S+U Jannowitzbrücke',
			location: {
				type: 'location',
				id: '900100004',
				latitude: 52.515503,
				longitude: 13.418027
			},
			products: {
				suburban: true,
				subway: true,
				tram: false,
				bus: true,
				ferry: false,
				express: false,
				regional: false
			},
			lines: [
				{
					type: 'line',
					id: 's3',
					fahrtNr: null,
					name: 'S3',
					public: true,
					mode: 'train',
					product: 'suburban',
					symbol: 'S',
					nr: 3,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: 's5',
					fahrtNr: null,
					name: 'S5',
					public: true,
					mode: 'train',
					product: 'suburban',
					symbol: 'S',
					nr: 5,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: 's7',
					fahrtNr: null,
					name: 'S7',
					public: true,
					mode: 'train',
					product: 'suburban',
					symbol: 'S',
					nr: 7,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: 's9',
					fahrtNr: null,
					name: 'S9',
					public: true,
					mode: 'train',
					product: 'suburban',
					symbol: 'S',
					nr: 9,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: 's75',
					fahrtNr: null,
					name: 'S75',
					public: true,
					mode: 'train',
					product: 'suburban',
					symbol: 'S',
					nr: 75,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: 'u8',
					fahrtNr: null,
					name: 'U8',
					public: true,
					mode: 'train',
					product: 'subway',
					symbol: 'U',
					nr: 8,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: '248',
					fahrtNr: null,
					name: '248',
					public: true,
					mode: 'bus',
					product: 'bus',
					symbol: null,
					nr: 248,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: '300',
					fahrtNr: null,
					name: '300',
					public: true,
					mode: 'bus',
					product: 'bus',
					symbol: null,
					nr: 300,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: 'n8',
					fahrtNr: null,
					name: 'N8',
					public: true,
					mode: 'bus',
					product: 'bus',
					symbol: 'N',
					nr: 8,
					metro: false,
					express: false,
					night: true
				},
				{
					type: 'line',
					id: 'n40',
					fahrtNr: null,
					name: 'N40',
					public: true,
					mode: 'bus',
					product: 'bus',
					symbol: 'N',
					nr: 40,
					metro: false,
					express: false,
					night: true
				},
				{
					type: 'line',
					id: 'n65',
					fahrtNr: null,
					name: 'N65',
					public: true,
					mode: 'bus',
					product: 'bus',
					symbol: 'N',
					nr: 65,
					metro: false,
					express: false,
					night: true
				}
			]
		},
		when: '2019-08-19T20:30:00+02:00',
		plannedWhen: '2019-08-19T20:30:00+02:00',
		delay: 0,
		platform: null,
		plannedPlatform: null,
		direction: 'S+U Hermannstr.',
		line: {
			type: 'line',
			id: 'u8',
			fahrtNr: '19869',
			name: 'U8',
			public: true,
			mode: 'train',
			product: 'subway',
			operator: {
				type: 'operator',
				id: 'berliner-verkehrsbetriebe',
				name: 'Berliner Verkehrsbetriebe'
			},
			symbol: 'U',
			nr: 8,
			metro: false,
			express: false,
			night: false
		},
		remarks: [
			{
				type: 'hint',
				code: 'bf',
				text: 'barrier-free'
			},
			{
				type: 'hint',
				code: 'FB',
				text: 'Bicycle conveyance'
			}
		],
		nextStopovers: [
			{
				stop: {
					type: 'stop',
					id: '900000100004',
					name: 'S+U Jannowitzbrücke',
					location: {
						type: 'location',
						id: '900100004',
						latitude: 52.515503,
						longitude: 13.418027
					},
					products: {
						suburban: true,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					},
					lines: [
						{
							type: 'line',
							id: 's3',
							fahrtNr: null,
							name: 'S3',
							public: true,
							mode: 'train',
							product: 'suburban',
							symbol: 'S',
							nr: 3,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: 's5',
							fahrtNr: null,
							name: 'S5',
							public: true,
							mode: 'train',
							product: 'suburban',
							symbol: 'S',
							nr: 5,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: 's7',
							fahrtNr: null,
							name: 'S7',
							public: true,
							mode: 'train',
							product: 'suburban',
							symbol: 'S',
							nr: 7,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: 's9',
							fahrtNr: null,
							name: 'S9',
							public: true,
							mode: 'train',
							product: 'suburban',
							symbol: 'S',
							nr: 9,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: 's75',
							fahrtNr: null,
							name: 'S75',
							public: true,
							mode: 'train',
							product: 'suburban',
							symbol: 'S',
							nr: 75,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: 'u8',
							fahrtNr: null,
							name: 'U8',
							public: true,
							mode: 'train',
							product: 'subway',
							symbol: 'U',
							nr: 8,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: '248',
							fahrtNr: null,
							name: '248',
							public: true,
							mode: 'bus',
							product: 'bus',
							symbol: null,
							nr: 248,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: '300',
							fahrtNr: null,
							name: '300',
							public: true,
							mode: 'bus',
							product: 'bus',
							symbol: null,
							nr: 300,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: 'n8',
							fahrtNr: null,
							name: 'N8',
							public: true,
							mode: 'bus',
							product: 'bus',
							symbol: 'N',
							nr: 8,
							metro: false,
							express: false,
							night: true
						},
						{
							type: 'line',
							id: 'n40',
							fahrtNr: null,
							name: 'N40',
							public: true,
							mode: 'bus',
							product: 'bus',
							symbol: 'N',
							nr: 40,
							metro: false,
							express: false,
							night: true
						},
						{
							type: 'line',
							id: 'n65',
							fahrtNr: null,
							name: 'N65',
							public: true,
							mode: 'bus',
							product: 'bus',
							symbol: 'N',
							nr: 65,
							metro: false,
							express: false,
							night: true
						}
					]
				},
				arrival: null,
				plannedArrival: null,
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: '2019-08-19T20:30:00+02:00',
				plannedDeparture: '2019-08-19T20:30:00+02:00',
				departureDelay: 0,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000100008',

					name: 'U Heinrich-Heine-Str.',
					location: {
						type: 'location',
						id: '900100008',
						latitude: 52.510856,
						longitude: 13.416167
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:31:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000013101',
					name: 'U Moritzplatz',
					location: {
						type: 'location',
						id: '900013101',
						latitude: 52.503737,
						longitude: 13.410944
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:33:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000013102',
					name: 'U Kottbusser Tor',
					location: {
						type: 'location',
						id: '900013102',
						latitude: 52.499044,
						longitude: 13.417749
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:35:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000016201',
					name: 'U Schönleinstr.',
					location: {
						type: 'location',
						id: '900016201',
						latitude: 52.493183,
						longitude: 13.422243
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:36:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000078101',
					name: 'U Hermannplatz',
					location: {
						type: 'location',
						id: '900078101',
						latitude: 52.486954,
						longitude: 13.424724
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:38:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000079202',
					name: 'U Boddinstr.',
					location: {
						type: 'location',
						id: '900079202',
						latitude: 52.479744,
						longitude: 13.425785
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:40:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000079201',
					name: 'U Leinestr.',
					location: {
						type: 'location',
						id: '900079201',
						latitude: 52.472877,
						longitude: 13.428401
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:41:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000079221',
					name: 'S+U Hermannstr.',
					location: {
						type: 'location',
						id: '900079221',
						latitude: 52.467177,
						longitude: 13.4317
					},
					products: {
						suburban: true,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:42:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			}
		]
	},
	{
		tripId: '1|31067|4|86|19082019',
		stop: {
			type: 'stop',
			id: '900000100004',
			name: 'S+U Jannowitzbrücke',
			location: {
				type: 'location',
				id: '900100004',
				latitude: 52.515503,
				longitude: 13.418027
			},
			products: {
				suburban: true,
				subway: true,
				tram: false,
				bus: true,
				ferry: false,
				express: false,
				regional: false
			},
			lines: [
				{
					type: 'line',
					id: 's3',
					fahrtNr: null,
					name: 'S3',
					public: true,
					mode: 'train',
					product: 'suburban',
					symbol: 'S',
					nr: 3,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: 's5',
					fahrtNr: null,
					name: 'S5',
					public: true,
					mode: 'train',
					product: 'suburban',
					symbol: 'S',
					nr: 5,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: 's7',
					fahrtNr: null,
					name: 'S7',
					public: true,
					mode: 'train',
					product: 'suburban',
					symbol: 'S',
					nr: 7,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: 's9',
					fahrtNr: null,
					name: 'S9',
					public: true,
					mode: 'train',
					product: 'suburban',
					symbol: 'S',
					nr: 9,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: 's75',
					fahrtNr: null,
					name: 'S75',
					public: true,
					mode: 'train',
					product: 'suburban',
					symbol: 'S',
					nr: 75,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: 'u8',
					fahrtNr: null,
					name: 'U8',
					public: true,
					mode: 'train',
					product: 'subway',
					symbol: 'U',
					nr: 8,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: '248',
					fahrtNr: null,
					name: '248',
					public: true,
					mode: 'bus',
					product: 'bus',
					symbol: null,
					nr: 248,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: '300',
					fahrtNr: null,
					name: '300',
					public: true,
					mode: 'bus',
					product: 'bus',
					symbol: null,
					nr: 300,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: 'n8',
					fahrtNr: null,
					name: 'N8',
					public: true,
					mode: 'bus',
					product: 'bus',
					symbol: 'N',
					nr: 8,
					metro: false,
					express: false,
					night: true
				},
				{
					type: 'line',
					id: 'n40',
					fahrtNr: null,
					name: 'N40',
					public: true,
					mode: 'bus',
					product: 'bus',
					symbol: 'N',
					nr: 40,
					metro: false,
					express: false,
					night: true
				},
				{
					type: 'line',
					id: 'n65',
					fahrtNr: null,
					name: 'N65',
					public: true,
					mode: 'bus',
					product: 'bus',
					symbol: 'N',
					nr: 65,
					metro: false,
					express: false,
					night: true
				}
			]
		},
		when: '2019-08-19T20:30:00+02:00',
		plannedWhen: '2019-08-19T20:30:00+02:00',
		delay: 0,
		platform: null,
		plannedPlatform: null,
		direction: 'U Paracelsus-Bad',
		line: {
			type: 'line',
			id: 'u8',
			fahrtNr: '19453',
			name: 'U8',
			public: true,
			mode: 'train',
			product: 'subway',
			operator: {
				type: 'operator',
				id: 'berliner-verkehrsbetriebe',
				name: 'Berliner Verkehrsbetriebe'
			},
			symbol: 'U',
			nr: 8,
			metro: false,
			express: false,
			night: false
		},
		remarks: [
			{
				type: 'hint',
				code: 'bf',
				text: 'barrier-free'
			},
			{
				type: 'hint',
				code: 'FB',
				text: 'Bicycle conveyance'
			}
		],
		nextStopovers: [
			{
				stop: {
					type: 'stop',
					id: '900000100004',
					name: 'S+U Jannowitzbrücke',
					location: {
						type: 'location',
						id: '900100004',
						latitude: 52.515503,
						longitude: 13.418027
					},
					products: {
						suburban: true,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					},
					lines: [
						{
							type: 'line',
							id: 's3',
							fahrtNr: null,
							name: 'S3',
							public: true,
							mode: 'train',
							product: 'suburban',
							symbol: 'S',
							nr: 3,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: 's5',
							fahrtNr: null,
							name: 'S5',
							public: true,
							mode: 'train',
							product: 'suburban',
							symbol: 'S',
							nr: 5,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: 's7',
							fahrtNr: null,
							name: 'S7',
							public: true,
							mode: 'train',
							product: 'suburban',
							symbol: 'S',
							nr: 7,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: 's9',
							fahrtNr: null,
							name: 'S9',
							public: true,
							mode: 'train',
							product: 'suburban',
							symbol: 'S',
							nr: 9,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: 's75',
							fahrtNr: null,
							name: 'S75',
							public: true,
							mode: 'train',
							product: 'suburban',
							symbol: 'S',
							nr: 75,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: 'u8',
							fahrtNr: null,
							name: 'U8',
							public: true,
							mode: 'train',
							product: 'subway',
							symbol: 'U',
							nr: 8,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: '248',
							fahrtNr: null,
							name: '248',
							public: true,
							mode: 'bus',
							product: 'bus',
							symbol: null,
							nr: 248,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: '300',
							fahrtNr: null,
							name: '300',
							public: true,
							mode: 'bus',
							product: 'bus',
							symbol: null,
							nr: 300,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: 'n8',
							fahrtNr: null,
							name: 'N8',
							public: true,
							mode: 'bus',
							product: 'bus',
							symbol: 'N',
							nr: 8,
							metro: false,
							express: false,
							night: true
						},
						{
							type: 'line',
							id: 'n40',
							fahrtNr: null,
							name: 'N40',
							public: true,
							mode: 'bus',
							product: 'bus',
							symbol: 'N',
							nr: 40,
							metro: false,
							express: false,
							night: true
						},
						{
							type: 'line',
							id: 'n65',
							fahrtNr: null,
							name: 'N65',
							public: true,
							mode: 'bus',
							product: 'bus',
							symbol: 'N',
							nr: 65,
							metro: false,
							express: false,
							night: true
						}
					]
				},
				arrival: null,
				plannedArrival: null,
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: '2019-08-19T20:30:00+02:00',
				plannedDeparture: '2019-08-19T20:30:00+02:00',
				departureDelay: 0,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000100705',
					name: 'S+U Alexanderplatz [U8]',
					location: {
						type: 'location',
						id: '900100705',
						latitude: 52.521616,
						longitude: 13.412121
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:32:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000100051',
					name: 'U Weinmeisterstr.',
					location: {
						type: 'location',
						id: '900100051',
						latitude: 52.525374,
						longitude: 13.405308
					},
					products: {
						suburban: false,
						subway: true,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:34:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000100023',
					name: 'U Rosenthaler Platz',
					location: {
						type: 'location',
						id: '900100023',
						latitude: 52.529778,
						longitude: 13.401397
					},
					products: {
						suburban: false,
						subway: true,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:35:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000007110',
					name: 'U Bernauer Str.',
					location: {
						type: 'location',
						id: '900007110',
						latitude: 52.537994,
						longitude: 13.396229
					},
					products: {
						suburban: false,
						subway: true,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:37:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000007103',
					name: 'U Voltastr.',
					location: {
						type: 'location',
						id: '900007103',
						latitude: 52.541932,
						longitude: 13.393154
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:38:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000007102',
					name: 'S+U Gesundbrunnen',
					location: {
						type: 'location',
						id: '900007102',
						latitude: 52.548638,
						longitude: 13.388372
					},
					products: {
						suburban: true,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: true,
						regional: true
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:40:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000009203',
					name: 'U Pankstr.',
					location: {
						type: 'location',
						id: '900009203',
						latitude: 52.552251,
						longitude: 13.381837
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:41:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000009202',
					name: 'U Osloer Str.',
					location: {
						type: 'location',
						id: '900009202',
						latitude: 52.557105,
						longitude: 13.373279
					},
					products: {
						suburban: false,
						subway: true,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:43:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000085202',
					name: 'U Franz-Neumann-Platz (Am Schäfersee)',
					location: {
						type: 'location',
						id: '900085202',
						latitude: 52.563856,
						longitude: 13.364281
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:45:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000085203',
					name: 'U Residenzstr.',
					location: {
						type: 'location',
						id: '900085203',
						latitude: 52.570841,
						longitude: 13.360631
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:46:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000085104',
					name: 'U Paracelsus-Bad',
					location: {
						type: 'location',
						id: '900085104',
						latitude: 52.574536,
						longitude: 13.347534
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:47:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			}
		]
	},
	{
		tripId: '1|35835|39|86|19082019',
		stop: {
			type: 'stop',
			id: '900000100004',
			name: 'S+U Jannowitzbrücke',
			location: {
				type: 'location',
				id: '900100004',
				latitude: 52.515503,
				longitude: 13.418027
			},
			products: {
				suburban: true,
				subway: true,
				tram: false,
				bus: true,
				ferry: false,
				express: false,
				regional: false
			},
			lines: [
				{
					type: 'line',
					id: 's3',
					fahrtNr: null,
					name: 'S3',
					public: true,
					mode: 'train',
					product: 'suburban',
					symbol: 'S',
					nr: 3,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: 's5',
					fahrtNr: null,
					name: 'S5',
					public: true,
					mode: 'train',
					product: 'suburban',
					symbol: 'S',
					nr: 5,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: 's7',
					fahrtNr: null,
					name: 'S7',
					public: true,
					mode: 'train',
					product: 'suburban',
					symbol: 'S',
					nr: 7,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: 's9',
					fahrtNr: null,
					name: 'S9',
					public: true,
					mode: 'train',
					product: 'suburban',
					symbol: 'S',
					nr: 9,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: 's75',
					fahrtNr: null,
					name: 'S75',
					public: true,
					mode: 'train',
					product: 'suburban',
					symbol: 'S',
					nr: 75,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: 'u8',
					fahrtNr: null,
					name: 'U8',
					public: true,
					mode: 'train',
					product: 'subway',
					symbol: 'U',
					nr: 8,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: '248',
					fahrtNr: null,
					name: '248',
					public: true,
					mode: 'bus',
					product: 'bus',
					symbol: null,
					nr: 248,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: '300',
					fahrtNr: null,
					name: '300',
					public: true,
					mode: 'bus',
					product: 'bus',
					symbol: null,
					nr: 300,
					metro: false,
					express: false,
					night: false
				},
				{
					type: 'line',
					id: 'n8',
					fahrtNr: null,
					name: 'N8',
					public: true,
					mode: 'bus',
					product: 'bus',
					symbol: 'N',
					nr: 8,
					metro: false,
					express: false,
					night: true
				},
				{
					type: 'line',
					id: 'n40',
					fahrtNr: null,
					name: 'N40',
					public: true,
					mode: 'bus',
					product: 'bus',
					symbol: 'N',
					nr: 40,
					metro: false,
					express: false,
					night: true
				},
				{
					type: 'line',
					id: 'n65',
					fahrtNr: null,
					name: 'N65',
					public: true,
					mode: 'bus',
					product: 'bus',
					symbol: 'N',
					nr: 65,
					metro: false,
					express: false,
					night: true
				}
			]
		},
		when: '2019-08-19T20:31:00+02:00',
		plannedWhen: '2019-08-19T20:31:00+02:00',
		delay: 0,
		platform: '4',
		plannedPlatform: '4',
		direction: 'S Spandau',
		line: {
			type: 'line',
			id: 's9',
			fahrtNr: '27739',
			name: 'S9',
			public: true,
			mode: 'train',
			product: 'suburban',
			operator: {
				type: 'operator',
				id: 's-bahn-berlin-gmbh',
				name: 'S-Bahn Berlin GmbH'
			},
			symbol: 'S',
			nr: 9,
			metro: false,
			express: false,
			night: false
		},
		remarks: [
			{
				type: 'hint',
				code: 'bf',
				text: 'barrier-free'
			},
			{
				type: 'hint',
				code: 'FB',
				text: 'Bicycle conveyance'
			}
		],
		nextStopovers: [
			{
				stop: {
					type: 'stop',
					id: '900000100004',
					name: 'S+U Jannowitzbrücke',
					location: {
						type: 'location',
						id: '900100004',
						latitude: 52.515503,
						longitude: 13.418027
					},
					products: {
						suburban: true,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					},
					lines: [
						{
							type: 'line',
							id: 's3',
							fahrtNr: null,
							name: 'S3',
							public: true,
							mode: 'train',
							product: 'suburban',
							symbol: 'S',
							nr: 3,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: 's5',
							fahrtNr: null,
							name: 'S5',
							public: true,
							mode: 'train',
							product: 'suburban',
							symbol: 'S',
							nr: 5,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: 's7',
							fahrtNr: null,
							name: 'S7',
							public: true,
							mode: 'train',
							product: 'suburban',
							symbol: 'S',
							nr: 7,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: 's9',
							fahrtNr: null,
							name: 'S9',
							public: true,
							mode: 'train',
							product: 'suburban',
							symbol: 'S',
							nr: 9,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: 's75',
							fahrtNr: null,
							name: 'S75',
							public: true,
							mode: 'train',
							product: 'suburban',
							symbol: 'S',
							nr: 75,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: 'u8',
							fahrtNr: null,
							name: 'U8',
							public: true,
							mode: 'train',
							product: 'subway',
							symbol: 'U',
							nr: 8,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: '248',
							fahrtNr: null,
							name: '248',
							public: true,
							mode: 'bus',
							product: 'bus',
							symbol: null,
							nr: 248,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: '300',
							fahrtNr: null,
							name: '300',
							public: true,
							mode: 'bus',
							product: 'bus',
							symbol: null,
							nr: 300,
							metro: false,
							express: false,
							night: false
						},
						{
							type: 'line',
							id: 'n8',
							fahrtNr: null,
							name: 'N8',
							public: true,
							mode: 'bus',
							product: 'bus',
							symbol: 'N',
							nr: 8,
							metro: false,
							express: false,
							night: true
						},
						{
							type: 'line',
							id: 'n40',
							fahrtNr: null,
							name: 'N40',
							public: true,
							mode: 'bus',
							product: 'bus',
							symbol: 'N',
							nr: 40,
							metro: false,
							express: false,
							night: true
						},
						{
							type: 'line',
							id: 'n65',
							fahrtNr: null,
							name: 'N65',
							public: true,
							mode: 'bus',
							product: 'bus',
							symbol: 'N',
							nr: 65,
							metro: false,
							express: false,
							night: true
						}
					]
				},
				arrival: null,
				plannedArrival: null,
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: '2019-08-19T20:31:00+02:00',
				plannedDeparture: '2019-08-19T20:31:00+02:00',
				departureDelay: 0,
				departurePlatform: '4',
				plannedDeparturePlatform: '4'
			},
			{
				stop: {
					type: 'stop',
					id: '900000100003',
					name: 'S+U Alexanderplatz',
					location: {
						type: 'location',
						id: '900100003',
						latitude: 52.521508,
						longitude: 13.411267
					},
					products: {
						suburban: true,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: true
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:32:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000100002',
					name: 'S Hackescher Markt',
					location: {
						type: 'location',
						id: '900100002',
						latitude: 52.522605,
						longitude: 13.402359
					},
					products: {
						suburban: true,
						subway: false,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:34:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000100001',
					name: 'S+U Friedrichstr.',
					location: {
						type: 'location',
						id: '900100001',
						latitude: 52.520268,
						longitude: 13.387149
					},
					products: {
						suburban: true,
						subway: true,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: true
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:36:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000003201',
					name: 'S+U Berlin Hauptbahnhof',
					location: {
						type: 'location',
						id: '900003201',
						latitude: 52.52585,
						longitude: 13.368928
					},
					products: {
						suburban: true,
						subway: true,
						tram: true,
						bus: true,
						ferry: false,
						express: true,
						regional: true
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:39:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000003102',
					name: 'S Bellevue',
					location: {
						type: 'location',
						id: '900003102',
						latitude: 52.520016,
						longitude: 13.348073
					},
					products: {
						suburban: true,
						subway: false,
						tram: false,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:42:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000003103',
					name: 'S Tiergarten',
					location: {
						type: 'location',
						id: '900003103',
						latitude: 52.513957,
						longitude: 13.336244
					},
					products: {
						suburban: true,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:44:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000023201',
					name: 'S+U Zoologischer Garten',
					location: {
						type: 'location',
						id: '900023201',
						latitude: 52.506919,
						longitude: 13.332711
					},
					products: {
						suburban: true,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: true,
						regional: true
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:46:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000024203',
					name: 'S Savignyplatz',
					location: {
						type: 'location',
						id: '900024203',
						latitude: 52.50522,
						longitude: 13.319002
					},
					products: {
						suburban: true,
						subway: false,
						tram: false,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:48:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000024101',
					name: 'S Charlottenburg',
					location: {
						type: 'location',
						id: '900024101',
						latitude: 52.504806,
						longitude: 13.303846
					},
					products: {
						suburban: true,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: true,
						regional: true
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:50:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000024102',
					name: 'S Westkreuz',
					location: {
						type: 'location',
						id: '900024102',
						latitude: 52.501148,
						longitude: 13.283036
					},
					products: {
						suburban: true,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:52:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000025423',
					name: 'S Messe Süd',
					location: {
						type: 'location',
						id: '900025423',
						latitude: 52.498774,
						longitude: 13.270451
					},
					products: {
						suburban: true,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:54:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000026105',
					name: 'S Heerstr.',
					location: {
						type: 'location',
						id: '900026105',
						latitude: 52.508276,
						longitude: 13.258514
					},
					products: {
						suburban: true,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:57:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000025321',
					name: 'S Olympiastadion',
					location: {
						type: 'location',
						id: '900025321',
						latitude: 52.511296,
						longitude: 13.24281
					},
					products: {
						suburban: true,
						subway: false,
						tram: false,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T20:59:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000025424',
					name: 'S Pichelsberg',
					location: {
						type: 'location',
						id: '900025424',
						latitude: 52.510263,
						longitude: 13.227195
					},
					products: {
						suburban: true,
						subway: false,
						tram: false,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T21:01:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000030202',
					name: 'S Stresow',
					location: {
						type: 'location',
						id: '900030202',
						latitude: 52.532502,
						longitude: 13.209127
					},
					products: {
						suburban: true,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T21:05:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			},
			{
				stop: {
					type: 'stop',
					id: '900000029101',
					name: 'S Spandau',
					location: {
						type: 'location',
						id: '900029101',
						latitude: 52.534794,
						longitude: 13.197477
					},
					products: {
						suburban: true,
						subway: false,
						tram: false,
						bus: false,
						ferry: false,
						express: true,
						regional: true
					}
				},
				arrival: null,
				plannedArrival: '2019-08-19T21:07:00+02:00',
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null
			}
		]
	}
]
