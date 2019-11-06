'use strict'

module.exports = {
	type: 'journey',
	legs: [{
		origin: {
			type: 'location',
			id: '900980968',
			latitude: 52.521769,
			longitude: 13.395231,
			name: 'Berlin, Bodemuseum',
			poi: true
		},
		destination: {
			type: 'stop',
			id: '900000100007',
			name: 'S Oranienburger Str.',
			location: {
				type: 'location',
				id: '900100007',
				latitude: 52.525158,
				longitude: 13.393064
			},
			products: {
				suburban: true,
				subway: false,
				tram: true,
				bus: false,
				ferry: false,
				express: false,
				regional: false
			}
		},
		arrival: '2019-08-18T14:16:00+02:00',
		plannedArrival: '2019-08-18T14:16:00+02:00',
		arrivalDelay: null,
		departure: '2019-08-18T14:06:00+02:00',
		plannedDeparture: '2019-08-18T14:06:00+02:00',
		departureDelay: null,
		public: true,
		walking: true,
		distance: 568
	}, {
		origin: {
			type: 'stop',
			id: '900000100007',
			name: 'S Oranienburger Str.',
			location: {
				type: 'location',
				id: '900100007',
				latitude: 52.525158,
				longitude: 13.393064
			},
			products: {
				suburban: true,
				subway: false,
				tram: true,
				bus: false,
				ferry: false,
				express: false,
				regional: false
			}
		},
		destination: {
			type: 'stop',
			id: '900000058101',
			name: 'S Südkreuz',
			location: {
				type: 'location',
				id: '900058101',
				latitude: 52.475465,
				longitude: 13.365575
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
		arrival: '2019-08-18T14:29:00+02:00',
		plannedArrival: '2019-08-18T14:29:00+02:00',
		arrivalDelay: 0,
		departure: '2019-08-18T14:16:00+02:00',
		plannedDeparture: '2019-08-18T14:16:00+02:00',
		departureDelay: 0,
		reachable: true,
		polyline: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: {
						type: 'stop',
						id: '900000100007',
						name: 'S Oranienburger Str.',
						location: {
							type: 'location',
							id: '900100007',
							latitude: 52.525158,
							longitude: 13.393064
						},
						products: {
							suburban: true,
							subway: false,
							tram: true,
							bus: false,
							ferry: false,
							express: false,
							regional: false
						}
					},
					geometry: {
						type: 'Point',
						coordinates: [
							13.39306,
							52.52516
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.39176,
							52.52284
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.39023,
							52.52216
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.38866,
							52.52195
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.38798,
							52.52174
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.38744,
							52.52141
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.38651,
							52.5206
						]
					}
				},
				{
					type: 'Feature',
					properties: {
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
					geometry: {
						type: 'Point',
						coordinates: [
							13.38715,
							52.52027
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.38635,
							52.52049
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.38537,
							52.51974
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.38567,
							52.51785
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.3855,
							52.51745
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.38497,
							52.51691
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.38444,
							52.51665
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.38399,
							52.51657
						]
					}
				},
				{
					type: 'Feature',
					properties: {
						type: 'stop',
						id: '900000100025',
						name: 'S+U Brandenburger Tor',
						location: {
							type: 'location',
							id: '900100025',
							latitude: 52.51651,
							longitude: 13.381936
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
					geometry: {
						type: 'Point',
						coordinates: [
							13.38194,
							52.51651
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.38178,
							52.51643
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.37888,
							52.51623
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.37831,
							52.51609
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.37768,
							52.51576
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.37714,
							52.51313
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.37669,
							52.51024
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.3767,
							52.50949
						]
					}
				},
				{
					type: 'Feature',
					properties: {
						type: 'stop',
						id: '900000100020',
						name: 'S+U Potsdamer Platz',
						location: {
							type: 'location',
							id: '900100020',
							latitude: 52.509337,
							longitude: 13.376452
						},
						products: {
							suburban: true,
							subway: false,
							tram: false,
							bus: false,
							ferry: false,
							express: false,
							regional: true
						}
					},
					geometry: {
						type: 'Point',
						coordinates: [
							13.37645,
							52.50934
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.37686,
							52.50873
						]
					}
				},
				{
					type: 'Feature',
					properties: {
						type: 'stop',
						id: '900000012101',
						name: 'S Anhalter Bahnhof',
						location: {
							type: 'location',
							id: '900012101',
							latitude: 52.504537,
							longitude: 13.38208
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
					geometry: {
						type: 'Point',
						coordinates: [
							13.38208,
							52.50454
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.38181,
							52.5046
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.37956,
							52.50099
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.37902,
							52.50004
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.37814,
							52.49942
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.37639,
							52.4987
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.37493,
							52.49795
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.37338,
							52.49679
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.37287,
							52.49597
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.37242,
							52.49468
						]
					}
				},
				{
					type: 'Feature',
					properties: {
						type: 'stop',
						id: '900000058103',
						name: 'S+U Yorckstr. S2 S25 S26 U7',
						location: {
							type: 'location',
							id: '900058103',
							latitude: 52.49232,
							longitude: 13.372227
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
					geometry: {
						type: 'Point',
						coordinates: [
							13.37223,
							52.49232
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.37207,
							52.49233
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.37186,
							52.48857
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.37121,
							52.48667
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.36503,
							52.47612
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.36524,
							52.476
						]
					}
				},
				{
					type: 'Feature',
					properties: {
						type: 'stop',
						id: '900000058101',
						name: 'S Südkreuz',
						location: {
							type: 'location',
							id: '900058101',
							latitude: 52.475465,
							longitude: 13.365575
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
					geometry: {
						type: 'Point',
						coordinates: [
							13.36558,
							52.47547
						]
					}
				}
			]
		},
		tripId: '1|32794|20|86|18082019',
		line: {
			type: 'line',
			id: 's2',
			fahrtNr: '14825',
			name: 'S2',
			public: true,
			mode: 'train',
			product: 'suburban',
			operator: {
				type: 'operator',
				id: 's-bahn-berlin-gmbh',
				name: 'S-Bahn Berlin GmbH'
			},
			symbol: 'S',
			nr: 2,
			metro: false,
			express: false,
			night: false
		},
		direction: 'S Blankenfelde (TF)',
		arrivalPlatform: '1',
		plannedArrivalPlatform: '1',
		departurePlatform: '1',
		plannedDeparturePlatform: '1',
		stopovers: [{
			stop: {
				type: 'stop',
				id: '900000100007',
				name: 'S Oranienburger Str.',
				location: {
					type: 'location',
					id: '900100007',
					latitude: 52.525158,
					longitude: 13.393064
				},
				products: {
					suburban: true,
					subway: false,
					tram: true,
					bus: false,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: null,
			plannedArrival: null,
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			departure: '2019-08-18T14:16:00+02:00',
			plannedDeparture: '2019-08-18T14:16:00+02:00',
			departureDelay: 0,
			departurePlatform: '1',
			plannedDeparturePlatform: '1'
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
			arrival: '2019-08-18T14:18:00+02:00',
			plannedArrival: '2019-08-18T14:18:00+02:00',
			arrivalDelay: 0,
			arrivalPlatform: '11',
			plannedArrivalPlatform: '11',
			departure: '2019-08-18T14:18:00+02:00',
			plannedDeparture: '2019-08-18T14:18:00+02:00',
			departureDelay: 0,
			departurePlatform: '11',
			plannedDeparturePlatform: '11'
		},
		{
			stop: {
				type: 'stop',
				id: '900000100025',
				name: 'S+U Brandenburger Tor',
				location: {
					type: 'location',
					id: '900100025',
					latitude: 52.51651,
					longitude: 13.381936
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
			arrival: '2019-08-18T14:19:00+02:00',
			plannedArrival: '2019-08-18T14:19:00+02:00',
			arrivalDelay: 0,
			arrivalPlatform: '1',
			plannedArrivalPlatform: '1',
			departure: '2019-08-18T14:20:00+02:00',
			plannedDeparture: '2019-08-18T14:20:00+02:00',
			departureDelay: 0,
			departurePlatform: '1',
			plannedDeparturePlatform: '1'
		},
		{
			stop: {
				type: 'stop',
				id: '900000100020',
				name: 'S+U Potsdamer Platz',
				location: {
					type: 'location',
					id: '900100020',
					latitude: 52.509337,
					longitude: 13.376452
				},
				products: {
					suburban: true,
					subway: false,
					tram: false,
					bus: false,
					ferry: false,
					express: false,
					regional: true
				}
			},
			arrival: '2019-08-18T14:21:00+02:00',
			plannedArrival: '2019-08-18T14:21:00+02:00',
			arrivalDelay: 0,
			arrivalPlatform: '11',
			plannedArrivalPlatform: '11',
			departure: '2019-08-18T14:22:00+02:00',
			plannedDeparture: '2019-08-18T14:22:00+02:00',
			departureDelay: 0,
			departurePlatform: '11',
			plannedDeparturePlatform: '11'
		},
		{
			stop: {
				type: 'stop',
				id: '900000012101',
				name: 'S Anhalter Bahnhof',
				location: {
					type: 'location',
					id: '900012101',
					latitude: 52.504537,
					longitude: 13.38208
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
			arrival: '2019-08-18T14:24:00+02:00',
			plannedArrival: '2019-08-18T14:24:00+02:00',
			arrivalDelay: 0,
			arrivalPlatform: '2',
			plannedArrivalPlatform: '2',
			departure: '2019-08-18T14:24:00+02:00',
			plannedDeparture: '2019-08-18T14:24:00+02:00',
			departureDelay: 0,
			departurePlatform: '2',
			plannedDeparturePlatform: '2'
		},
		{
			stop: {
				type: 'stop',
				id: '900000058103',
				name: 'S+U Yorckstr. S2 S25 S26 U7',
				location: {
					type: 'location',
					id: '900058103',
					latitude: 52.49232,
					longitude: 13.372227
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
			arrival: '2019-08-18T14:26:00+02:00',
			plannedArrival: '2019-08-18T14:26:00+02:00',
			arrivalDelay: 0,
			arrivalPlatform: '1',
			plannedArrivalPlatform: '1',
			departure: '2019-08-18T14:27:00+02:00',
			plannedDeparture: '2019-08-18T14:27:00+02:00',
			departureDelay: 0,
			departurePlatform: '1',
			plannedDeparturePlatform: '1'
		},
		{
			stop: {
				type: 'stop',
				id: '900000058101',
				name: 'S Südkreuz',
				location: {
					type: 'location',
					id: '900058101',
					latitude: 52.475465,
					longitude: 13.365575
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
			arrival: '2019-08-18T14:29:00+02:00',
			plannedArrival: '2019-08-18T14:29:00+02:00',
			arrivalDelay: 0,
			arrivalPlatform: '1',
			plannedArrivalPlatform: '1',
			departure: null,
			plannedDeparture: null,
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null
		}],
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
		cycle: {
			min: 300,
			max: 600,
			nr: 19
		}
	}],
	refreshToken: '¶HKI¶G@F$A=4@O=Berlin, Bodemuseum@X=13395231@Y=52521769@L=900980968@a=128@$A=1@O=S Oranienburger Str. (Berlin)@L=900100007@a=128@$201908181406$201908181416$$$1$§T$A=1@O=S Oranienburger Str. (Berlin)@L=900100007@a=128@$A=1@O=S Südkreuz Bhf (Berlin)@L=900058101@a=128@$201908181416$201908181429$      S2$$1$¶GP¶ft@0@2000@120@-1@100@1@1000@0@@@@@false@0@-1@$f@$f@$f@$f@$f@$§bt@0@2000@120@-1@100@1@1000@0@@@@@false@0@-1@$f@$f@$f@$f@$f@$§tf@$f@$f@$f@$f@$f@$§',
	cycle: {
		min: 300
	},
	scheduledDays: {
		'2019-01-01': true,
		'2019-01-02': true,
		'2019-01-03': true,
		'2019-01-04': true,
		'2019-01-05': true,
		'2019-01-06': true,
		'2019-01-07': true,
		'2019-01-08': true,
		'2019-01-09': true,
		'2019-01-10': true,
		'2019-01-11': true,
		'2019-01-12': true,
		'2019-01-13': true,
		'2019-01-14': true,
		'2019-01-15': true,
		'2019-01-16': true,
		'2019-01-17': true,
		'2019-01-18': true,
		'2019-01-19': true,
		'2019-01-20': true,
		'2019-01-21': true,
		'2019-01-22': true,
		'2019-01-23': true,
		'2019-01-24': true,
		'2019-01-25': true,
		'2019-01-26': true,
		'2019-01-27': true,
		'2019-01-28': true,
		'2019-01-29': true,
		'2019-01-30': true,
		'2019-01-31': true,
		'2019-02-01': true,
		'2019-02-02': true,
		'2019-02-03': true,
		'2019-02-04': true,
		'2019-02-05': true,
		'2019-02-06': true,
		'2019-02-07': true,
		'2019-02-08': true,
		'2019-02-09': true,
		'2019-02-10': true,
		'2019-02-11': true,
		'2019-02-12': true,
		'2019-02-13': true,
		'2019-02-14': true,
		'2019-02-15': true,
		'2019-02-16': true,
		'2019-02-17': true,
		'2019-02-18': true,
		'2019-02-19': true,
		'2019-02-20': true,
		'2019-02-21': true,
		'2019-02-22': true,
		'2019-02-23': true,
		'2019-02-24': true,
		'2019-02-25': true,
		'2019-02-26': true,
		'2019-02-27': true,
		'2019-02-28': true,
		'2019-03-01': true,
		'2019-03-02': true,
		'2019-03-03': true,
		'2019-03-04': true,
		'2019-03-05': true,
		'2019-03-06': true,
		'2019-03-07': true,
		'2019-03-08': true,
		'2019-03-09': true,
		'2019-03-10': true,
		'2019-03-11': true,
		'2019-03-12': true,
		'2019-03-13': true,
		'2019-03-14': true,
		'2019-03-15': true,
		'2019-03-16': true,
		'2019-03-17': true,
		'2019-03-18': true,
		'2019-03-19': true,
		'2019-03-20': false,
		'2019-03-21': false,
		'2019-03-22': false,
		'2019-03-23': false,
		'2019-03-24': false,
		'2019-03-25': false,
		'2019-03-26': false,
		'2019-03-27': false,
		'2019-03-28': false,
		'2019-03-29': false,
		'2019-03-30': false,
		'2019-03-31': false,
		'2019-04-01': false,
		'2019-04-02': false,
		'2019-04-03': false,
		'2019-04-04': false,
		'2019-04-05': false,
		'2019-04-06': false,
		'2019-04-07': false,
		'2019-04-08': false,
		'2019-04-09': false,
		'2019-04-10': false,
		'2019-04-11': false,
		'2019-04-12': false,
		'2019-04-13': false,
		'2019-04-14': false,
		'2019-04-15': false,
		'2019-04-16': false,
		'2019-04-17': false,
		'2019-04-18': false,
		'2019-04-19': false,
		'2019-04-20': false,
		'2019-04-21': false,
		'2019-04-22': false,
		'2019-04-23': false,
		'2019-04-24': false,
		'2019-04-25': false,
		'2019-04-26': false,
		'2019-04-27': false,
		'2019-04-28': false,
		'2019-04-29': false,
		'2019-04-30': false,
		'2019-05-01': false,
		'2019-05-02': false,
		'2019-05-03': false,
		'2019-05-04': false,
		'2019-05-05': false,
		'2019-05-06': true,
		'2019-05-07': false,
		'2019-05-08': false
	}
}
