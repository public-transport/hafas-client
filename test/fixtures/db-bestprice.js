const json = `
{
    "bestPrices": [
        {
            "journeys": [
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000252",
                                "name": "Minden(Westf)",
                                "location": {
                                    "type": "location",
                                    "id": "8000252",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": false,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": false,
                                    "taxi": true
                                }
                            },
                            "departure": "2023-06-15T12:00:00+02:00",
                            "plannedDeparture": "2023-06-15T12:00:00+02:00",
                            "departureDelay": 0,
                            "arrival": "2023-06-15T12:30:00+02:00",
                            "plannedArrival": "2023-06-15T12:30:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|289982|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "re-89715",
                                "fahrtNr": null,
                                "name": "RE 89715",
                                "public": true,
                                "productName": "RE"
                            },
                            "direction": null,
                            "currentLocation": {
                                "type": "location",
                                "latitude": 51.534987,
                                "longitude": 7.527747
                            },
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "13",
                            "plannedDeparturePlatform": "13",
                            "departurePrognosisType": "prognosed"
                        },
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000252",
                                "name": "Minden(Westf)",
                                "location": {
                                    "type": "location",
                                    "id": "8000252",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": false,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": false,
                                    "taxi": true
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000152",
                                "name": "Hannover Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000152",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "departure": "2023-06-15T12:47:00+02:00",
                            "plannedDeparture": "2023-06-15T12:47:00+02:00",
                            "departureDelay": null,
                            "arrival": "2023-06-15T13:22:00+02:00",
                            "plannedArrival": "2023-06-15T13:22:00+02:00",
                            "arrivalDelay": 0,
                            "reachable": true,
                            "tripId": "1|322267|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "ic-143",
                                "fahrtNr": null,
                                "name": "IC 143",
                                "public": true,
                                "productName": "IC"
                            },
                            "direction": null,
                            "currentLocation": {
                                "type": "location",
                                "latitude": 52.273163,
                                "longitude": 6.777273
                            },
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": "prognosed",
                            "departurePlatform": "9",
                            "plannedDeparturePlatform": "9",
                            "departurePrognosisType": null
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Minden(Westf)@L=8000252@a=0@$202306151200$202306151230$RE 89715$$1$$$$$$§T$A=1@O=Minden(Westf)@L=8000252@a=0@$A=1@O=Hannover Hbf@L=8000152@a=0@$202306151247$202306151322$IC   143$$1$$$$$$",
                    "price": {
                        "amount": 31,
                        "currency": "EUR",
                        "hint": null
                    },
					"tickets": [                                                                                                                
						{                                                                                                                        
							"name": "To offer selection",                                                                                                 
							"priceObj": {                                                                                                          
								"amount": 3100                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                },
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000152",
                                "name": "Hannover Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000152",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "departure": "2023-06-15T11:38:00+02:00",
                            "plannedDeparture": "2023-06-15T11:38:00+02:00",
                            "departureDelay": 0,
                            "arrival": "2023-06-15T12:31:00+02:00",
                            "plannedArrival": "2023-06-15T12:31:00+02:00",
                            "arrivalDelay": 0,
                            "reachable": true,
                            "tripId": "1|222760|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "ice-847",
                                "fahrtNr": null,
                                "name": "ICE 847",
                                "public": true,
                                "productName": "ICE"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": "prognosed",
                            "departurePlatform": "9",
                            "plannedDeparturePlatform": "9",
                            "departurePrognosisType": "prognosed"
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Hannover Hbf@L=8000152@a=0@$202306151138$202306151231$ICE  847$$3$$$$$$",
                    "price": {
                        "amount": 34.1,
                        "currency": "EUR",
                        "hint": null
                    },
					"tickets": [                                                                                                                
						{                                                                                                                        
							"name": "To offer selection",                                                                                                 
							"priceObj": {                                                                                                          
								"amount": 3410                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                },
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000152",
                                "name": "Hannover Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000152",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "departure": "2023-06-15T12:42:00+02:00",
                            "plannedDeparture": "2023-06-15T12:38:00+02:00",
                            "departureDelay": 240,
                            "arrival": "2023-06-15T13:31:00+02:00",
                            "plannedArrival": "2023-06-15T13:31:00+02:00",
                            "arrivalDelay": 0,
                            "reachable": true,
                            "tripId": "1|219255|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "ice-547",
                                "fahrtNr": null,
                                "name": "ICE 547",
                                "public": true,
                                "productName": "ICE"
                            },
                            "direction": null,
                            "currentLocation": {
                                "type": "location",
                                "latitude": 51.255836,
                                "longitude": 6.792231
                            },
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": "prognosed",
                            "departurePlatform": "9",
                            "plannedDeparturePlatform": "9",
                            "departurePrognosisType": "prognosed"
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Hannover Hbf@L=8000152@a=0@$202306151238$202306151331$ICE  547$$1$$$$$$",
                    "price": {
                        "amount": 34.1,
                        "currency": "EUR",
                        "hint": null
                    },
					"tickets": [                                                                                                                
						{                                                                                                                        
							"name": "To offer selection",                                                                                                 
							"priceObj": {                                                                                                          
								"amount": 3410                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                }
            ],
            "from": "2023-06-15T10:00:00+02:00",
            "to": "2023-06-15T13:00:00+02:00",
            "bestPrice": {
                "amount": 31,
                "currency": "EUR"
            }
		},
        {
            "journeys": [
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000152",
                                "name": "Hannover Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000152",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "departure": "2023-06-15T14:38:00+02:00",
                            "plannedDeparture": "2023-06-15T14:38:00+02:00",
                            "departureDelay": null,
                            "arrival": "2023-06-15T15:31:00+02:00",
                            "plannedArrival": "2023-06-15T15:31:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|219321|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "ice-549",
                                "fahrtNr": null,
                                "name": "ICE 549",
                                "public": true,
                                "productName": "ICE"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "9",
                            "plannedDeparturePlatform": "9",
                            "departurePrognosisType": null
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Hannover Hbf@L=8000152@a=0@$202306151438$202306151531$ICE  549$$1$$$$$$",
                    "price": {
                        "amount": 29.9,
                        "currency": "EUR",
                        "hint": null
                    },
					"tickets": [                                                                                                                
						{                                                                                                                        
							"name": "To offer selection",                                                                                                 
							"priceObj": {                                                                                                          
								"amount": 2990                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                },
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000152",
                                "name": "Hannover Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000152",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "departure": "2023-06-15T15:38:00+02:00",
                            "plannedDeparture": "2023-06-15T15:38:00+02:00",
                            "departureDelay": null,
                            "arrival": "2023-06-15T16:31:00+02:00",
                            "plannedArrival": "2023-06-15T16:31:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|223754|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "ice-941",
                                "fahrtNr": null,
                                "name": "ICE 941",
                                "public": true,
                                "productName": "ICE"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "9",
                            "plannedDeparturePlatform": "9",
                            "departurePrognosisType": null
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Hannover Hbf@L=8000152@a=0@$202306151538$202306151631$ICE  941$$1$$$$$$",
                    "price": {
                        "amount": 29.9,
                        "currency": "EUR",
                        "hint": null
                    },
					"tickets": [                                                                                                                
						{                                                                                                                        
							"name": "To offer selection",                                                                                                 
							"priceObj": {                                                                                                          
								"amount": 2990                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                },
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000732",
                                "name": "Bad Oeynhausen",
                                "location": {
                                    "type": "location",
                                    "id": "8000732",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": false,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": false,
                                    "taxi": true
                                }
                            },
                            "departure": "2023-06-15T14:00:00+02:00",
                            "plannedDeparture": "2023-06-15T14:00:00+02:00",
                            "departureDelay": 0,
                            "arrival": "2023-06-15T14:18:00+02:00",
                            "plannedArrival": "2023-06-15T14:18:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|290018|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "re-89719",
                                "fahrtNr": null,
                                "name": "RE 89719",
                                "public": true,
                                "productName": "RE"
                            },
                            "direction": null,
                            "currentLocation": {
                                "type": "location",
                                "latitude": 50.93671,
                                "longitude": 6.994884
                            },
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "1",
                            "plannedDeparturePlatform": "1",
                            "departurePrognosisType": "prognosed"
                        },
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000732",
                                "name": "Bad Oeynhausen",
                                "location": {
                                    "type": "location",
                                    "id": "8000732",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": false,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": false,
                                    "taxi": true
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000152",
                                "name": "Hannover Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000152",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "departure": "2023-06-15T14:37:00+02:00",
                            "plannedDeparture": "2023-06-15T14:37:00+02:00",
                            "departureDelay": null,
                            "arrival": "2023-06-15T15:21:00+02:00",
                            "plannedArrival": "2023-06-15T15:21:00+02:00",
                            "arrivalDelay": 0,
                            "reachable": true,
                            "tripId": "1|322325|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "ic-145",
                                "fahrtNr": null,
                                "name": "IC 145",
                                "public": true,
                                "productName": "IC"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": "prognosed",
                            "departurePlatform": "9",
                            "plannedDeparturePlatform": "9",
                            "departurePrognosisType": null
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Bad Oeynhausen@L=8000732@a=0@$202306151400$202306151418$RE 89719$$1$$$$$$§T$A=1@O=Bad Oeynhausen@L=8000732@a=0@$A=1@O=Hannover Hbf@L=8000152@a=0@$202306151437$202306151521$IC   145$$1$$$$$$",
                    "price": {
                        "amount": 31,
                        "currency": "EUR",
                        "hint": null
                    },
					"tickets": [                                                                                                                
						{                                                                                                                        
							"name": "To offer selection",                                                                                                 
							"priceObj": {                                                                                                          
								"amount": 3100                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                },
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000152",
                                "name": "Hannover Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000152",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "departure": "2023-06-15T13:38:00+02:00",
                            "plannedDeparture": "2023-06-15T13:38:00+02:00",
                            "departureDelay": null,
                            "arrival": "2023-06-15T14:31:00+02:00",
                            "plannedArrival": "2023-06-15T14:31:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|222817|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "ice-849",
                                "fahrtNr": null,
                                "name": "ICE 849",
                                "public": true,
                                "productName": "ICE"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "9",
                            "plannedDeparturePlatform": "9",
                            "departurePrognosisType": null
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Hannover Hbf@L=8000152@a=0@$202306151338$202306151431$ICE  849$$1$$$$$$",
                    "price": {
                        "amount": 34.1,
                        "currency": "EUR",
                        "hint": null
                    },
					"tickets": [                                                                                                                
						{                                                                                                                        
							"name": "To offer selection",                                                                                                 
							"priceObj": {                                                                                                          
								"amount": 3410                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                }
            ],
            "from": "2023-06-15T13:00:00+02:00",
            "to": "2023-06-15T16:00:00+02:00",
            "bestPrice": {
                "amount": 29.9,
                "currency": "EUR"
            }
        },
        {
            "journeys": [
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000732",
                                "name": "Bad Oeynhausen",
                                "location": {
                                    "type": "location",
                                    "id": "8000732",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": false,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": false,
                                    "taxi": true
                                }
                            },
                            "departure": "2023-06-15T18:00:00+02:00",
                            "plannedDeparture": "2023-06-15T18:00:00+02:00",
                            "departureDelay": 0,
                            "arrival": "2023-06-15T18:18:00+02:00",
                            "plannedArrival": "2023-06-15T18:18:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|290099|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "re-89727",
                                "fahrtNr": null,
                                "name": "RE 89727",
                                "public": true,
                                "productName": "RE"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "1",
                            "plannedDeparturePlatform": "1",
                            "departurePrognosisType": "prognosed"
                        },
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000732",
                                "name": "Bad Oeynhausen",
                                "location": {
                                    "type": "location",
                                    "id": "8000732",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": false,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": false,
                                    "taxi": true
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000152",
                                "name": "Hannover Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000152",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "departure": "2023-06-15T18:37:00+02:00",
                            "plannedDeparture": "2023-06-15T18:37:00+02:00",
                            "departureDelay": null,
                            "arrival": "2023-06-15T19:21:00+02:00",
                            "plannedArrival": "2023-06-15T19:21:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|322447|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "ic-149",
                                "fahrtNr": null,
                                "name": "IC 149",
                                "public": true,
                                "productName": "IC"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "9",
                            "plannedDeparturePlatform": "9",
                            "departurePrognosisType": null
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Bad Oeynhausen@L=8000732@a=0@$202306151800$202306151818$RE 89727$$1$$$$$$§T$A=1@O=Bad Oeynhausen@L=8000732@a=0@$A=1@O=Hannover Hbf@L=8000152@a=0@$202306151837$202306151921$IC   149$$1$$$$$$",
                    "price": {
                        "amount": 28.9,
                        "currency": "EUR",
                        "hint": null
                    },
					"tickets": [                                                                                                                
						{                                                                                                                        
							"name": "To offer selection",                                                                                                 
							"priceObj": {                                                                                                          
								"amount": 2890                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                },
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000152",
                                "name": "Hannover Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000152",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "departure": "2023-06-15T17:38:00+02:00",
                            "plannedDeparture": "2023-06-15T17:38:00+02:00",
                            "departureDelay": null,
                            "arrival": "2023-06-15T18:31:00+02:00",
                            "plannedArrival": "2023-06-15T18:31:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|223803|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "ice-943",
                                "fahrtNr": null,
                                "name": "ICE 943",
                                "public": true,
                                "productName": "ICE"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "9",
                            "plannedDeparturePlatform": "9",
                            "departurePrognosisType": null
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Hannover Hbf@L=8000152@a=0@$202306151738$202306151831$ICE  943$$1$$$$$$",
                    "price": {
                        "amount": 29.9,
                        "currency": "EUR",
                        "hint": null
                    },
					"tickets": [                                                                                                                
						{                                                                                                                        
							"name": "To offer selection",                                                                                                 
							"priceObj": {                                                                                                          
								"amount": 2990                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                },
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000152",
                                "name": "Hannover Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000152",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "departure": "2023-06-15T18:38:00+02:00",
                            "plannedDeparture": "2023-06-15T18:38:00+02:00",
                            "departureDelay": null,
                            "arrival": "2023-06-15T19:31:00+02:00",
                            "plannedArrival": "2023-06-15T19:31:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|220731|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "ice-643",
                                "fahrtNr": null,
                                "name": "ICE 643",
                                "public": true,
                                "productName": "ICE"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "9",
                            "plannedDeparturePlatform": "9",
                            "departurePrognosisType": null
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Hannover Hbf@L=8000152@a=0@$202306151838$202306151931$ICE  643$$1$$$$$$",
                    "price": {
                        "amount": 29.9,
                        "currency": "EUR",
                        "hint": null
                    },
					"tickets": [                                                                                                                
						{                                                                                                                        
							"name": "To offer selection",                                                                                                 
							"priceObj": {                                                                                                          
								"amount": 2990                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                },
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000252",
                                "name": "Minden(Westf)",
                                "location": {
                                    "type": "location",
                                    "id": "8000252",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": false,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": false,
                                    "taxi": true
                                }
                            },
                            "departure": "2023-06-15T16:00:00+02:00",
                            "plannedDeparture": "2023-06-15T16:00:00+02:00",
                            "departureDelay": 0,
                            "arrival": "2023-06-15T16:30:00+02:00",
                            "plannedArrival": "2023-06-15T16:30:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|290056|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "re-89723",
                                "fahrtNr": null,
                                "name": "RE 89723",
                                "public": true,
                                "productName": "RE"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "13",
                            "plannedDeparturePlatform": "13",
                            "departurePrognosisType": "prognosed"
                        },
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000252",
                                "name": "Minden(Westf)",
                                "location": {
                                    "type": "location",
                                    "id": "8000252",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": false,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": false,
                                    "taxi": true
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000152",
                                "name": "Hannover Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000152",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "departure": "2023-06-15T16:47:00+02:00",
                            "plannedDeparture": "2023-06-15T16:47:00+02:00",
                            "departureDelay": null,
                            "arrival": "2023-06-15T17:21:00+02:00",
                            "plannedArrival": "2023-06-15T17:21:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|322378|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "ic-147",
                                "fahrtNr": null,
                                "name": "IC 147",
                                "public": true,
                                "productName": "IC"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "9",
                            "plannedDeparturePlatform": "9",
                            "departurePrognosisType": null
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Minden(Westf)@L=8000252@a=0@$202306151600$202306151630$RE 89723$$1$$$$$$§T$A=1@O=Minden(Westf)@L=8000252@a=0@$A=1@O=Hannover Hbf@L=8000152@a=0@$202306151647$202306151721$IC   147$$1$$$$$$",
                    "price": {
                        "amount": 31,
                        "currency": "EUR",
                        "hint": null
                    },
					"tickets": [                                                                                                                
						{                                                                                                                        
							"name": "To offer selection",                                                                                                 
							"priceObj": {                                                                                                          
								"amount": 3100                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                },
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000152",
                                "name": "Hannover Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000152",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "departure": "2023-06-15T16:38:00+02:00",
                            "plannedDeparture": "2023-06-15T16:38:00+02:00",
                            "departureDelay": null,
                            "arrival": "2023-06-15T17:31:00+02:00",
                            "plannedArrival": "2023-06-15T17:31:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|220684|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "ice-641",
                                "fahrtNr": null,
                                "name": "ICE 641",
                                "public": true,
                                "productName": "ICE"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "9",
                            "plannedDeparturePlatform": "9",
                            "departurePrognosisType": null
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Hannover Hbf@L=8000152@a=0@$202306151638$202306151731$ICE  641$$1$$$$$$",
                    "price": {
                        "amount": 34.1,
                        "currency": "EUR",
                        "hint": null
                    },
					"tickets": [                                                                                                                
						{                                                                                                                        
							"name": "To offer selection",                                                                                                 
							"priceObj": {                                                                                                          
								"amount": 3410                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                },
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000152",
                                "name": "Hannover Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000152",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "departure": "2023-06-15T18:42:00+02:00",
                            "plannedDeparture": "2023-06-15T18:42:00+02:00",
                            "departureDelay": null,
                            "arrival": "2023-06-15T19:55:00+02:00",
                            "plannedArrival": "2023-06-15T19:55:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|277033|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "flx-1239",
                                "fahrtNr": null,
                                "name": "FLX 1239",
                                "public": true,
                                "productName": "FLX"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "10",
                            "plannedDeparturePlatform": "10",
                            "departurePrognosisType": null,
                            "remarks": [
                                {
                                    "text": "RP",
                                    "type": "hint",
                                    "code": "compulsory-reservation",
                                    "summary": "compulsory seat reservation"
                                }
                            ]
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Hannover Hbf@L=8000152@a=0@$202306151842$202306151955$FLX 1239$$1$$$$$$",
                    "remarks": [],
                    "price": {
						"amount": -0.01,
						"currency": "EUR"
					},
					"tickets": [                                                                                                                
						{     
							"name": null,                                                                                                                   
							"priceObj": {                                                                                                          
								"amount": -1                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                }
            ],
            "from": "2023-06-15T16:00:00+02:00",
            "to": "2023-06-15T19:00:00+02:00",
            "bestPrice": {
                "amount": 28.9,
                "currency": "EUR"
            }
        },
        {
            "journeys": [
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000152",
                                "name": "Hannover Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000152",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "departure": "2023-06-15T20:38:00+02:00",
                            "plannedDeparture": "2023-06-15T20:38:00+02:00",
                            "departureDelay": null,
                            "arrival": "2023-06-15T21:31:00+02:00",
                            "plannedArrival": "2023-06-15T21:31:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|220789|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "ice-645",
                                "fahrtNr": null,
                                "name": "ICE 645",
                                "public": true,
                                "productName": "ICE"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "9",
                            "plannedDeparturePlatform": "9",
                            "departurePrognosisType": null
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Hannover Hbf@L=8000152@a=0@$202306152038$202306152131$ICE  645$$1$$$$$$",
                    "price": {
                        "amount": 9.9,
                        "currency": "EUR",
                        "hint": null
                    },
					"tickets": [                                                                                                                
						{                                                                                                                        
							"name": "To offer selection",                                                                                                 
							"priceObj": {                                                                                                          
								"amount": 990                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                },
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000152",
                                "name": "Hannover Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000152",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "departure": "2023-06-15T22:24:00+02:00",
                            "plannedDeparture": "2023-06-15T22:24:00+02:00",
                            "departureDelay": null,
                            "arrival": "2023-06-15T23:51:00+02:00",
                            "plannedArrival": "2023-06-15T23:51:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|1636803|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "wfb95847",
                                "fahrtNr": null,
                                "name": "WFB95847",
                                "public": true,
                                "productName": "WFB"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "12",
                            "plannedDeparturePlatform": "12",
                            "departurePrognosisType": null
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Hannover Hbf@L=8000152@a=0@$202306152224$202306152351$WFB95847$$1$$$$$$",
                    "price": {
                        "amount": 23.5,
                        "currency": "EUR",
                        "hint": null
                    },
					"tickets": [                                                                                                                
						{                                                                                                                        
							"name": "To offer selection",                                                                                                 
							"priceObj": {                                                                                                          
								"amount": 2350                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                },
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000252",
                                "name": "Minden(Westf)",
                                "location": {
                                    "type": "location",
                                    "id": "8000252",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": false,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": false,
                                    "taxi": true
                                }
                            },
                            "departure": "2023-06-15T23:00:00+02:00",
                            "plannedDeparture": "2023-06-15T23:00:00+02:00",
                            "departureDelay": 0,
                            "arrival": "2023-06-15T23:30:00+02:00",
                            "plannedArrival": "2023-06-15T23:30:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|290203|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "re-89737",
                                "fahrtNr": null,
                                "name": "RE 89737",
                                "public": true,
                                "productName": "RE"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "13",
                            "plannedDeparturePlatform": "13",
                            "departurePrognosisType": "prognosed"
                        },
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000252",
                                "name": "Minden(Westf)",
                                "location": {
                                    "type": "location",
                                    "id": "8000252",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": false,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": false,
                                    "taxi": true
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8005662",
                                "name": "Stadthagen",
                                "location": {
                                    "type": "location",
                                    "id": "8005662",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": false,
                                    "national": false,
                                    "regionalExpress": false,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": false,
                                    "taxi": true
                                }
                            },
                            "departure": "2023-06-15T23:35:00+02:00",
                            "plannedDeparture": "2023-06-15T23:35:00+02:00",
                            "departureDelay": null,
                            "arrival": "2023-06-15T23:49:00+02:00",
                            "plannedArrival": "2023-06-15T23:49:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|1089125|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "s-1",
                                "fahrtNr": null,
                                "name": "S 1",
                                "public": true,
                                "productName": "S"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "3",
                            "plannedDeparturePlatform": "3",
                            "departurePrognosisType": null
                        },
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8005662",
                                "name": "Stadthagen",
                                "location": {
                                    "type": "location",
                                    "id": "8005662",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": false,
                                    "national": false,
                                    "regionalExpress": false,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": false,
                                    "taxi": true
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8089194",
                                "name": "Hannover Hbf ZOB",
                                "location": {
                                    "type": "location",
                                    "id": "8089194",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                },
                                "station": {
                                    "type": "station",
                                    "id": "8000152",
                                    "name": "Hannover Hbf",
                                    "location": {
                                        "type": "location",
                                        "id": "8000152",
                                        "latitude": 0,
                                        "longitude": 0
                                    },
                                    "products": {
                                        "nationalExpress": true,
                                        "national": true,
                                        "regionalExpress": true,
                                        "regional": true,
                                        "suburban": true,
                                        "bus": true,
                                        "ferry": false,
                                        "subway": false,
                                        "tram": true,
                                        "taxi": false
                                    }
                                }
                            },
                            "departure": "2023-06-15T23:55:00+02:00",
                            "plannedDeparture": "2023-06-15T23:55:00+02:00",
                            "departureDelay": null,
                            "arrival": "2023-06-16T01:31:00+02:00",
                            "plannedArrival": "2023-06-16T01:31:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|1088997|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "bus-ev",
                                "fahrtNr": null,
                                "name": "Bus EV",
                                "public": true,
                                "productName": "Bus"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": null,
                            "plannedDeparturePlatform": null,
                            "departurePrognosisType": null
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Minden(Westf)@L=8000252@a=0@$202306152300$202306152330$RE 89737$$1$$$$$$§T$A=1@O=Minden(Westf)@L=8000252@a=0@$A=1@O=Stadthagen@L=8005662@a=0@$202306152335$202306152349$S      1$$1$$$$$$§T$A=1@O=Stadthagen@L=8005662@a=0@$A=1@O=Hannover Hbf ZOB@L=8089194@a=0@$202306152355$202306160131$Bus   EV$$1$$$$$$",
                    "remarks": [],
                    "price": {
                        "amount": 23.5,
                        "currency": "EUR",
                        "hint": null
                    },
					"tickets": [                                                                                                                
						{                                                                                                                        
							"name": "To offer selection",                                                                                                 
							"priceObj": {                                                                                                          
								"amount": 2350                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                },
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000252",
                                "name": "Minden(Westf)",
                                "location": {
                                    "type": "location",
                                    "id": "8000252",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": false,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": false,
                                    "taxi": true
                                }
                            },
                            "departure": "2023-06-15T20:00:00+02:00",
                            "plannedDeparture": "2023-06-15T20:00:00+02:00",
                            "departureDelay": 0,
                            "arrival": "2023-06-15T20:30:00+02:00",
                            "plannedArrival": "2023-06-15T20:30:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|290132|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "re-89731",
                                "fahrtNr": null,
                                "name": "RE 89731",
                                "public": true,
                                "productName": "RE"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "13",
                            "plannedDeparturePlatform": "13",
                            "departurePrognosisType": "prognosed"
                        },
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000252",
                                "name": "Minden(Westf)",
                                "location": {
                                    "type": "location",
                                    "id": "8000252",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": false,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": false,
                                    "taxi": true
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000152",
                                "name": "Hannover Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000152",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "departure": "2023-06-15T20:47:00+02:00",
                            "plannedDeparture": "2023-06-15T20:47:00+02:00",
                            "departureDelay": null,
                            "arrival": "2023-06-15T21:22:00+02:00",
                            "plannedArrival": "2023-06-15T21:22:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|325344|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "ic-241",
                                "fahrtNr": null,
                                "name": "IC 241",
                                "public": true,
                                "productName": "IC"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "9",
                            "plannedDeparturePlatform": "9",
                            "departurePrognosisType": null
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Minden(Westf)@L=8000252@a=0@$202306152000$202306152030$RE 89731$$1$$$$$$§T$A=1@O=Minden(Westf)@L=8000252@a=0@$A=1@O=Hannover Hbf@L=8000152@a=0@$202306152047$202306152122$IC   241$$1$$$$$$",
                    "price": {
                        "amount": 24.9,
                        "currency": "EUR",
                        "hint": null
                    },
					"tickets": [                                                                                                                
						{                                                                                                                        
							"name": "To offer selection",                                                                                                 
							"priceObj": {                                                                                                          
								"amount": 2490                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                },
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000152",
                                "name": "Hannover Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000152",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "departure": "2023-06-15T21:38:00+02:00",
                            "plannedDeparture": "2023-06-15T21:38:00+02:00",
                            "departureDelay": null,
                            "arrival": "2023-06-15T22:31:00+02:00",
                            "plannedArrival": "2023-06-15T22:31:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|223950|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "ice-947",
                                "fahrtNr": null,
                                "name": "ICE 947",
                                "public": true,
                                "productName": "ICE"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "9",
                            "plannedDeparturePlatform": "9",
                            "departurePrognosisType": null
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Hannover Hbf@L=8000152@a=0@$202306152138$202306152231$ICE  947$$1$$$$$$",
                    "price": {
                        "amount": 27.9,
                        "currency": "EUR",
                        "hint": null
                    },
					"tickets": [                                                                                                                
						{                                                                                                                        
							"name": "To offer selection",                                                                                                 
							"priceObj": {                                                                                                          
								"amount": 2790                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                },
                {
                    "type": "journey",
                    "legs": [
                        {
                            "origin": {
                                "type": "stop",
                                "id": "8000036",
                                "name": "Bielefeld Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000036",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": false,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "destination": {
                                "type": "stop",
                                "id": "8000152",
                                "name": "Hannover Hbf",
                                "location": {
                                    "type": "location",
                                    "id": "8000152",
                                    "latitude": 0,
                                    "longitude": 0
                                },
                                "products": {
                                    "nationalExpress": true,
                                    "national": true,
                                    "regionalExpress": true,
                                    "regional": true,
                                    "suburban": true,
                                    "bus": true,
                                    "ferry": false,
                                    "subway": false,
                                    "tram": true,
                                    "taxi": false
                                }
                            },
                            "departure": "2023-06-15T19:38:00+02:00",
                            "plannedDeparture": "2023-06-15T19:38:00+02:00",
                            "departureDelay": null,
                            "arrival": "2023-06-15T20:31:00+02:00",
                            "plannedArrival": "2023-06-15T20:31:00+02:00",
                            "arrivalDelay": null,
                            "reachable": true,
                            "tripId": "1|223858|0|80|-1",
                            "line": {
                                "type": "line",
                                "id": "ice-945",
                                "fahrtNr": null,
                                "name": "ICE 945",
                                "public": true,
                                "productName": "ICE"
                            },
                            "direction": null,
                            "arrivalPlatform": null,
                            "plannedArrivalPlatform": null,
                            "arrivalPrognosisType": null,
                            "departurePlatform": "9",
                            "plannedDeparturePlatform": "9",
                            "departurePrognosisType": null
                        }
                    ],
                    "refreshToken": "T$A=1@O=Bielefeld Hbf@L=8000036@a=0@$A=1@O=Hannover Hbf@L=8000152@a=0@$202306151938$202306152031$ICE  945$$1$$$$$$",
                    "price": {
                        "amount": 29.9,
                        "currency": "EUR",
                        "hint": null
                    },
					"tickets": [                                                                                                                
						{                                                                                                                        
							"name": "To offer selection",                                                                                                 
							"priceObj": {                                                                                                          
								"amount": 2990                                                                                                             
							}                                                                                                                            
						}                                                                                                                              
					]
                }
            ],
            "from": "2023-06-15T19:00:00+02:00",
            "to": "2023-06-16T00:00:00+02:00",
            "bestPrice": {
                "amount": 9.9,
                "currency": "EUR"
            }
        },
        {
            "journeys": [],
            "from": "2023-06-15T00:00:00+02:00",
            "to": "2023-06-15T07:00:00+02:00",
            "bestPrice": null
        },
        {
            "journeys": [],
            "from": "2023-06-15T07:00:00+02:00",
            "to": "2023-06-15T10:00:00+02:00",
            "bestPrice": null
        }
    ],
    "realtimeDataUpdatedAt": 1686819428
}
`;

const dbBestPrices = JSON.parse(json);

export {
	dbBestPrices,
};
