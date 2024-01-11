const expected = [
	{
		type: 'journey',
		legs: [
			{
				origin: {
					type: 'station',
					id: '300188027',
					name: 'S Ostbahnhof (Berlin)',
					location: {
						type: 'location',
						id: '300188027',
						latitude: 52.510946,
						longitude: 13.435359
					}
				},
				destination: {
					type: 'stop',
					id: '300188611',
					name: 'S Ostbahnhof (Berlin)',
					location: {
						type: 'location',
						id: '300188611',
						latitude: 52.510721,
						longitude: 13.435556
					},
					station: {
						type: 'station',
						id: '900120005',
						name: 'S Ostbahnhof (Berlin)',
						location: {
							type: 'location',
							id: '900120005',
							latitude: 52.510335,
							longitude: 13.435089
						}
					}
				},
				arrival: '2021-09-30T23:16:00+02:00',
				plannedArrival: '2021-09-30T23:16:00+02:00',
				arrivalDelay: null,
				departure: '2021-09-30T23:15:00+02:00',
				plannedDeparture: '2021-09-30T23:15:00+02:00',
				departureDelay: null,
				public: true,
				walking: true,
				distance: 28,
				duration: 60
			},
			{
				origin: {
					type: 'stop',
					id: '300188611',
					name: 'S Ostbahnhof (Berlin)',
					location: {
						type: 'location',
						id: '300188611',
						latitude: 52.510721,
						longitude: 13.435556
					},
					station: {
						type: 'station',
						id: '900120005',
						name: 'S Ostbahnhof (Berlin)',
						location: {
							type: 'location',
							id: '900120005',
							latitude: 52.510335,
							longitude: 13.435089
						}
					}
				},
				destination: {
					type: 'stop',
					id: '300212030',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212030',
						latitude: 52.522722,
						longitude: 13.402431
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				arrival: '2021-09-30T23:21:00+02:00',
				plannedArrival: '2021-09-30T23:21:00+02:00',
				arrivalDelay: null,
				departure: '2021-09-30T23:16:00+02:00',
				plannedDeparture: '2021-09-30T23:16:00+02:00',
				departureDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: '4',
				departurePlatform: null,
				plannedDeparturePlatform: '11',
				tripId: '1|20705|2|86|30092021',
				line: {
					type: 'line',
					id: 's7',
					fahrtNr: null,
					name: 'S7',
					public: true
				},
				direction: 'S Potsdam Hauptbahnhof'
			},
			{
				origin: {
					type: 'stop',
					id: '300212030',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212030',
						latitude: 52.522722,
						longitude: 13.402431
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				destination: {
					type: 'stop',
					id: '300212015',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212015',
						latitude: 52.522596,
						longitude: 13.403312
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				arrival: '2021-09-30T23:24:00+02:00',
				plannedArrival: '2021-09-30T23:24:00+02:00',
				arrivalDelay: null,
				departure: '2021-09-30T23:21:00+02:00',
				plannedDeparture: '2021-09-30T23:21:00+02:00',
				departureDelay: null,
				public: true,
				walking: true,
				distance: 61,
				duration: 180
			},
			{
				origin: {
					type: 'stop',
					id: '300212015',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212015',
						latitude: 52.522596,
						longitude: 13.403312
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				destination: {
					type: 'stop',
					id: '302207004',
					name: 'Schwedter Str. (Berlin)',
					location: {
						type: 'location',
						id: '302207004',
						latitude: 52.537033,
						longitude: 13.408229
					},
					station: {
						type: 'station',
						id: '900110505',
						name: 'Schwedter Str. (Berlin)',
						location: {
							type: 'location',
							id: '900110505',
							latitude: 52.536835,
							longitude: 13.407959
						}
					}
				},
				arrival: '2021-09-30T23:33:00+02:00',
				plannedArrival: '2021-09-30T23:33:00+02:00',
				arrivalDelay: null,
				departure: '2021-09-30T23:26:00+02:00',
				plannedDeparture: '2021-09-30T23:26:00+02:00',
				departureDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				tripId: '1|16166|6|86|30092021',
				line: {
					type: 'line',
					id: 'm1',
					fahrtNr: null,
					name: 'M1',
					public: true
				},
				direction: 'Schillerstr. (Berlin)'
			}
		]
	},
	{
		type: 'journey',
		legs: [
			{
				origin: {
					type: 'stop',
					id: '300188611',
					name: 'S Ostbahnhof (Berlin)',
					location: {
						type: 'location',
						id: '300188611',
						latitude: 52.510721,
						longitude: 13.435556
					},
					station: {
						type: 'station',
						id: '900120005',
						name: 'S Ostbahnhof (Berlin)',
						location: {
							type: 'location',
							id: '900120005',
							latitude: 52.510335,
							longitude: 13.435089
						}
					}
				},
				destination: {
					type: 'stop',
					id: '300212030',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212030',
						latitude: 52.522722,
						longitude: 13.402431
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				arrival: '2021-09-30T23:21:00+02:00',
				plannedArrival: '2021-09-30T23:21:00+02:00',
				arrivalDelay: null,
				departure: '2021-09-30T23:16:00+02:00',
				plannedDeparture: '2021-09-30T23:16:00+02:00',
				departureDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: '4',
				departurePlatform: null,
				plannedDeparturePlatform: '11',
				tripId: '1|20705|2|86|30092021',
				line: {
					type: 'line',
					id: 's7',
					fahrtNr: null,
					name: 'S7',
					public: true
				},
				direction: 'S Potsdam Hauptbahnhof'
			},
			{
				origin: {
					type: 'stop',
					id: '300212030',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212030',
						latitude: 52.522722,
						longitude: 13.402431
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				destination: {
					type: 'stop',
					id: '300212015',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212015',
						latitude: 52.522596,
						longitude: 13.403312
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				arrival: '2021-09-30T23:24:00+02:00',
				plannedArrival: '2021-09-30T23:24:00+02:00',
				arrivalDelay: null,
				departure: '2021-09-30T23:21:00+02:00',
				plannedDeparture: '2021-09-30T23:21:00+02:00',
				departureDelay: null,
				public: true,
				walking: true,
				distance: 61,
				duration: 180
			},
			{
				origin: {
					type: 'stop',
					id: '300212015',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212015',
						latitude: 52.522596,
						longitude: 13.403312
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				destination: {
					type: 'stop',
					id: '302207004',
					name: 'Schwedter Str. (Berlin)',
					location: {
						type: 'location',
						id: '302207004',
						latitude: 52.537033,
						longitude: 13.408229
					},
					station: {
						type: 'station',
						id: '900110505',
						name: 'Schwedter Str. (Berlin)',
						location: {
							type: 'location',
							id: '900110505',
							latitude: 52.536835,
							longitude: 13.407959
						}
					}
				},
				arrival: '2021-09-30T23:33:00+02:00',
				plannedArrival: '2021-09-30T23:33:00+02:00',
				arrivalDelay: null,
				departure: '2021-09-30T23:26:00+02:00',
				plannedDeparture: '2021-09-30T23:26:00+02:00',
				departureDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				tripId: '1|16166|6|86|30092021',
				line: {
					type: 'line',
					id: 'm1',
					fahrtNr: null,
					name: 'M1',
					public: true
				},
				direction: 'Schillerstr. (Berlin)'
			}
		]
	},
	{
		type: 'journey',
		legs: [
			{
				origin: {
					type: 'station',
					id: '300188027',
					name: 'S Ostbahnhof (Berlin)',
					location: {
						type: 'location',
						id: '300188027',
						latitude: 52.510946,
						longitude: 13.435359
					}
				},
				destination: {
					type: 'stop',
					id: '300188611',
					name: 'S Ostbahnhof (Berlin)',
					location: {
						type: 'location',
						id: '300188611',
						latitude: 52.510721,
						longitude: 13.435556
					},
					station: {
						type: 'station',
						id: '900120005',
						name: 'S Ostbahnhof (Berlin)',
						location: {
							type: 'location',
							id: '900120005',
							latitude: 52.510335,
							longitude: 13.435089
						}
					}
				},
				arrival: '2021-09-30T23:19:00+02:00',
				plannedArrival: '2021-09-30T23:19:00+02:00',
				arrivalDelay: null,
				departure: '2021-09-30T23:18:00+02:00',
				plannedDeparture: '2021-09-30T23:18:00+02:00',
				departureDelay: null,
				public: true,
				walking: true,
				distance: 28,
				duration: 60
			},
			{
				origin: {
					type: 'stop',
					id: '300188611',
					name: 'S Ostbahnhof (Berlin)',
					location: {
						type: 'location',
						id: '300188611',
						latitude: 52.510721,
						longitude: 13.435556
					},
					station: {
						type: 'station',
						id: '900120005',
						name: 'S Ostbahnhof (Berlin)',
						location: {
							type: 'location',
							id: '900120005',
							latitude: 52.510335,
							longitude: 13.435089
						}
					}
				},
				destination: {
					type: 'stop',
					id: '300212030',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212030',
						latitude: 52.522722,
						longitude: 13.402431
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				arrival: '2021-09-30T23:24:00+02:00',
				plannedArrival: '2021-09-30T23:24:00+02:00',
				arrivalDelay: null,
				departure: '2021-09-30T23:19:00+02:00',
				plannedDeparture: '2021-09-30T23:19:00+02:00',
				departureDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: '4',
				departurePlatform: null,
				plannedDeparturePlatform: '11',
				tripId: '1|19643|5|86|30092021',
				line: {
					type: 'line',
					id: 's3',
					fahrtNr: null,
					name: 'S3',
					public: true
				},
				direction: 'S Spandau Bhf (Berlin)'
			},
			{
				origin: {
					type: 'stop',
					id: '300212030',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212030',
						latitude: 52.522722,
						longitude: 13.402431
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				destination: {
					type: 'stop',
					id: '300212015',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212015',
						latitude: 52.522596,
						longitude: 13.403312
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				arrival: '2021-09-30T23:27:00+02:00',
				plannedArrival: '2021-09-30T23:27:00+02:00',
				arrivalDelay: null,
				departure: '2021-09-30T23:24:00+02:00',
				plannedDeparture: '2021-09-30T23:24:00+02:00',
				departureDelay: null,
				public: true,
				walking: true,
				distance: 61,
				duration: 180
			},
			{
				origin: {
					type: 'stop',
					id: '300212015',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212015',
						latitude: 52.522596,
						longitude: 13.403312
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				destination: {
					type: 'stop',
					id: '302207004',
					name: 'Schwedter Str. (Berlin)',
					location: {
						type: 'location',
						id: '302207004',
						latitude: 52.537033,
						longitude: 13.408229
					},
					station: {
						type: 'station',
						id: '900110505',
						name: 'Schwedter Str. (Berlin)',
						location: {
							type: 'location',
							id: '900110505',
							latitude: 52.536835,
							longitude: 13.407959
						}
					}
				},
				arrival: '2021-09-30T23:43:00+02:00',
				plannedArrival: '2021-09-30T23:43:00+02:00',
				arrivalDelay: null,
				departure: '2021-09-30T23:36:00+02:00',
				plannedDeparture: '2021-09-30T23:36:00+02:00',
				departureDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				tripId: '1|16144|7|86|30092021',
				line: {
					type: 'line',
					id: 'm1',
					fahrtNr: null,
					name: 'M1',
					public: true
				},
				direction: 'Rosenthal Nord (Berlin)'
			}
		]
	},
	{
		type: 'journey',
		legs: [
			{
				origin: {
					type: 'station',
					id: '300188027',
					name: 'S Ostbahnhof (Berlin)',
					location: {
						type: 'location',
						id: '300188027',
						latitude: 52.510946,
						longitude: 13.435359
					}
				},
				destination: {
					type: 'stop',
					id: '300188611',
					name: 'S Ostbahnhof (Berlin)',
					location: {
						type: 'location',
						id: '300188611',
						latitude: 52.510721,
						longitude: 13.435556
					},
					station: {
						type: 'station',
						id: '900120005',
						name: 'S Ostbahnhof (Berlin)',
						location: {
							type: 'location',
							id: '900120005',
							latitude: 52.510335,
							longitude: 13.435089
						}
					}
				},
				arrival: '2021-09-30T23:26:00+02:00',
				plannedArrival: '2021-09-30T23:26:00+02:00',
				arrivalDelay: null,
				departure: '2021-09-30T23:25:00+02:00',
				plannedDeparture: '2021-09-30T23:25:00+02:00',
				departureDelay: null,
				public: true,
				walking: true,
				distance: 28,
				duration: 60
			},
			{
				origin: {
					type: 'stop',
					id: '300188611',
					name: 'S Ostbahnhof (Berlin)',
					location: {
						type: 'location',
						id: '300188611',
						latitude: 52.510721,
						longitude: 13.435556
					},
					station: {
						type: 'station',
						id: '900120005',
						name: 'S Ostbahnhof (Berlin)',
						location: {
							type: 'location',
							id: '900120005',
							latitude: 52.510335,
							longitude: 13.435089
						}
					}
				},
				destination: {
					type: 'stop',
					id: '300212030',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212030',
						latitude: 52.522722,
						longitude: 13.402431
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				arrival: '2021-09-30T23:31:00+02:00',
				plannedArrival: '2021-09-30T23:31:00+02:00',
				arrivalDelay: null,
				departure: '2021-09-30T23:26:00+02:00',
				plannedDeparture: '2021-09-30T23:26:00+02:00',
				departureDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: '4',
				departurePlatform: null,
				plannedDeparturePlatform: '11',
				tripId: '1|20898|0|86|30092021',
				line: {
					type: 'line',
					id: 's7',
					fahrtNr: null,
					name: 'S7',
					public: true
				},
				direction: 'S Charlottenburg Bhf (Berlin)'
			},
			{
				origin: {
					type: 'stop',
					id: '300212030',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212030',
						latitude: 52.522722,
						longitude: 13.402431
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				destination: {
					type: 'stop',
					id: '300212015',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212015',
						latitude: 52.522596,
						longitude: 13.403312
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				arrival: '2021-09-30T23:34:00+02:00',
				plannedArrival: '2021-09-30T23:34:00+02:00',
				arrivalDelay: null,
				departure: '2021-09-30T23:31:00+02:00',
				plannedDeparture: '2021-09-30T23:31:00+02:00',
				departureDelay: null,
				public: true,
				walking: true,
				distance: 61,
				duration: 180
			},
			{
				origin: {
					type: 'stop',
					id: '300212015',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212015',
						latitude: 52.522596,
						longitude: 13.403312
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				destination: {
					type: 'stop',
					id: '302207004',
					name: 'Schwedter Str. (Berlin)',
					location: {
						type: 'location',
						id: '302207004',
						latitude: 52.537033,
						longitude: 13.408229
					},
					station: {
						type: 'station',
						id: '900110505',
						name: 'Schwedter Str. (Berlin)',
						location: {
							type: 'location',
							id: '900110505',
							latitude: 52.536835,
							longitude: 13.407959
						}
					}
				},
				arrival: '2021-09-30T23:43:00+02:00',
				plannedArrival: '2021-09-30T23:43:00+02:00',
				arrivalDelay: null,
				departure: '2021-09-30T23:36:00+02:00',
				plannedDeparture: '2021-09-30T23:36:00+02:00',
				departureDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				tripId: '1|16144|7|86|30092021',
				line: {
					type: 'line',
					id: 'm1',
					fahrtNr: null,
					name: 'M1',
					public: true
				},
				direction: 'Rosenthal Nord (Berlin)'
			}
		]
	},
	{
		type: 'journey',
		legs: [
			{
				origin: {
					type: 'stop',
					id: '300188611',
					name: 'S Ostbahnhof (Berlin)',
					location: {
						type: 'location',
						id: '300188611',
						latitude: 52.510721,
						longitude: 13.435556
					},
					station: {
						type: 'station',
						id: '900120005',
						name: 'S Ostbahnhof (Berlin)',
						location: {
							type: 'location',
							id: '900120005',
							latitude: 52.510335,
							longitude: 13.435089
						}
					}
				},
				destination: {
					type: 'stop',
					id: '300212030',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212030',
						latitude: 52.522722,
						longitude: 13.402431
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				arrival: '2021-09-30T23:31:00+02:00',
				plannedArrival: '2021-09-30T23:31:00+02:00',
				arrivalDelay: null,
				departure: '2021-09-30T23:26:00+02:00',
				plannedDeparture: '2021-09-30T23:26:00+02:00',
				departureDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: '4',
				departurePlatform: null,
				plannedDeparturePlatform: '11',
				tripId: '1|20898|0|86|30092021',
				line: {
					type: 'line',
					id: 's7',
					fahrtNr: null,
					name: 'S7',
					public: true
				},
				direction: 'S Charlottenburg Bhf (Berlin)'
			},
			{
				origin: {
					type: 'stop',
					id: '300212030',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212030',
						latitude: 52.522722,
						longitude: 13.402431
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				destination: {
					type: 'stop',
					id: '300212015',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212015',
						latitude: 52.522596,
						longitude: 13.403312
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				arrival: '2021-09-30T23:34:00+02:00',
				plannedArrival: '2021-09-30T23:34:00+02:00',
				arrivalDelay: null,
				departure: '2021-09-30T23:31:00+02:00',
				plannedDeparture: '2021-09-30T23:31:00+02:00',
				departureDelay: null,
				public: true,
				walking: true,
				distance: 61,
				duration: 180
			},
			{
				origin: {
					type: 'stop',
					id: '300212015',
					name: 'S Hackescher Markt (Berlin)',
					location: {
						type: 'location',
						id: '300212015',
						latitude: 52.522596,
						longitude: 13.403312
					},
					station: {
						type: 'station',
						id: '900100002',
						name: 'S Hackescher Markt (Berlin)',
						location: {
							type: 'location',
							id: '900100002',
							latitude: 52.522605,
							longitude: 13.402359
						}
					}
				},
				destination: {
					type: 'stop',
					id: '302207004',
					name: 'Schwedter Str. (Berlin)',
					location: {
						type: 'location',
						id: '302207004',
						latitude: 52.537033,
						longitude: 13.408229
					},
					station: {
						type: 'station',
						id: '900110505',
						name: 'Schwedter Str. (Berlin)',
						location: {
							type: 'location',
							id: '900110505',
							latitude: 52.536835,
							longitude: 13.407959
						}
					}
				},
				arrival: '2021-09-30T23:43:00+02:00',
				plannedArrival: '2021-09-30T23:43:00+02:00',
				arrivalDelay: null,
				departure: '2021-09-30T23:36:00+02:00',
				plannedDeparture: '2021-09-30T23:36:00+02:00',
				departureDelay: null,
				arrivalPlatform: null,
				plannedArrivalPlatform: null,
				departurePlatform: null,
				plannedDeparturePlatform: null,
				tripId: '1|16144|7|86|30092021',
				line: {
					type: 'line',
					id: 'm1',
					fahrtNr: null,
					name: 'M1',
					public: true
				},
				direction: 'Rosenthal Nord (Berlin)'
			}
		]
	}
]

export {
	expected,
}
