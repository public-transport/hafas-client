'use strict'

module.exports = {
	id: '1|6849|3|86|1112021',
	direction: 'S Ostbahnhof via S+U Wedding',
	line: {
		type: 'line',
		id: '147',
		fahrtNr: '7070',
		name: '147',
		public: true,
		adminCode: 'BVB---',
		productName: 'Bus',
		mode: 'bus',
		product: 'bus',
		operator: {
			type: 'operator',
			id: 'berliner-verkehrsbetriebe',
			name: 'Berliner Verkehrsbetriebe'
		},
	},
	remarks: [
		{ type: 'hint', code: 'bf', text: 'barrier-free' },
		{
			type: 'hint',
			code: 'text.journeystop.product.or.direction.changes.journey.message',
			text: 'From S+U Wedding (Berlin) as 147 heading towards S Ostbahnhof via S+U Hauptbahnhof'
		},
		{
			type: 'hint',
			code: 'text.journeystop.product.or.direction.changes.journey.message',
			text: 'From S+U Berlin Hauptbahnhof as 147 heading towards S Ostbahnhof via Friedrichstr.'
		},
		{
			type: 'hint',
			code: 'text.journeystop.product.or.direction.changes.journey.message',
			text: 'From S+U Friedrichstr. Bhf (Berlin) as 147 heading towards S Ostbahnhof'
		}
	],
	occupancy: 'medium',

	origin: {
		type: 'stop',
		id: '900009102',
		name: 'U Leopoldplatz (Berlin)',
		location: {
			type: 'location',
			id: '900009102',
			latitude: 52.546489,
			longitude: 13.359391
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
	departure: '2021-11-01T07:18:00+01:00',
	plannedDeparture: '2021-11-01T07:18:00+01:00',
	departureDelay: null,
	departurePlatform: null,
	plannedDeparturePlatform: null,
	departurePrognosisType: 'prognosed',

	destination: {
		type: 'stop',
		id: '900120005',
		name: 'S Ostbahnhof (Berlin)',
		location: {
			type: 'location',
			id: '900120005',
			latitude: 52.510335,
			longitude: 13.435089
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
	arrival: '2021-11-01T07:59:00+01:00',
	plannedArrival: '2021-11-01T07:59:00+01:00',
	arrivalDelay: null,
	arrivalPlatform: null,
	plannedArrivalPlatform: null,
	arrivalPrognosisType: 'prognosed',

	polyline: {
		type: 'FeatureCollection',
		features: [
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900009102',
					name: 'U Leopoldplatz (Berlin)',
					location: {
						type: 'location',
						id: '900009102',
						latitude: 52.546489,
						longitude: 13.359391
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
				geometry: { type: 'Point', coordinates: [ 13.35954, 52.54606 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900009151',
					name: 'Gerichtstr. (Berlin)',
					location: {
						type: 'location',
						id: '900009151',
						latitude: 52.544476,
						longitude: 13.362663
					},
					products: {
						suburban: false,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				geometry: { type: 'Point', coordinates: [ 13.36199, 52.54468 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900009104',
					name: 'S+U Wedding (Berlin)',
					location: {
						type: 'location',
						id: '900009104',
						latitude: 52.542732,
						longitude: 13.366061
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
				geometry: { type: 'Point', coordinates: [ 13.36525, 52.54283 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.36811, 52.54121 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.36814, 52.54108 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900008104',
					name: 'U Reinickendorfer Str./Fennstr. (Berlin)',
					location: {
						type: 'location',
						id: '900008104',
						latitude: 52.541195,
						longitude: 13.368713
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
				geometry: { type: 'Point', coordinates: [ 13.36785, 52.54092 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900001202',
					name: 'Am Nordhafen (Berlin)',
					location: {
						type: 'location',
						id: '900001202',
						latitude: 52.538848,
						longitude: 13.363607
					},
					products: {
						suburban: false,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				geometry: { type: 'Point', coordinates: [ 13.36308, 52.53868 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.36057, 52.53751 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.36036, 52.53723 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.36077, 52.53685 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.36246, 52.5361 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.36311, 52.53556 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900001252',
					name: 'Friedrich-Krause-Ufer (Berlin)',
					location: {
						type: 'location',
						id: '900001252',
						latitude: 52.536736,
						longitude: 13.361216
					},
					products: {
						suburban: false,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				geometry: { type: 'Point', coordinates: [ 13.36167, 52.53653 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.36539, 52.53325 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900001206',
					name: 'Heidestr. (Berlin)',
					location: {
						type: 'location',
						id: '900001206',
						latitude: 52.53332,
						longitude: 13.365512
					},
					products: {
						suburban: false,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				geometry: { type: 'Point', coordinates: [ 13.36544, 52.53332 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.36603, 52.5326 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900001203',
					name: 'Döberitzer Str. (Berlin)',
					location: {
						type: 'location',
						id: '900001203',
						latitude: 52.530668,
						longitude: 13.36811
					},
					products: {
						suburban: false,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				geometry: { type: 'Point', coordinates: [ 13.36783, 52.5309 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.36882, 52.52984 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.36937, 52.52903 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.36932, 52.5289 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.36834, 52.52845 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.36768, 52.52788 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.36751, 52.5275 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.3674, 52.52633 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.36762, 52.52592 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.36782, 52.52587 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900003201',
					name: 'S+U Berlin Hauptbahnhof',
					location: {
						type: 'location',
						id: '900003201',
						latitude: 52.525607,
						longitude: 13.369072
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
				geometry: { type: 'Point', coordinates: [ 13.36915, 52.52623 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.37048, 52.52664 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.3711, 52.52694 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900100503',
					name: 'Invalidenpark (Berlin)',
					location: {
						type: 'location',
						id: '900100503',
						latitude: 52.528762,
						longitude: 13.376929
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
				geometry: { type: 'Point', coordinates: [ 13.37714, 52.52876 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.37833, 52.52912 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.3785, 52.52905 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900100542',
					name: 'Charité - Campus Mitte (Berlin)',
					location: {
						type: 'location',
						id: '900100542',
						latitude: 52.52576,
						longitude: 13.379086
					},
					products: {
						suburban: false,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				geometry: { type: 'Point', coordinates: [ 13.37905, 52.52581 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900100033',
					name: 'Schumannstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100033',
						latitude: 52.524052,
						longitude: 13.379392
					},
					products: {
						suburban: false,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				geometry: { type: 'Point', coordinates: [ 13.37942, 52.52361 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.37965, 52.52258 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900100509',
					name: 'Deutsches Theater (Berlin)',
					location: {
						type: 'location',
						id: '900100509',
						latitude: 52.523126,
						longitude: 13.383266
					},
					products: {
						suburban: false,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				geometry: { type: 'Point', coordinates: [ 13.38345, 52.52317 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900100047',
					name: 'Friedrichstr./Reinhardtstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100047',
						latitude: 52.523711,
						longitude: 13.386835
					},
					products: {
						suburban: false,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				geometry: { type: 'Point', coordinates: [ 13.3867, 52.5237 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.38745, 52.52382 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.38761, 52.52376 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900100001',
					name: 'S+U Friedrichstr. Bhf (Berlin)',
					location: {
						type: 'location',
						id: '900100001',
						latitude: 52.520519,
						longitude: 13.386448
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
				geometry: { type: 'Point', coordinates: [ 13.38818, 52.52058 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.38833, 52.51913 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900100513',
					name: 'U Unter den Linden (Berlin)',
					location: {
						type: 'location',
						id: '900100513',
						latitude: 52.516996,
						longitude: 13.388875
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
				geometry: { type: 'Point', coordinates: [ 13.38889, 52.51663 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.38872, 52.51723 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.38914, 52.51479 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900100027',
					name: 'Französische Str. (Berlin)',
					location: {
						type: 'location',
						id: '900100027',
						latitude: 52.514766,
						longitude: 13.389208
					},
					products: {
						suburban: false,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				geometry: { type: 'Point', coordinates: [ 13.38959, 52.51475 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900100530',
					name: 'Werderscher Markt (Berlin)',
					location: {
						type: 'location',
						id: '900100530',
						latitude: 52.515306,
						longitude: 13.397334
					},
					products: {
						suburban: false,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				geometry: { type: 'Point', coordinates: [ 13.3971, 52.51524 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.39995, 52.51587 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.40046, 52.51582 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900100052',
					name: 'Berliner Schloss (Berlin)',
					location: {
						type: 'location',
						id: '900100052',
						latitude: 52.516124,
						longitude: 13.401676
					},
					products: {
						suburban: false,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				geometry: { type: 'Point', coordinates: [ 13.40196, 52.51628 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.40251, 52.51634 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900100531',
					name: 'Neumannsgasse (Berlin)',
					location: {
						type: 'location',
						id: '900100531',
						latitude: 52.515189,
						longitude: 13.403995
					},
					products: {
						suburban: false,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				geometry: { type: 'Point', coordinates: [ 13.40414, 52.51521 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900100726',
					name: 'Fischerinsel. (Berlin)',
					location: {
						type: 'location',
						id: '900100726',
						latitude: 52.513571,
						longitude: 13.406449
					},
					products: {
						suburban: false,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				geometry: { type: 'Point', coordinates: [ 13.4063, 52.51363 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.40867, 52.51202 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900100014',
					name: 'U Märkisches Museum (Berlin)',
					location: {
						type: 'location',
						id: '900100014',
						latitude: 52.512007,
						longitude: 13.408768
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
				geometry: { type: 'Point', coordinates: [ 13.40938, 52.51132 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.41117, 52.5096 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900100032',
					name: 'Heinrich-Heine-Str./Annenstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100032',
						latitude: 52.508285,
						longitude: 13.413749
					},
					products: {
						suburban: false,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				geometry: { type: 'Point', coordinates: [ 13.41383, 52.50815 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.41531, 52.50736 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900100544',
					name: 'Heinrich-Heine-Platz (Berlin)',
					location: {
						type: 'location',
						id: '900100544',
						latitude: 52.506595,
						longitude: 13.417857
					},
					products: {
						suburban: false,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				geometry: { type: 'Point', coordinates: [ 13.41761, 52.50662 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.41951, 52.50609 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.41935, 52.50579 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.41947, 52.50569 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.42159, 52.50512 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900100546',
					name: 'Adalbertstr. (Berlin)',
					location: {
						type: 'location',
						id: '900100546',
						latitude: 52.505283,
						longitude: 13.422144
					},
					products: {
						suburban: false,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				geometry: { type: 'Point', coordinates: [ 13.42233, 52.50507 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.42443, 52.50514 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.42561, 52.50542 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.42639, 52.5057 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.42708, 52.50612 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.4279, 52.5068 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900014107',
					name: 'Bethaniendamm (Berlin)',
					location: {
						type: 'location',
						id: '900014107',
						latitude: 52.507215,
						longitude: 13.428437
					},
					products: {
						suburban: false,
						subway: false,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					}
				},
				geometry: { type: 'Point', coordinates: [ 13.42813, 52.50712 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.42845, 52.5082 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.43015, 52.51009 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.43482, 52.50851 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.43507, 52.5086 ] }
			},
			{
				type: 'Feature',
				properties: {},
				geometry: { type: 'Point', coordinates: [ 13.4355, 52.50904 ] }
			},
			{
				type: 'Feature',
				properties: {
					type: 'stop',
					id: '900120005',
					name: 'S Ostbahnhof (Berlin)',
					location: {
						type: 'location',
						id: '900120005',
						latitude: 52.510335,
						longitude: 13.435089
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
				geometry: { type: 'Point', coordinates: [ 13.43447, 52.50953 ] }
			}
		]
	},

	stopovers: [
		{
			stop: {
				type: 'stop',
				id: '900009102',
				name: 'U Leopoldplatz (Berlin)',
				location: {
					type: 'location',
					id: '900009102',
					latitude: 52.546489,
					longitude: 13.359391
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
			departure: '2021-11-01T07:18:00+01:00',
			plannedDeparture: '2021-11-01T07:18:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: 'prognosed',
			remarks: [
				{
					type: 'hint',
					code: 'text.journeystop.product.or.direction.changes.stop.message',
					text: 'As 147 heading towards S Ostbahnhof via S+U Wedding from here'
				}
			],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900009151',
				name: 'Gerichtstr. (Berlin)',
				location: {
					type: 'location',
					id: '900009151',
					latitude: 52.544476,
					longitude: 13.362663
				},
				products: {
					suburban: false,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: '2021-11-01T07:20:00+01:00',
			plannedArrival: '2021-11-01T07:20:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:20:00+01:00',
			plannedDeparture: '2021-11-01T07:20:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900009104',
				name: 'S+U Wedding (Berlin)',
				location: {
					type: 'location',
					id: '900009104',
					latitude: 52.542732,
					longitude: 13.366061
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
			arrival: '2021-11-01T07:21:00+01:00',
			plannedArrival: '2021-11-01T07:21:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:21:00+01:00',
			plannedDeparture: '2021-11-01T07:21:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [
				{
					type: 'hint',
					code: 'text.journeystop.product.or.direction.changes.stop.message',
					text: 'As 147 heading towards S Ostbahnhof via S+U Hauptbahnhof from here'
				}
			],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900008104',
				name: 'U Reinickendorfer Str./Fennstr. (Berlin)',
				location: {
					type: 'location',
					id: '900008104',
					latitude: 52.541195,
					longitude: 13.368713
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
			arrival: '2021-11-01T07:22:00+01:00',
			plannedArrival: '2021-11-01T07:22:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:22:00+01:00',
			plannedDeparture: '2021-11-01T07:22:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900001202',
				name: 'Am Nordhafen (Berlin)',
				location: {
					type: 'location',
					id: '900001202',
					latitude: 52.538848,
					longitude: 13.363607
				},
				products: {
					suburban: false,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: '2021-11-01T07:24:00+01:00',
			plannedArrival: '2021-11-01T07:24:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:24:00+01:00',
			plannedDeparture: '2021-11-01T07:24:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900001252',
				name: 'Friedrich-Krause-Ufer (Berlin)',
				location: {
					type: 'location',
					id: '900001252',
					latitude: 52.536736,
					longitude: 13.361216
				},
				products: {
					suburban: false,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: '2021-11-01T07:26:00+01:00',
			plannedArrival: '2021-11-01T07:26:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:26:00+01:00',
			plannedDeparture: '2021-11-01T07:26:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900001206',
				name: 'Heidestr. (Berlin)',
				location: {
					type: 'location',
					id: '900001206',
					latitude: 52.53332,
					longitude: 13.365512
				},
				products: {
					suburban: false,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: '2021-11-01T07:27:00+01:00',
			plannedArrival: '2021-11-01T07:27:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:27:00+01:00',
			plannedDeparture: '2021-11-01T07:27:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900001203',
				name: 'Döberitzer Str. (Berlin)',
				location: {
					type: 'location',
					id: '900001203',
					latitude: 52.530668,
					longitude: 13.36811
				},
				products: {
					suburban: false,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: '2021-11-01T07:28:00+01:00',
			plannedArrival: '2021-11-01T07:28:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:28:00+01:00',
			plannedDeparture: '2021-11-01T07:28:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900003201',
				name: 'S+U Berlin Hauptbahnhof',
				location: {
					type: 'location',
					id: '900003201',
					latitude: 52.525607,
					longitude: 13.369072
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
			arrival: '2021-11-01T07:31:00+01:00',
			plannedArrival: '2021-11-01T07:31:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:31:00+01:00',
			plannedDeparture: '2021-11-01T07:31:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [
				{
					type: 'hint',
					code: 'text.journeystop.product.or.direction.changes.stop.message',
					text: 'As 147 heading towards S Ostbahnhof via Friedrichstr. from here'
				}
			],
			occupancy: 'medium'
		},
		{
			stop: {
				type: 'stop',
				id: '900100503',
				name: 'Invalidenpark (Berlin)',
				location: {
					type: 'location',
					id: '900100503',
					latitude: 52.528762,
					longitude: 13.376929
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
			arrival: '2021-11-01T07:33:00+01:00',
			plannedArrival: '2021-11-01T07:33:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:33:00+01:00',
			plannedDeparture: '2021-11-01T07:33:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'medium'
		},
		{
			stop: {
				type: 'stop',
				id: '900100542',
				name: 'Charité - Campus Mitte (Berlin)',
				location: {
					type: 'location',
					id: '900100542',
					latitude: 52.52576,
					longitude: 13.379086
				},
				products: {
					suburban: false,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: '2021-11-01T07:35:00+01:00',
			plannedArrival: '2021-11-01T07:35:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:35:00+01:00',
			plannedDeparture: '2021-11-01T07:35:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900100033',
				name: 'Schumannstr. (Berlin)',
				location: {
					type: 'location',
					id: '900100033',
					latitude: 52.524052,
					longitude: 13.379392
				},
				products: {
					suburban: false,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: '2021-11-01T07:36:00+01:00',
			plannedArrival: '2021-11-01T07:36:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:36:00+01:00',
			plannedDeparture: '2021-11-01T07:36:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900100509',
				name: 'Deutsches Theater (Berlin)',
				location: {
					type: 'location',
					id: '900100509',
					latitude: 52.523126,
					longitude: 13.383266
				},
				products: {
					suburban: false,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: '2021-11-01T07:38:00+01:00',
			plannedArrival: '2021-11-01T07:38:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:38:00+01:00',
			plannedDeparture: '2021-11-01T07:38:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900100047',
				name: 'Friedrichstr./Reinhardtstr. (Berlin)',
				location: {
					type: 'location',
					id: '900100047',
					latitude: 52.523711,
					longitude: 13.386835
				},
				products: {
					suburban: false,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: '2021-11-01T07:39:00+01:00',
			plannedArrival: '2021-11-01T07:39:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:39:00+01:00',
			plannedDeparture: '2021-11-01T07:39:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900100001',
				name: 'S+U Friedrichstr. Bhf (Berlin)',
				location: {
					type: 'location',
					id: '900100001',
					latitude: 52.520519,
					longitude: 13.386448
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
			arrival: '2021-11-01T07:41:00+01:00',
			plannedArrival: '2021-11-01T07:41:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:41:00+01:00',
			plannedDeparture: '2021-11-01T07:41:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [
				{
					type: 'hint',
					code: 'text.journeystop.product.or.direction.changes.stop.message',
					text: 'As 147 heading towards S Ostbahnhof from here'
				}
			],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900100513',
				name: 'U Unter den Linden (Berlin)',
				location: {
					type: 'location',
					id: '900100513',
					latitude: 52.516996,
					longitude: 13.388875
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
			arrival: '2021-11-01T07:44:00+01:00',
			plannedArrival: '2021-11-01T07:44:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:44:00+01:00',
			plannedDeparture: '2021-11-01T07:44:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900100027',
				name: 'Französische Str. (Berlin)',
				location: {
					type: 'location',
					id: '900100027',
					latitude: 52.514766,
					longitude: 13.389208
				},
				products: {
					suburban: false,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: '2021-11-01T07:45:00+01:00',
			plannedArrival: '2021-11-01T07:45:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:45:00+01:00',
			plannedDeparture: '2021-11-01T07:45:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900100530',
				name: 'Werderscher Markt (Berlin)',
				location: {
					type: 'location',
					id: '900100530',
					latitude: 52.515306,
					longitude: 13.397334
				},
				products: {
					suburban: false,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: '2021-11-01T07:47:00+01:00',
			plannedArrival: '2021-11-01T07:47:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:47:00+01:00',
			plannedDeparture: '2021-11-01T07:47:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900100052',
				name: 'Berliner Schloss (Berlin)',
				location: {
					type: 'location',
					id: '900100052',
					latitude: 52.516124,
					longitude: 13.401676
				},
				products: {
					suburban: false,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: '2021-11-01T07:47:00+01:00',
			plannedArrival: '2021-11-01T07:47:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:47:00+01:00',
			plannedDeparture: '2021-11-01T07:47:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900100531',
				name: 'Neumannsgasse (Berlin)',
				location: {
					type: 'location',
					id: '900100531',
					latitude: 52.515189,
					longitude: 13.403995
				},
				products: {
					suburban: false,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: '2021-11-01T07:48:00+01:00',
			plannedArrival: '2021-11-01T07:48:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:48:00+01:00',
			plannedDeparture: '2021-11-01T07:48:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900100726',
				name: 'Fischerinsel. (Berlin)',
				location: {
					type: 'location',
					id: '900100726',
					latitude: 52.513571,
					longitude: 13.406449
				},
				products: {
					suburban: false,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: '2021-11-01T07:49:00+01:00',
			plannedArrival: '2021-11-01T07:49:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:49:00+01:00',
			plannedDeparture: '2021-11-01T07:49:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900100014',
				name: 'U Märkisches Museum (Berlin)',
				location: {
					type: 'location',
					id: '900100014',
					latitude: 52.512007,
					longitude: 13.408768
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
			arrival: '2021-11-01T07:50:00+01:00',
			plannedArrival: '2021-11-01T07:50:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:50:00+01:00',
			plannedDeparture: '2021-11-01T07:50:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900100032',
				name: 'Heinrich-Heine-Str./Annenstr. (Berlin)',
				location: {
					type: 'location',
					id: '900100032',
					latitude: 52.508285,
					longitude: 13.413749
				},
				products: {
					suburban: false,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: '2021-11-01T07:51:00+01:00',
			plannedArrival: '2021-11-01T07:51:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:51:00+01:00',
			plannedDeparture: '2021-11-01T07:51:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900100544',
				name: 'Heinrich-Heine-Platz (Berlin)',
				location: {
					type: 'location',
					id: '900100544',
					latitude: 52.506595,
					longitude: 13.417857
				},
				products: {
					suburban: false,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: '2021-11-01T07:52:00+01:00',
			plannedArrival: '2021-11-01T07:52:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:52:00+01:00',
			plannedDeparture: '2021-11-01T07:52:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900100546',
				name: 'Adalbertstr. (Berlin)',
				location: {
					type: 'location',
					id: '900100546',
					latitude: 52.505283,
					longitude: 13.422144
				},
				products: {
					suburban: false,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: '2021-11-01T07:53:00+01:00',
			plannedArrival: '2021-11-01T07:53:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:53:00+01:00',
			plannedDeparture: '2021-11-01T07:53:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900014107',
				name: 'Bethaniendamm (Berlin)',
				location: {
					type: 'location',
					id: '900014107',
					latitude: 52.507215,
					longitude: 13.428437
				},
				products: {
					suburban: false,
					subway: false,
					tram: false,
					bus: true,
					ferry: false,
					express: false,
					regional: false
				}
			},
			arrival: '2021-11-01T07:55:00+01:00',
			plannedArrival: '2021-11-01T07:55:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: null,
			departure: '2021-11-01T07:55:00+01:00',
			plannedDeparture: '2021-11-01T07:55:00+01:00',
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
			remarks: [],
			occupancy: 'low'
		},
		{
			stop: {
				type: 'stop',
				id: '900120005',
				name: 'S Ostbahnhof (Berlin)',
				location: {
					type: 'location',
					id: '900120005',
					latitude: 52.510335,
					longitude: 13.435089
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
			arrival: '2021-11-01T07:59:00+01:00',
			plannedArrival: '2021-11-01T07:59:00+01:00',
			arrivalDelay: null,
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			arrivalPrognosisType: 'prognosed',
			departure: null,
			plannedDeparture: null,
			departureDelay: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			departurePrognosisType: null,
		}
	],
}
