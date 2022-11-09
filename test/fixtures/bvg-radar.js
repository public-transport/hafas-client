const bvgRadar = [
	{
		direction: 'Hohenschönhausen, Zingster Str.',
		tripId: '1|57637|1|86|19082019',
		line: {
			type: 'line',
			id: 'm4',
			fahrtNr: null,
			name: 'M4',
			public: true,
			mode: 'train',
			product: 'tram',
		},
		location: {
			type: 'location',
			latitude: 52.52211,
			longitude: 13.414728
		},
		nextStopovers: [
			{
				stop: {
					type: 'stop',
					id: '900100002',
					name: 'S Hackescher Markt (Berlin)',
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
				plannedArrival: null,
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:26:00+02:00',
				plannedDeparture: '2019-08-19T20:26:00+02:00',
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900100026',
					name: 'S+U Alexanderplatz Bhf/Gontardstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100026',
						latitude: 52.521059,
						longitude: 13.41125
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: '2019-08-19T20:30:00+02:00',
				plannedArrival: '2019-08-19T20:29:00+02:00',
				arrivalDelay: 60,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:30:00+02:00',
				plannedDeparture: '2019-08-19T20:29:00+02:00',
				departureDelay: 60,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900100005',
					name: 'U Alexanderplatz (Berlin) [Tram]',
					location: {
						type: 'location',
						id: '900100005',
						latitude: 52.522389,
						longitude: 13.414495
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: '2019-08-19T20:34:00+02:00',
				plannedArrival: '2019-08-19T20:31:00+02:00',
				arrivalDelay: 180,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:34:00+02:00',
				plannedDeparture: '2019-08-19T20:31:00+02:00',
				departureDelay: 180,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900151003',
					name: 'Zingster Str. (Berlin)',
					location: {
						type: 'location',
						id: '900151003',
						latitude: 52.57236,
						longitude: 13.495164
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: '2019-08-19T21:01:00+02:00',
				plannedArrival: '2019-08-19T20:58:00+02:00',
				arrivalDelay: 180,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			}
		],
		frames: [
			{
				origin: {
					type: 'stop',
					id: '900100026',
					name: 'S+U Alexanderplatz Bhf/Gontardstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100026',
						latitude: 52.521059,
						longitude: 13.41125
					},
					products: {
						suburban: false,
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
					id: '900100005',
					name: 'U Alexanderplatz (Berlin) [Tram]',
					location: {
						type: 'location',
						id: '900100005',
						latitude: 52.522389,
						longitude: 13.414495
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				t: 0
			},
			{
				origin: {
					type: 'stop',
					id: '900100026',
					name: 'S+U Alexanderplatz Bhf/Gontardstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100026',
						latitude: 52.521059,
						longitude: 13.41125
					},
					products: {
						suburban: false,
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
					id: '900100005',
					name: 'U Alexanderplatz (Berlin) [Tram]',
					location: {
						type: 'location',
						id: '900100005',
						latitude: 52.522389,
						longitude: 13.414495
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				t: 10000
			},
			{
				origin: {
					type: 'stop',
					id: '900100026',
					name: 'S+U Alexanderplatz Bhf/Gontardstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100026',
						latitude: 52.521059,
						longitude: 13.41125
					},
					products: {
						suburban: false,
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
					id: '900100005',
					name: 'U Alexanderplatz (Berlin) [Tram]',
					location: {
						type: 'location',
						id: '900100005',
						latitude: 52.522389,
						longitude: 13.414495
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				t: 20000
			},
			{
				origin: {
					type: 'stop',
					id: '900100026',
					name: 'S+U Alexanderplatz Bhf/Gontardstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100026',
						latitude: 52.521059,
						longitude: 13.41125
					},
					products: {
						suburban: false,
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
					id: '900100005',
					name: 'U Alexanderplatz (Berlin) [Tram]',
					location: {
						type: 'location',
						id: '900100005',
						latitude: 52.522389,
						longitude: 13.414495
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				t: 30000
			}
		],
		polyline: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41473,
							52.52211
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.4149,
							52.52222
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41507,
							52.52234
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.4151,
							52.52236
						]
					}
				}
			]
		}
	},
	{
		direction: 'S Spandau Bhf (Berlin)',
		tripId: '1|35835|39|86|19082019',
		line: {
			type: 'line',
			id: 's9',
			fahrtNr: null,
			name: 'S9',
			public: true,
			mode: 'train',
			product: 'suburban',
		},
		location: {
			type: 'location',
			latitude: 52.521877,
			longitude: 13.410899
		},
		nextStopovers: [
			{
				stop: {
					type: 'stop',
					id: '900260005',
					name: 'S Flughafen Berlin-Schönefeld Bhf',
					location: {
						type: 'location',
						id: '900260005',
						latitude: 52.390796,
						longitude: 13.51352
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
				plannedArrival: null,
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T19:57:00+02:00',
				plannedDeparture: '2019-08-19T19:57:00+02:00',
				departureDelay: 0,
				departurePlatform: '13',
				plannedDeparturePlatform: '13',
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900100003',
					name: 'S+U Alexanderplatz Bhf (Berlin)',
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
				arrival: '2019-08-19T20:32:00+02:00',
				plannedArrival: '2019-08-19T20:32:00+02:00',
				arrivalDelay: 0,
				arrivalPlatform: '4',
				plannedArrivalPlatform: '4',
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:33:00+02:00',
				plannedDeparture: '2019-08-19T20:33:00+02:00',
				departureDelay: 0,
				departurePlatform: '4',
				plannedDeparturePlatform: '4',
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900100002',
					name: 'S Hackescher Markt (Berlin)',
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
				arrival: '2019-08-19T20:34:00+02:00',
				plannedArrival: '2019-08-19T20:34:00+02:00',
				arrivalDelay: 0,
				arrivalPlatform: '4',
				plannedArrivalPlatform: '4',
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:35:00+02:00',
				plannedDeparture: '2019-08-19T20:35:00+02:00',
				departureDelay: 0,
				departurePlatform: '4',
				plannedDeparturePlatform: '4',
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900029101',
					name: 'S Spandau Bhf (Berlin)',
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
				arrival: '2019-08-19T21:07:00+02:00',
				plannedArrival: '2019-08-19T21:07:00+02:00',
				arrivalDelay: 0,
				arrivalPlatform: '2',
				plannedArrivalPlatform: '2',
				arrivalPrognosisType: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			}
		],
		frames: [
			{
				origin: {
					type: 'stop',
					id: '900100003',
					name: 'S+U Alexanderplatz Bhf (Berlin)',
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
				destination: {
					type: 'stop',
					id: '900100002',
					name: 'S Hackescher Markt (Berlin)',
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
				t: 0
			},
			{
				origin: {
					type: 'stop',
					id: '900100003',
					name: 'S+U Alexanderplatz Bhf (Berlin)',
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
				destination: {
					type: 'stop',
					id: '900100002',
					name: 'S Hackescher Markt (Berlin)',
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
				t: 10000
			},
			{
				origin: {
					type: 'stop',
					id: '900100003',
					name: 'S+U Alexanderplatz Bhf (Berlin)',
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
				destination: {
					type: 'stop',
					id: '900100002',
					name: 'S Hackescher Markt (Berlin)',
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
				t: 20000
			},
			{
				origin: {
					type: 'stop',
					id: '900100003',
					name: 'S+U Alexanderplatz Bhf (Berlin)',
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
				destination: {
					type: 'stop',
					id: '900100002',
					name: 'S Hackescher Markt (Berlin)',
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
				t: 30000
			}
		],
		polyline: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.4109,
							52.52188
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.40921,
							52.52268
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.40738,
							52.5233
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.40532,
							52.52338
						]
					}
				}
			]
		}
	},
	{
		direction: 'S+U Hermannstr. (Berlin)',
		tripId: '1|31029|0|86|19082019',
		line: {
			type: 'line',
			id: 'u8',
			fahrtNr: null,
			name: 'U8',
			public: true,
			mode: 'train',
			product: 'subway',
		},
		location: {
			type: 'location',
			latitude: 52.52096,
			longitude: 13.412652
		},
		nextStopovers: [
			{
				stop: {
					type: 'stop',
					id: '900085104',
					name: 'U Paracelsus-Bad (Berlin)',
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
				plannedArrival: null,
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:17:00+02:00',
				plannedDeparture: '2019-08-19T20:17:00+02:00',
				departureDelay: 0,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900100705',
					name: 'S+U Alexanderplatz (Berlin) [U8]',
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
				arrival: '2019-08-19T20:33:00+02:00',
				plannedArrival: '2019-08-19T20:33:00+02:00',
				arrivalDelay: 0,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:33:00+02:00',
				plannedDeparture: '2019-08-19T20:33:00+02:00',
				departureDelay: 0,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900100004',
					name: 'S+U Jannowitzbrücke (Berlin)',
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
					}
				},
				arrival: '2019-08-19T20:35:00+02:00',
				plannedArrival: '2019-08-19T20:35:00+02:00',
				arrivalDelay: 0,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:35:00+02:00',
				plannedDeparture: '2019-08-19T20:35:00+02:00',
				departureDelay: 0,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900079221',
					name: 'S+U Hermannstr. (Berlin)',
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
				arrival: '2019-08-19T20:47:00+02:00',
				plannedArrival: '2019-08-19T20:47:00+02:00',
				arrivalDelay: 0,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			}
		],
		frames: [
			{
				origin: {
					type: 'stop',
					id: '900100705',
					name: 'S+U Alexanderplatz (Berlin) [U8]',
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
				destination: {
					type: 'stop',
					id: '900100004',
					name: 'S+U Jannowitzbrücke (Berlin)',
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
					}
				},
				t: 0
			},
			{
				origin: {
					type: 'stop',
					id: '900100705',
					name: 'S+U Alexanderplatz (Berlin) [U8]',
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
				destination: {
					type: 'stop',
					id: '900100004',
					name: 'S+U Jannowitzbrücke (Berlin)',
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
					}
				},
				t: 10000
			},
			{
				origin: {
					type: 'stop',
					id: '900100705',
					name: 'S+U Alexanderplatz (Berlin) [U8]',
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
				destination: {
					type: 'stop',
					id: '900100004',
					name: 'S+U Jannowitzbrücke (Berlin)',
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
					}
				},
				t: 20000
			},
			{
				origin: {
					type: 'stop',
					id: '900100705',
					name: 'S+U Alexanderplatz (Berlin) [U8]',
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
				destination: {
					type: 'stop',
					id: '900100004',
					name: 'S+U Jannowitzbrücke (Berlin)',
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
					}
				},
				t: 30000
			}
		],
		polyline: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41265,
							52.52096
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41286,
							52.5208
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41352,
							52.52026
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41423,
							52.51976
						]
					}
				}
			]
		}
	},
	{
		direction: 'S+U Alexanderplatz',
		tripId: '1|30336|6|86|19082019',
		line: {
			type: 'line',
			id: 'u5',
			fahrtNr: null,
			name: 'U5',
			public: true,
			mode: 'train',
			product: 'subway',
		},
		location: {
			type: 'location',
			latitude: 52.522182,
			longitude: 13.415394
		},
		nextStopovers: [
			{
				stop: {
					type: 'stop',
					id: '900175004',
					name: 'U Kaulsdorf-Nord (Berlin)',
					location: {
						type: 'location',
						id: '900175004',
						latitude: 52.521436,
						longitude: 13.588759
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
				plannedArrival: null,
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:08:00+02:00',
				plannedDeparture: '2019-08-19T20:08:00+02:00',
				departureDelay: 0,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900100017',
					name: 'U Schillingstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100017',
						latitude: 52.520313,
						longitude: 13.421893
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
				arrival: '2019-08-19T20:31:00+02:00',
				plannedArrival: '2019-08-19T20:32:00+02:00',
				arrivalDelay: -60,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:31:00+02:00',
				plannedDeparture: '2019-08-19T20:32:00+02:00',
				departureDelay: -60,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900100704',
					name: 'S+U Alexanderplatz (Berlin) [U5]',
					location: {
						type: 'location',
						id: '900100704',
						latitude: 52.521607,
						longitude: 13.41311
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
				arrival: '2019-08-19T20:34:00+02:00',
				plannedArrival: '2019-08-19T20:34:00+02:00',
				arrivalDelay: 0,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900100704',
					name: 'S+U Alexanderplatz (Berlin) [U5]',
					location: {
						type: 'location',
						id: '900100704',
						latitude: 52.521607,
						longitude: 13.41311
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
				arrival: '2019-08-19T20:34:00+02:00',
				plannedArrival: '2019-08-19T20:34:00+02:00',
				arrivalDelay: 0,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			}
		],
		frames: [
			{
				origin: {
					type: 'stop',
					id: '900100017',
					name: 'U Schillingstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100017',
						latitude: 52.520313,
						longitude: 13.421893
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
				destination: {
					type: 'stop',
					id: '900100704',
					name: 'S+U Alexanderplatz (Berlin) [U5]',
					location: {
						type: 'location',
						id: '900100704',
						latitude: 52.521607,
						longitude: 13.41311
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
				t: 0
			},
			{
				origin: {
					type: 'stop',
					id: '900100017',
					name: 'U Schillingstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100017',
						latitude: 52.520313,
						longitude: 13.421893
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
				destination: {
					type: 'stop',
					id: '900100704',
					name: 'S+U Alexanderplatz (Berlin) [U5]',
					location: {
						type: 'location',
						id: '900100704',
						latitude: 52.521607,
						longitude: 13.41311
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
				t: 10000
			},
			{
				origin: {
					type: 'stop',
					id: '900100017',
					name: 'U Schillingstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100017',
						latitude: 52.520313,
						longitude: 13.421893
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
				destination: {
					type: 'stop',
					id: '900100704',
					name: 'S+U Alexanderplatz (Berlin) [U5]',
					location: {
						type: 'location',
						id: '900100704',
						latitude: 52.521607,
						longitude: 13.41311
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
				t: 20000
			},
			{
				origin: {
					type: 'stop',
					id: '900100017',
					name: 'U Schillingstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100017',
						latitude: 52.520313,
						longitude: 13.421893
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
				destination: {
					type: 'stop',
					id: '900100704',
					name: 'S+U Alexanderplatz (Berlin) [U5]',
					location: {
						type: 'location',
						id: '900100704',
						latitude: 52.521607,
						longitude: 13.41311
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
				t: 30000
			}
		],
		polyline: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41539,
							52.52218
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41487,
							52.52201
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41439,
							52.5218
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41389,
							52.52159
						]
					}
				}
			]
		}
	},
	{
		direction: 'S+U Pankow (Berlin)',
		tripId: '1|30095|5|86|19082019',
		line: {
			type: 'line',
			id: 'u2',
			fahrtNr: null,
			name: 'U2',
			public: true,
			mode: 'train',
			product: 'subway',
		},
		location: {
			type: 'location',
			latitude: 52.520043,
			longitude: 13.413506
		},
		nextStopovers: [
			{
				stop: {
					type: 'stop',
					id: '900026201',
					name: 'U Theodor-Heuss-Platz (Berlin)',
					location: {
						type: 'location',
						id: '900026201',
						latitude: 52.509795,
						longitude: 13.272977
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
				plannedArrival: null,
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:04:00+02:00',
				plannedDeparture: '2019-08-19T20:04:00+02:00',
				departureDelay: 0,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900100015',
					name: 'U Klosterstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100015',
						latitude: 52.517229,
						longitude: 13.412454
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
				arrival: '2019-08-19T20:32:00+02:00',
				plannedArrival: '2019-08-19T20:31:00+02:00',
				arrivalDelay: 60,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:32:00+02:00',
				plannedDeparture: '2019-08-19T20:31:00+02:00',
				departureDelay: 60,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900100703',
					name: 'S+U Alexanderplatz (Berlin) [U2]',
					location: {
						type: 'location',
						id: '900100703',
						latitude: 52.522075,
						longitude: 13.413596
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
				arrival: '2019-08-19T20:34:00+02:00',
				plannedArrival: '2019-08-19T20:33:00+02:00',
				arrivalDelay: 60,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:34:00+02:00',
				plannedDeparture: '2019-08-19T20:33:00+02:00',
				departureDelay: 60,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900130002',
					name: 'S+U Pankow (Berlin)',
					location: {
						type: 'location',
						id: '900130002',
						latitude: 52.567281,
						longitude: 13.412283
					},
					products: {
						suburban: true,
						subway: true,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: '2019-08-19T20:46:00+02:00',
				plannedArrival: '2019-08-19T20:45:00+02:00',
				arrivalDelay: 60,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			}
		],
		frames: [
			{
				origin: {
					type: 'stop',
					id: '900100015',
					name: 'U Klosterstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100015',
						latitude: 52.517229,
						longitude: 13.412454
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
				destination: {
					type: 'stop',
					id: '900100703',
					name: 'S+U Alexanderplatz (Berlin) [U2]',
					location: {
						type: 'location',
						id: '900100703',
						latitude: 52.522075,
						longitude: 13.413596
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
				t: 0
			},
			{
				origin: {
					type: 'stop',
					id: '900100015',
					name: 'U Klosterstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100015',
						latitude: 52.517229,
						longitude: 13.412454
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
				destination: {
					type: 'stop',
					id: '900100703',
					name: 'S+U Alexanderplatz (Berlin) [U2]',
					location: {
						type: 'location',
						id: '900100703',
						latitude: 52.522075,
						longitude: 13.413596
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
				t: 10000
			},
			{
				origin: {
					type: 'stop',
					id: '900100015',
					name: 'U Klosterstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100015',
						latitude: 52.517229,
						longitude: 13.412454
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
				destination: {
					type: 'stop',
					id: '900100703',
					name: 'S+U Alexanderplatz (Berlin) [U2]',
					location: {
						type: 'location',
						id: '900100703',
						latitude: 52.522075,
						longitude: 13.413596
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
				t: 20000
			},
			{
				origin: {
					type: 'stop',
					id: '900100015',
					name: 'U Klosterstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100015',
						latitude: 52.517229,
						longitude: 13.412454
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
				destination: {
					type: 'stop',
					id: '900100703',
					name: 'S+U Alexanderplatz (Berlin) [U2]',
					location: {
						type: 'location',
						id: '900100703',
						latitude: 52.522075,
						longitude: 13.413596
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
				t: 30000
			}
		],
		polyline: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41351,
							52.52005
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41429,
							52.52035
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41473,
							52.52084
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41453,
							52.52139
						]
					}
				}
			]
		}
	},
	{
		direction: 'Hellersdorf, Riesaer Str.',
		tripId: '1|29455|8|86|19082019',
		line: {
			type: 'line',
			id: 'm6',
			fahrtNr: null,
			name: 'M6',
			public: true,
			mode: 'train',
			product: 'tram',
		},
		location: {
			type: 'location',
			latitude: 52.522353,
			longitude: 13.415097
		},
		nextStopovers: [
			{
				stop: {
					type: 'stop',
					id: '900100002',
					name: 'S Hackescher Markt (Berlin)',
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
				plannedArrival: null,
				arrivalDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:25:00+02:00',
				plannedDeparture: '2019-08-19T20:25:00+02:00',
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900100005',
					name: 'U Alexanderplatz (Berlin) [Tram]',
					location: {
						type: 'location',
						id: '900100005',
						latitude: 52.522389,
						longitude: 13.414495
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: '2019-08-19T20:33:00+02:00',
				plannedArrival: '2019-08-19T20:30:00+02:00',
				arrivalDelay: 180,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:33:00+02:00',
				plannedDeparture: '2019-08-19T20:30:00+02:00',
				departureDelay: 180,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900100040',
					name: 'Mollstr./Otto-Braun-Str. (Berlin)',
					location: {
						type: 'location',
						id: '900100040',
						latitude: 52.525185,
						longitude: 13.419942
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: '2019-08-19T20:36:00+02:00',
				plannedArrival: '2019-08-19T20:33:00+02:00',
				arrivalDelay: 180,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:36:00+02:00',
				plannedDeparture: '2019-08-19T20:33:00+02:00',
				departureDelay: 180,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900175013',
					name: 'Riesaer Str. (Berlin)',
					location: {
						type: 'location',
						id: '900175013',
						latitude: 52.529401,
						longitude: 13.624186
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: '2019-08-19T21:22:00+02:00',
				plannedArrival: '2019-08-19T21:19:00+02:00',
				arrivalDelay: 180,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			}
		],
		frames: [
			{
				origin: {
					type: 'stop',
					id: '900100005',
					name: 'U Alexanderplatz (Berlin) [Tram]',
					location: {
						type: 'location',
						id: '900100005',
						latitude: 52.522389,
						longitude: 13.414495
					},
					products: {
						suburban: false,
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
					id: '900100040',
					name: 'Mollstr./Otto-Braun-Str. (Berlin)',
					location: {
						type: 'location',
						id: '900100040',
						latitude: 52.525185,
						longitude: 13.419942
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				t: 0
			},
			{
				origin: {
					type: 'stop',
					id: '900100005',
					name: 'U Alexanderplatz (Berlin) [Tram]',
					location: {
						type: 'location',
						id: '900100005',
						latitude: 52.522389,
						longitude: 13.414495
					},
					products: {
						suburban: false,
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
					id: '900100040',
					name: 'Mollstr./Otto-Braun-Str. (Berlin)',
					location: {
						type: 'location',
						id: '900100040',
						latitude: 52.525185,
						longitude: 13.419942
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				t: 10000
			},
			{
				origin: {
					type: 'stop',
					id: '900100005',
					name: 'U Alexanderplatz (Berlin) [Tram]',
					location: {
						type: 'location',
						id: '900100005',
						latitude: 52.522389,
						longitude: 13.414495
					},
					products: {
						suburban: false,
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
					id: '900100040',
					name: 'Mollstr./Otto-Braun-Str. (Berlin)',
					location: {
						type: 'location',
						id: '900100040',
						latitude: 52.525185,
						longitude: 13.419942
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				t: 20000
			},
			{
				origin: {
					type: 'stop',
					id: '900100005',
					name: 'U Alexanderplatz (Berlin) [Tram]',
					location: {
						type: 'location',
						id: '900100005',
						latitude: 52.522389,
						longitude: 13.414495
					},
					products: {
						suburban: false,
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
					id: '900100040',
					name: 'Mollstr./Otto-Braun-Str. (Berlin)',
					location: {
						type: 'location',
						id: '900100040',
						latitude: 52.525185,
						longitude: 13.419942
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				t: 30000
			}
		],
		polyline: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.4151,
							52.52236
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41513,
							52.52238
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41541,
							52.52263
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41569,
							52.52286
						]
					}
				}
			]
		}
	},
	{
		direction: 'S Hackescher Markt',
		tripId: '1|29362|4|86|19082019',
		line: {
			type: 'line',
			id: 'm6',
			fahrtNr: null,
			name: 'M6',
			public: true,
			mode: 'train',
			product: 'tram',
		},
		location: {
			type: 'location',
			latitude: 52.521283,
			longitude: 13.411034
		},
		nextStopovers: [
			{
				stop: {
					type: 'stop',
					id: '900175013',
					name: 'Riesaer Str. (Berlin)',
					location: {
						type: 'location',
						id: '900175013',
						latitude: 52.529401,
						longitude: 13.624186
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: true,
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
				arrivalPrognosisType: null,
				departure: '2019-08-19T19:39:00+02:00',
				plannedDeparture: '2019-08-19T19:39:00+02:00',
				departureDelay: 0,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900100026',
					name: 'S+U Alexanderplatz Bhf/Gontardstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100026',
						latitude: 52.521059,
						longitude: 13.41125
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: '2019-08-19T20:33:00+02:00',
				plannedArrival: '2019-08-19T20:30:00+02:00',
				arrivalDelay: 180,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:33:00+02:00',
				plannedDeparture: '2019-08-19T20:30:00+02:00',
				departureDelay: 180,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900100515',
					name: 'Spandauer Str./Marienkirche (Berlin)',
					location: {
						type: 'location',
						id: '900100515',
						latitude: 52.520025,
						longitude: 13.404822
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: '2019-08-19T20:35:00+02:00',
				plannedArrival: '2019-08-19T20:32:00+02:00',
				arrivalDelay: 180,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:35:00+02:00',
				plannedDeparture: '2019-08-19T20:32:00+02:00',
				departureDelay: 180,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900100002',
					name: 'S Hackescher Markt (Berlin)',
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
				arrival: '2019-08-19T20:36:00+02:00',
				plannedArrival: '2019-08-19T20:33:00+02:00',
				arrivalDelay: 180,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			}
		],
		frames: [
			{
				origin: {
					type: 'stop',
					id: '900100026',
					name: 'S+U Alexanderplatz Bhf/Gontardstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100026',
						latitude: 52.521059,
						longitude: 13.41125
					},
					products: {
						suburban: false,
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
					id: '900100515',
					name: 'Spandauer Str./Marienkirche (Berlin)',
					location: {
						type: 'location',
						id: '900100515',
						latitude: 52.520025,
						longitude: 13.404822
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				t: 0
			},
			{
				origin: {
					type: 'stop',
					id: '900100026',
					name: 'S+U Alexanderplatz Bhf/Gontardstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100026',
						latitude: 52.521059,
						longitude: 13.41125
					},
					products: {
						suburban: false,
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
					id: '900100515',
					name: 'Spandauer Str./Marienkirche (Berlin)',
					location: {
						type: 'location',
						id: '900100515',
						latitude: 52.520025,
						longitude: 13.404822
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				t: 10000
			},
			{
				origin: {
					type: 'stop',
					id: '900100026',
					name: 'S+U Alexanderplatz Bhf/Gontardstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100026',
						latitude: 52.521059,
						longitude: 13.41125
					},
					products: {
						suburban: false,
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
					id: '900100515',
					name: 'Spandauer Str./Marienkirche (Berlin)',
					location: {
						type: 'location',
						id: '900100515',
						latitude: 52.520025,
						longitude: 13.404822
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				t: 20000
			},
			{
				origin: {
					type: 'stop',
					id: '900100026',
					name: 'S+U Alexanderplatz Bhf/Gontardstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100026',
						latitude: 52.521059,
						longitude: 13.41125
					},
					products: {
						suburban: false,
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
					id: '900100515',
					name: 'Spandauer Str./Marienkirche (Berlin)',
					location: {
						type: 'location',
						id: '900100515',
						latitude: 52.520025,
						longitude: 13.404822
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				t: 30000
			}
		],
		polyline: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41103,
							52.52129
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41057,
							52.52157
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41001,
							52.52191
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.40943,
							52.52221
						]
					}
				}
			]
		}
	},
	{
		direction: 'S+U Hauptbahnhof',
		tripId: '1|29174|2|86|19082019',
		line: {
			type: 'line',
			id: 'm5',
			fahrtNr: null,
			name: 'M5',
			public: true,
			mode: 'train',
			product: 'tram',
		},
		location: {
			type: 'location',
			latitude: 52.52389,
			longitude: 13.416814
		},
		nextStopovers: [
			{
				stop: {
					type: 'stop',
					id: '900151003',
					name: 'Zingster Str. (Berlin)',
					location: {
						type: 'location',
						id: '900151003',
						latitude: 52.57236,
						longitude: 13.495164
					},
					products: {
						suburban: false,
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
				arrivalPrognosisType: null,
				departure: '2019-08-19T19:59:00+02:00',
				plannedDeparture: '2019-08-19T19:59:00+02:00',
				departureDelay: 0,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900100040',
					name: 'Mollstr./Otto-Braun-Str. (Berlin)',
					location: {
						type: 'location',
						id: '900100040',
						latitude: 52.525185,
						longitude: 13.419942
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: '2019-08-19T20:32:00+02:00',
				plannedArrival: '2019-08-19T20:30:00+02:00',
				arrivalDelay: 120,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:32:00+02:00',
				plannedDeparture: '2019-08-19T20:30:00+02:00',
				departureDelay: 120,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900100005',
					name: 'U Alexanderplatz (Berlin) [Tram]',
					location: {
						type: 'location',
						id: '900100005',
						latitude: 52.522389,
						longitude: 13.414495
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: '2019-08-19T20:34:00+02:00',
				plannedArrival: '2019-08-19T20:33:00+02:00',
				arrivalDelay: 60,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: '2019-08-19T20:34:00+02:00',
				plannedDeparture: '2019-08-19T20:33:00+02:00',
				departureDelay: 60,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			},
			{
				stop: {
					type: 'stop',
					id: '900003259',
					name: 'Lüneburger Str. (Berlin)',
					location: {
						type: 'location',
						id: '900003259',
						latitude: 52.523315,
						longitude: 13.36207
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				arrival: '2019-08-19T20:55:00+02:00',
				plannedArrival: '2019-08-19T20:54:00+02:00',
				arrivalDelay: 60,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				arrivalPrognosisType: null,
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				departurePrognosisType: null,
			}
		],
		frames: [
			{
				origin: {
					type: 'stop',
					id: '900100040',
					name: 'Mollstr./Otto-Braun-Str. (Berlin)',
					location: {
						type: 'location',
						id: '900100040',
						latitude: 52.525185,
						longitude: 13.419942
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				destination: {
					type: 'stop',
					id: '900100005',
					name: 'U Alexanderplatz (Berlin) [Tram]',
					location: {
						type: 'location',
						id: '900100005',
						latitude: 52.522389,
						longitude: 13.414495
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				t: 0
			},
			{
				origin: {
					type: 'stop',
					id: '900100040',
					name: 'Mollstr./Otto-Braun-Str. (Berlin)',
					location: {
						type: 'location',
						id: '900100040',
						latitude: 52.525185,
						longitude: 13.419942
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				destination: {
					type: 'stop',
					id: '900100005',
					name: 'U Alexanderplatz (Berlin) [Tram]',
					location: {
						type: 'location',
						id: '900100005',
						latitude: 52.522389,
						longitude: 13.414495
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				t: 10000
			},
			{
				origin: {
					type: 'stop',
					id: '900100040',
					name: 'Mollstr./Otto-Braun-Str. (Berlin)',
					location: {
						type: 'location',
						id: '900100040',
						latitude: 52.525185,
						longitude: 13.419942
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				destination: {
					type: 'stop',
					id: '900100005',
					name: 'U Alexanderplatz (Berlin) [Tram]',
					location: {
						type: 'location',
						id: '900100005',
						latitude: 52.522389,
						longitude: 13.414495
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				t: 20000
			},
			{
				origin: {
					type: 'stop',
					id: '900100040',
					name: 'Mollstr./Otto-Braun-Str. (Berlin)',
					location: {
						type: 'location',
						id: '900100040',
						latitude: 52.525185,
						longitude: 13.419942
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				destination: {
					type: 'stop',
					id: '900100005',
					name: 'U Alexanderplatz (Berlin) [Tram]',
					location: {
						type: 'location',
						id: '900100005',
						latitude: 52.522389,
						longitude: 13.414495
					},
					products: {
						suburban: false,
						subway: false,
						tram: true,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					}
				},
				t: 30000
			}
		],
		polyline: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41681,
							52.52389
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41628,
							52.52345
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41574,
							52.52301
						]
					}
				},
				{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'Point',
						coordinates: [
							13.41521,
							52.52257
						]
					}
				}
			]
		}
	}
]

export {
	bvgRadar,
}
