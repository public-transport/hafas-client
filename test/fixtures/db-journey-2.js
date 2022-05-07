const dbJourney = {
	type: 'journey',
	legs: [
		{
			origin: {
				type: 'stop',
				id: '8004154',
				name: 'München-Mittersendling',
				location: {
					type: 'location',
					id: '8004154',
					latitude: 48.107418,
					longitude: 11.536306
				},
				products: {
					nationalExpress: false,
					national: false,
					regionalExp: false,
					regional: true,
					suburban: true,
					bus: false,
					ferry: false,
					subway: false,
					tram: false,
					taxi: false
				}
			},
			destination: {
				type: 'stop',
				id: '8004137',
				name: 'München Siemenswerke',
				location: {
					type: 'location',
					id: '8004137',
					latitude: 48.094492,
					longitude: 11.53281
				},
				products: {
					nationalExpress: false,
					national: false,
					regionalExp: false,
					regional: true,
					suburban: true,
					bus: true,
					ferry: false,
					subway: false,
					tram: false,
					taxi: false
				}
			},
			departure: '2020-11-16T10:04:00+01:00',
			plannedDeparture: '2020-11-16T10:04:00+01:00',
			departureDelay: null,
			departurePrognosisType: null,
			arrival: '2020-11-16T10:05:00+01:00',
			plannedArrival: '2020-11-16T10:05:00+01:00',
			arrivalDelay: null,
			arrivalPrognosisType: null,
			reachable: true,
			tripId: '1|9612|1|80|16112020',
			line: {
				type: 'line',
				id: '4-800725-7',
				fahrtNr: '6740',
				name: 'S 7',
				public: true,
				adminCode: '800725',
				productName: 'S',
				mode: 'train',
				product: 'suburban',
				operator: {
					type: 'operator',
					id: 'db-regio-ag-bayern',
					name: 'DB Regio AG Bayern'
				}
			},
			direction: 'Höllriegelskreuth',
			arrivalPlatform: '2',
			plannedArrivalPlatform: '2',
			departurePlatform: '2',
			plannedDeparturePlatform: '2',
			stopovers: [
				{
					stop: {
						type: 'stop',
						id: '8004154',
						name: 'München-Mittersendling',
						location: {
							type: 'location',
							id: '8004154',
							latitude: 48.107418,
							longitude: 11.536306
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExp: false,
							regional: true,
							suburban: true,
							bus: false,
							ferry: false,
							subway: false,
							tram: false,
							taxi: false
						}
					},
					arrival: null,
					plannedArrival: null,
					arrivalDelay: null,
					arrivalPlatform: null,
					plannedArrivalPlatform: null,
					arrivalPrognosisType: null,
					departure: '2020-11-16T10:04:00+01:00',
					plannedDeparture: '2020-11-16T10:04:00+01:00',
					departureDelay: null,
					departurePlatform: '2',
					plannedDeparturePlatform: '2',
					departurePrognosisType: null,
				},
				{
					stop: {
						type: 'stop',
						id: '8004137',
						name: 'München Siemenswerke',
						location: {
							type: 'location',
							id: '8004137',
							latitude: 48.094492,
							longitude: 11.53281
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExp: false,
							regional: true,
							suburban: true,
							bus: true,
							ferry: false,
							subway: false,
							tram: false,
							taxi: false
						}
					},
					arrival: '2020-11-16T10:05:00+01:00',
					plannedArrival: '2020-11-16T10:05:00+01:00',
					arrivalDelay: null,
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
			remarks: [
				{
					type: 'hint',
					code: 'PB',
					text: 'Obligation to cover nose and mouth'
				},
				{
					text: 'Number of bicycles conveyed limited',
					type: 'hint',
					code: 'bicycle-conveyance',
					summary: 'bicycles conveyed'
				},
				{
					type: 'hint',
					code: 'FS',
					text: 'conveying bicycles: mind the excluded times'
				},
				{
					text: '2nd class only',
					type: 'hint',
					code: '2nd-class-only',
					summary: '2. class only'
				}
			],
			cycle: {min: 1200, max: 1200, nr: 7}
		},
		{
			origin: {
				type: 'stop',
				id: '8004137',
				name: 'München Siemenswerke',
				location: {
					type: 'location',
					id: '8004137',
					latitude: 48.094492,
					longitude: 11.53281
				},
				products: {
					nationalExpress: false,
					national: false,
					regionalExp: false,
					regional: true,
					suburban: true,
					bus: true,
					ferry: false,
					subway: false,
					tram: false,
					taxi: false
				}
			},
			destination: {
				type: 'stop',
				id: '625016',
				name: 'Obersendling, München',
				location: {
					type: 'location',
					id: '625016',
					latitude: 48.098357,
					longitude: 11.536261
				},
				products: {
					nationalExpress: false,
					national: false,
					regionalExp: false,
					regional: false,
					suburban: false,
					bus: true,
					ferry: false,
					subway: true,
					tram: false,
					taxi: false
				},
				station: {
					type: 'station',
					id: '625021',
					name: 'Obersendling, München',
					location: {
						type: 'location',
						id: '625021',
						latitude: 48.098627,
						longitude: 11.538023
					},
					products: {
						nationalExpress: false,
						national: false,
						regionalExp: false,
						regional: false,
						suburban: false,
						bus: true,
						ferry: false,
						subway: true,
						tram: false,
						taxi: false
					}
				}
			},
			departure: '2020-11-16T10:05:00+01:00',
			plannedDeparture: '2020-11-16T10:05:00+01:00',
			departureDelay: null,
			arrival: '2020-11-16T10:15:00+01:00',
			plannedArrival: '2020-11-16T10:15:00+01:00',
			arrivalDelay: null,
			public: true,
			walking: true,
			distance: 500,
			remarks: [ {type: 'hint', code: 'XK', text: 'walking distance 500 m'} ]
		},
		{
			origin: {
				type: 'stop',
				id: '625016',
				name: 'Obersendling, München',
				location: {
					type: 'location',
					id: '625016',
					latitude: 48.098357,
					longitude: 11.536261
				},
				products: {
					nationalExpress: false,
					national: false,
					regionalExp: false,
					regional: false,
					suburban: false,
					bus: true,
					ferry: false,
					subway: true,
					tram: false,
					taxi: false
				},
				station: {
					type: 'station',
					id: '625021',
					name: 'Obersendling, München',
					location: {
						type: 'location',
						id: '625021',
						latitude: 48.098627,
						longitude: 11.538023
					},
					products: {
						nationalExpress: false,
						national: false,
						regionalExp: false,
						regional: false,
						suburban: false,
						bus: true,
						ferry: false,
						subway: true,
						tram: false,
						taxi: false
					}
				}
			},
			destination: {
				type: 'stop',
				id: '624333',
				name: 'Bonner Platz, München',
				location: {
					type: 'location',
					id: '624333',
					latitude: 48.166702,
					longitude: 11.578151
				},
				products: {
					nationalExpress: false,
					national: false,
					regionalExp: false,
					regional: false,
					suburban: false,
					bus: false,
					ferry: false,
					subway: true,
					tram: false,
					taxi: false
				},
				station: {
					type: 'station',
					id: '790754',
					name: 'Bonner Platz, München',
					location: {
						type: 'location',
						id: '790754',
						latitude: 48.167035,
						longitude: 11.579347
					},
					products: {
						nationalExpress: false,
						national: false,
						regionalExp: false,
						regional: false,
						suburban: false,
						bus: false,
						ferry: false,
						subway: true,
						tram: false,
						taxi: false
					}
				}
			},
			departure: '2020-11-16T10:15:00+01:00',
			plannedDeparture: '2020-11-16T10:15:00+01:00',
			departureDelay: null,
			departurePrognosisType: null,
			arrival: '2020-11-16T10:33:00+01:00',
			plannedArrival: '2020-11-16T10:33:00+01:00',
			arrivalDelay: null,
			arrivalPrognosisType: null,
			reachable: true,
			tripId: '1|24525|9|80|16112020',
			line: {
				type: 'line',
				id: '7-swm001-3',
				fahrtNr: '3032',
				name: 'U 3',
				public: true,
				adminCode: 'swm001',
				productName: 'U',
				mode: 'train',
				product: 'subway'
			},
			direction: 'Moosach, München',
			arrivalPlatform: null,
			plannedArrivalPlatform: null,
			departurePlatform: null,
			plannedDeparturePlatform: null,
			stopovers: [
				{
					stop: {
						type: 'stop',
						id: '625016',
						name: 'Obersendling, München',
						location: {
							type: 'location',
							id: '625016',
							latitude: 48.098357,
							longitude: 11.536261
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExp: false,
							regional: false,
							suburban: false,
							bus: true,
							ferry: false,
							subway: true,
							tram: false,
							taxi: false
						},
						station: {
							type: 'station',
							id: '625021',
							name: 'Obersendling, München',
							location: {
								type: 'location',
								id: '625021',
								latitude: 48.098627,
								longitude: 11.538023
							},
							products: {
								nationalExpress: false,
								national: false,
								regionalExp: false,
								regional: false,
								suburban: false,
								bus: true,
								ferry: false,
								subway: true,
								tram: false,
								taxi: false
							}
						}
					},
					arrival: null,
					plannedArrival: null,
					arrivalDelay: null,
					arrivalPlatform: null,
					plannedArrivalPlatform: null,
					arrivalPrognosisType: null,
					departure: '2020-11-16T10:15:00+01:00',
					plannedDeparture: '2020-11-16T10:15:00+01:00',
					departureDelay: null,
					departurePlatform: null,
					plannedDeparturePlatform: null,
					departurePrognosisType: null,
				},
				{
					stop: {
						type: 'stop',
						id: '625236',
						name: 'Thalkirchen (Tierpark), München',
						location: {
							type: 'location',
							id: '625236',
							latitude: 48.102708,
							longitude: 11.546015
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExp: false,
							regional: false,
							suburban: false,
							bus: true,
							ferry: false,
							subway: true,
							tram: false,
							taxi: false
						},
						station: {
							type: 'station',
							id: '625242',
							name: 'Thalkirchen (Tierpark), München',
							location: {
								type: 'location',
								id: '625242',
								latitude: 48.101009,
								longitude: 11.54668
							},
							products: {
								nationalExpress: false,
								national: false,
								regionalExp: false,
								regional: false,
								suburban: false,
								bus: true,
								ferry: false,
								subway: true,
								tram: false,
								taxi: false
							}
						}
					},
					arrival: '2020-11-16T10:16:00+01:00',
					plannedArrival: '2020-11-16T10:16:00+01:00',
					arrivalDelay: null,
					arrivalPlatform: null,
					plannedArrivalPlatform: null,
					arrivalPrognosisType: null,
					departure: '2020-11-16T10:16:00+01:00',
					plannedDeparture: '2020-11-16T10:16:00+01:00',
					departureDelay: null,
					departurePlatform: null,
					plannedDeparturePlatform: null,
					departurePrognosisType: null,
				},
				{
					stop: {
						type: 'stop',
						id: '624342',
						name: 'Brudermühlstraße, München',
						location: {
							type: 'location',
							id: '624342',
							latitude: 48.112596,
							longitude: 11.548721
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExp: false,
							regional: false,
							suburban: false,
							bus: true,
							ferry: false,
							subway: true,
							tram: false,
							taxi: false
						},
						station: {
							type: 'station',
							id: '624345',
							name: 'Brudermühlstraße, München',
							location: {
								type: 'location',
								id: '624345',
								latitude: 48.112209,
								longitude: 11.548235
							},
							products: {
								nationalExpress: false,
								national: false,
								regionalExp: false,
								regional: false,
								suburban: false,
								bus: true,
								ferry: false,
								subway: true,
								tram: false,
								taxi: false
							}
						}
					},
					arrival: '2020-11-16T10:18:00+01:00',
					plannedArrival: '2020-11-16T10:18:00+01:00',
					arrivalDelay: null,
					arrivalPlatform: null,
					plannedArrivalPlatform: null,
					arrivalPrognosisType: null,
					departure: '2020-11-16T10:18:00+01:00',
					plannedDeparture: '2020-11-16T10:18:00+01:00',
					departureDelay: null,
					departurePlatform: null,
					plannedDeparturePlatform: null,
					departurePrognosisType: null,
				},
				{
					stop: {
						type: 'stop',
						id: '624684',
						name: 'Implerstraße, München',
						location: {
							type: 'location',
							id: '624684',
							latitude: 48.120138,
							longitude: 11.548433
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExp: false,
							regional: false,
							suburban: false,
							bus: true,
							ferry: false,
							subway: true,
							tram: false,
							taxi: false
						},
						station: {
							type: 'station',
							id: '624691',
							name: 'Implerstraße, München',
							location: {
								type: 'location',
								id: '624691',
								latitude: 48.119392,
								longitude: 11.548855
							},
							products: {
								nationalExpress: false,
								national: false,
								regionalExp: false,
								regional: false,
								suburban: false,
								bus: true,
								ferry: false,
								subway: true,
								tram: false,
								taxi: false
							}
						}
					},
					arrival: '2020-11-16T10:20:00+01:00',
					plannedArrival: '2020-11-16T10:20:00+01:00',
					arrivalDelay: null,
					arrivalPlatform: null,
					plannedArrivalPlatform: null,
					arrivalPrognosisType: null,
					departure: '2020-11-16T10:20:00+01:00',
					plannedDeparture: '2020-11-16T10:20:00+01:00',
					departureDelay: null,
					departurePlatform: null,
					plannedDeparturePlatform: null,
					departurePrognosisType: null,
				},
				{
					stop: {
						type: 'station',
						id: '625095',
						name: 'Poccistraße, München',
						location: {
							type: 'location',
							id: '625095',
							latitude: 48.125513,
							longitude: 11.550357
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExp: false,
							regional: false,
							suburban: false,
							bus: true,
							ferry: false,
							subway: true,
							tram: false,
							taxi: false
						}
					},
					arrival: '2020-11-16T10:21:00+01:00',
					plannedArrival: '2020-11-16T10:21:00+01:00',
					arrivalDelay: null,
					arrivalPlatform: null,
					plannedArrivalPlatform: null,
					arrivalPrognosisType: null,
					departure: '2020-11-16T10:21:00+01:00',
					plannedDeparture: '2020-11-16T10:21:00+01:00',
					departureDelay: null,
					departurePlatform: null,
					plannedDeparturePlatform: null,
					departurePrognosisType: null,
				},
				{
					stop: {
						type: 'station',
						id: '624535',
						name: 'Goetheplatz, München',
						location: {
							type: 'location',
							id: '624535',
							latitude: 48.129064,
							longitude: 11.557422
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExp: false,
							regional: false,
							suburban: false,
							bus: true,
							ferry: false,
							subway: true,
							tram: false,
							taxi: false
						}
					},
					arrival: '2020-11-16T10:22:00+01:00',
					plannedArrival: '2020-11-16T10:22:00+01:00',
					arrivalDelay: null,
					arrivalPlatform: null,
					plannedArrivalPlatform: null,
					arrivalPrognosisType: null,
					departure: '2020-11-16T10:22:00+01:00',
					plannedDeparture: '2020-11-16T10:22:00+01:00',
					departureDelay: null,
					departurePlatform: null,
					plannedDeparturePlatform: null,
					departurePrognosisType: null,
				},
				{
					stop: {
						type: 'station',
						id: '625176',
						name: 'Sendlinger Tor, München',
						location: {
							type: 'location',
							id: '625176',
							latitude: 48.133406,
							longitude: 11.566744
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExp: false,
							regional: false,
							suburban: false,
							bus: true,
							ferry: false,
							subway: true,
							tram: true,
							taxi: false
						}
					},
					arrival: '2020-11-16T10:24:00+01:00',
					plannedArrival: '2020-11-16T10:24:00+01:00',
					arrivalDelay: null,
					arrivalPlatform: null,
					plannedArrivalPlatform: null,
					arrivalPrognosisType: null,
					departure: '2020-11-16T10:24:00+01:00',
					plannedDeparture: '2020-11-16T10:24:00+01:00',
					departureDelay: null,
					departurePlatform: null,
					plannedDeparturePlatform: null,
					departurePrognosisType: null,
				},
				{
					stop: {
						type: 'stop',
						id: '624885',
						name: 'Marienplatz, München',
						location: {
							type: 'location',
							id: '624885',
							latitude: 48.137829,
							longitude: 11.576596
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExp: false,
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
							id: '8004135',
							name: 'München Marienplatz',
							location: {
								type: 'location',
								id: '8004135',
								latitude: 48.137047,
								longitude: 11.575383
							},
							products: {
								nationalExpress: false,
								national: false,
								regionalExp: false,
								regional: true,
								suburban: true,
								bus: true,
								ferry: false,
								subway: true,
								tram: false,
								taxi: false
							}
						}
					},
					arrival: '2020-11-16T10:26:00+01:00',
					plannedArrival: '2020-11-16T10:26:00+01:00',
					arrivalDelay: null,
					arrivalPlatform: null,
					plannedArrivalPlatform: null,
					arrivalPrognosisType: null,
					departure: '2020-11-16T10:26:00+01:00',
					plannedDeparture: '2020-11-16T10:26:00+01:00',
					departureDelay: null,
					departurePlatform: null,
					plannedDeparturePlatform: null,
					departurePrognosisType: null,
				},
				{
					stop: {
						type: 'stop',
						id: '638143',
						name: 'Odeonsplatz, München',
						location: {
							type: 'location',
							id: '638143',
							latitude: 48.143411,
							longitude: 11.57798
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExp: false,
							regional: true,
							suburban: false,
							bus: true,
							ferry: false,
							subway: true,
							tram: false,
							taxi: false
						},
						station: {
							type: 'station',
							id: '8070914',
							name: 'München Odeonsplatz',
							location: {
								type: 'location',
								id: '8070914',
								latitude: 48.142943,
								longitude: 11.577819
							},
							products: {
								nationalExpress: false,
								national: false,
								regionalExp: false,
								regional: true,
								suburban: false,
								bus: true,
								ferry: false,
								subway: true,
								tram: false,
								taxi: false
							}
						}
					},
					arrival: '2020-11-16T10:27:00+01:00',
					plannedArrival: '2020-11-16T10:27:00+01:00',
					arrivalDelay: null,
					arrivalPlatform: null,
					plannedArrivalPlatform: null,
					arrivalPrognosisType: null,
					departure: '2020-11-16T10:27:00+01:00',
					plannedDeparture: '2020-11-16T10:27:00+01:00',
					departureDelay: null,
					departurePlatform: null,
					plannedDeparturePlatform: null,
					departurePrognosisType: null,
				},
				{
					stop: {
						type: 'stop',
						id: '638611',
						name: 'Universität, München',
						location: {
							type: 'location',
							id: '638611',
							latitude: 48.150063,
							longitude: 11.581001
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExp: false,
							regional: false,
							suburban: false,
							bus: true,
							ferry: false,
							subway: true,
							tram: false,
							taxi: false
						},
						station: {
							type: 'station',
							id: '625286',
							name: 'Universität, München',
							location: {
								type: 'location',
								id: '625286',
								latitude: 48.148283,
								longitude: 11.580048
							},
							products: {
								nationalExpress: false,
								national: false,
								regionalExp: false,
								regional: false,
								suburban: false,
								bus: true,
								ferry: false,
								subway: true,
								tram: false,
								taxi: false
							}
						}
					},
					arrival: '2020-11-16T10:29:00+01:00',
					plannedArrival: '2020-11-16T10:29:00+01:00',
					arrivalDelay: null,
					arrivalPlatform: null,
					plannedArrivalPlatform: null,
					arrivalPrognosisType: null,
					departure: '2020-11-16T10:29:00+01:00',
					plannedDeparture: '2020-11-16T10:29:00+01:00',
					departureDelay: null,
					departurePlatform: null,
					plannedDeparturePlatform: null,
					departurePrognosisType: null,
				},
				{
					stop: {
						type: 'stop',
						id: '624521',
						name: 'Giselastraße, München',
						location: {
							type: 'location',
							id: '624521',
							latitude: 48.156517,
							longitude: 11.584003
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExp: false,
							regional: false,
							suburban: false,
							bus: true,
							ferry: false,
							subway: true,
							tram: false,
							taxi: false
						},
						station: {
							type: 'station',
							id: '624526',
							name: 'Giselastraße, München',
							location: {
								type: 'location',
								id: '624526',
								latitude: 48.157236,
								longitude: 11.584803
							},
							products: {
								nationalExpress: false,
								national: false,
								regionalExp: false,
								regional: false,
								suburban: false,
								bus: true,
								ferry: false,
								subway: true,
								tram: false,
								taxi: false
							}
						}
					},
					arrival: '2020-11-16T10:30:00+01:00',
					plannedArrival: '2020-11-16T10:30:00+01:00',
					arrivalDelay: null,
					arrivalPlatform: null,
					plannedArrivalPlatform: null,
					arrivalPrognosisType: null,
					departure: '2020-11-16T10:30:00+01:00',
					plannedDeparture: '2020-11-16T10:30:00+01:00',
					departureDelay: null,
					departurePlatform: null,
					plannedDeparturePlatform: null,
					departurePrognosisType: null,
				},
				{
					stop: {
						type: 'station',
						id: '624950',
						name: 'Münchner Freiheit, München',
						location: {
							type: 'location',
							id: '624950',
							latitude: 48.161839,
							longitude: 11.586331
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExp: false,
							regional: false,
							suburban: false,
							bus: true,
							ferry: false,
							subway: true,
							tram: true,
							taxi: false
						}
					},
					arrival: '2020-11-16T10:31:00+01:00',
					plannedArrival: '2020-11-16T10:31:00+01:00',
					arrivalDelay: null,
					arrivalPlatform: null,
					plannedArrivalPlatform: null,
					arrivalPrognosisType: null,
					departure: '2020-11-16T10:31:00+01:00',
					plannedDeparture: '2020-11-16T10:31:00+01:00',
					departureDelay: null,
					departurePlatform: null,
					plannedDeparturePlatform: null,
					departurePrognosisType: null,
				},
				{
					stop: {
						type: 'stop',
						id: '624333',
						name: 'Bonner Platz, München',
						location: {
							type: 'location',
							id: '624333',
							latitude: 48.166702,
							longitude: 11.578151
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExp: false,
							regional: false,
							suburban: false,
							bus: false,
							ferry: false,
							subway: true,
							tram: false,
							taxi: false
						},
						station: {
							type: 'station',
							id: '790754',
							name: 'Bonner Platz, München',
							location: {
								type: 'location',
								id: '790754',
								latitude: 48.167035,
								longitude: 11.579347
							},
							products: {
								nationalExpress: false,
								national: false,
								regionalExp: false,
								regional: false,
								suburban: false,
								bus: false,
								ferry: false,
								subway: true,
								tram: false,
								taxi: false
							}
						}
					},
					arrival: '2020-11-16T10:33:00+01:00',
					plannedArrival: '2020-11-16T10:33:00+01:00',
					arrivalDelay: null,
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
			cycle: {min: 600, max: 600, nr: 13}
		},
		{
			origin: {
				type: 'stop',
				id: '624333',
				name: 'Bonner Platz, München',
				location: {
					type: 'location',
					id: '624333',
					latitude: 48.166702,
					longitude: 11.578151
				},
				products: {
					nationalExpress: false,
					national: false,
					regionalExp: false,
					regional: false,
					suburban: false,
					bus: false,
					ferry: false,
					subway: true,
					tram: false,
					taxi: false
				},
				station: {
					type: 'station',
					id: '790754',
					name: 'Bonner Platz, München',
					location: {
						type: 'location',
						id: '790754',
						latitude: 48.167035,
						longitude: 11.579347
					},
					products: {
						nationalExpress: false,
						national: false,
						regionalExp: false,
						regional: false,
						suburban: false,
						bus: false,
						ferry: false,
						subway: true,
						tram: false,
						taxi: false
					}
				}
			},
			destination: {
				type: 'station',
				id: '621790',
				name: 'Karl-Theodor-Straße, München',
				location: {
					type: 'location',
					id: '621790',
					latitude: 48.166918,
					longitude: 11.574043
				},
				products: {
					nationalExpress: false,
					national: false,
					regionalExp: false,
					regional: false,
					suburban: false,
					bus: false,
					ferry: false,
					subway: false,
					tram: true,
					taxi: false
				}
			},
			departure: '2020-11-16T10:33:00+01:00',
			plannedDeparture: '2020-11-16T10:33:00+01:00',
			departureDelay: null,
			arrival: '2020-11-16T10:38:00+01:00',
			plannedArrival: '2020-11-16T10:38:00+01:00',
			arrivalDelay: null,
			public: true,
			walking: true,
			distance: 353
		}
	],
	refreshToken: '¶HKI¶T$A=1@O=München-Mittersendling@L=8004154@a=128@$A=1@O=München Siemenswerke@L=8004137@a=128@$202011161004$202011161005$S      7$$1$$$§W$A=1@O=München Siemenswerke@L=8004137@a=128@$A=1@O=Obersendling, München@L=625016@a=128@$202011161005$202011161015$$$1$$$§T$A=1@O=Obersendling, München@L=625016@a=128@$A=1@O=Bonner Platz, München@L=624333@a=128@$202011161015$202011161033$U      3$$1$$$§G@F$A=1@O=Bonner Platz, München@L=624333@a=128@$A=1@O=Karl-Theodor-Straße, München@L=621790@a=128@$202011161033$202011161038$$$1$$$¶GP¶ft@0@2000@120@1@100@1@1000@0@@@@@false@0@-1@$f@$f@$f@$f@$f@$§bt@0@2000@120@1@100@1@1000@0@@@@@false@0@-1@$f@$f@$f@$f@$f@$§tt@0@5000@120@1@100@1@2500@0@@@@@false@0@-1@$t@0@25000@120@1@100@1@3000@0@@@@@false@0@-1@$f@$f@$f@$f@$§',
	cycle: {min: 1200},
	price: null
}

export {
	dbJourney,
}
