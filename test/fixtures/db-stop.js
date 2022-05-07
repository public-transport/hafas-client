const facilities = {
	'3SZentrale': '030/2971055',
	parkingLots: true,
	bicycleParkingRacks: true,
	localPublicTransport: true,
	toilets: true,
	lockers: true,
	travelShop: false,
	stepFreeAccess: true,
	boardingAid: 'ja, um voranmeldung unter 01806 512 512* wird gebeten',
	taxis: true,
}

const reisezentrumOpeningHours = {
	Mo: '08:00-20:00',
	Di: '08:00-20:00',
	Mi: '08:00-20:00',
	Do: '08:00-20:00',
	Fr: '08:00-20:00',
	Sa: '10:00-18:00',
	So: '10:00-18:00',
	raw: [
		['Mo', '08:00-20:00'],
		['Di', '08:00-20:00'],
		['Mi', '08:00-20:00'],
		['Do', '08:00-20:00'],
		['Fr', '08:00-20:00'],
		['Sa', '10:00-18:00'],
		['So', '10:00-18:00']
	],
}

const station = {
	type: 'station',
	id: '8011155',
	name: 'Berlin Alexanderplatz',
	location: {
		type: 'location',
		id: '8011155',
		latitude: 52.521526,
		longitude: 13.411088
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
		tram: true,
		taxi: false
	},
	transitAuthority: 'VBB',
	ids: {
		dhid: 'de:11000:900100003',
		VBB: '900100003',
	},
	facilities,
	reisezentrumOpeningHours,
}

const dbStop = {
	...station,
	stops: [{
		type: 'stop',
		id: '372948',
		ids: {
			dhid: 'de:11000:900100731',
			VBB: '900100731',
		},
		name: 'Alexanderpl (S+U)/Memhardstr.[4-5], Berlin',
		location: {
			type: 'location',
			id: '372948',
			latitude: 52.523513,
			longitude: 13.411366
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
			tram: true,
			taxi: false
		},
		station,
		transitAuthority: 'VBB',
		facilities,
		reisezentrumOpeningHours,
	}, {
		type: 'stop',
		id: '727273',
		ids: {
			dhid: 'de:11000:900100026',
			VBB: '900100026',
		},
		name: 'Alexanderplatz Bahnhof (S+U)/Gontardstr., Berlin',
		location: {
			type: 'location',
			id: '727273',
			latitude: 52.52087,
			longitude: 13.411609
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
			tram: true,
			taxi: false
		},
		station,
		transitAuthority: 'VBB',
		facilities,
		reisezentrumOpeningHours,
	}, {
		type: 'stop',
		id: '727460',
		ids: {
			dhid: 'de:11000:900100024',
			VBB: '900100024',
		},
		name: 'Alexanderplatz Bahnhof (S+U)/Dircksenstr., Berlin',
		location: {
			type: 'location',
			id: '727460',
			latitude: 52.521967,
			longitude: 13.41116
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
			tram: true,
			taxi: false
		},
		station,
		transitAuthority: 'VBB',
		facilities,
		reisezentrumOpeningHours,
	}, {
		type: 'stop',
		id: '727484',
		ids: {
			dhid: 'de:11000:900100031',
			VBB: '900100031',
		},
		name: 'Alexanderplatz Bahnhof (S+U)/Memhardstr., Berlin',
		location: {
			type: 'location',
			id: '727484',
			latitude: 52.522722,
			longitude: 13.410288
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
			tram: true,
			taxi: false
		},
		station,
		transitAuthority: 'VBB',
		facilities,
		reisezentrumOpeningHours,
	}, {
		type: 'stop',
		id: '728658',
		ids: {
			dhid: 'de:11000:900100707',
			VBB: '900100707',
		},
		name: 'Alexanderplatz [Bus] (U), Berlin',
		location: {
			type: 'location',
			id: '728658',
			latitude: 52.52318,
			longitude: 13.413946
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
			tram: true,
			taxi: false
		},
		station,
		transitAuthority: 'VBB',
		facilities
	}, {
		type: 'stop',
		id: '728659',
		ids: {
			dhid: 'de:11000:900100703',
			VBB: '900100703',
		},
		name: 'Alexanderplatz [U2] (S+U), Berlin',
		location: {
			type: 'location',
			id: '728659',
			latitude: 52.521742,
			longitude: 13.414045
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
			tram: true,
			taxi: false
		},
		station,
		transitAuthority: 'VBB',
		facilities,
		reisezentrumOpeningHours,
	}, {
		type: 'stop',
		id: '728660',
		ids: {
			dhid: 'de:11000:900100704',
			VBB: '900100704',
		},
		name: 'Alexanderplatz [U5] (S+U), Berlin',
		location: {
			type: 'location',
			id: '728660',
			latitude: 52.521661,
			longitude: 13.414045
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
			tram: true,
			taxi: false
		},
		station,
		transitAuthority: 'VBB',
		facilities,
		reisezentrumOpeningHours,
	}, {
		type: 'stop',
		id: '728735',
		ids: {
			dhid: 'de:11000:900100712',
			VBB: '900100712',
		},
		name: 'Alexanderpl. (S+U)/Grunerstr. [Alexanderstr.], Ber',
		location: {
			type: 'location',
			id: '728735',
			latitude: 52.520322,
			longitude: 13.415708
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
			tram: true,
			taxi: false
		},
		station,
		transitAuthority: 'VBB',
		facilities
	}, {
		type: 'stop',
		id: '732533',
		ids: {
			dhid: 'de:11000:900100705',
			VBB: '900100705',
		},
		name: 'Alexanderplatz [U8] (S+U), Berlin',
		location: {
			type: 'location',
			id: '732533',
			latitude: 52.521023,
			longitude: 13.412661
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
			tram: true,
			taxi: false
		},
		station,
		transitAuthority: 'VBB',
		facilities,
		reisezentrumOpeningHours,
	}, {
		type: 'stop',
		id: '732535',
		ids: {
			dhid: 'de:11000:900100005',
			VBB: '900100005',
		},
		name: 'Alexanderplatz [Tram] (U), Berlin',
		location: {
			type: 'location',
			id: '732535',
			latitude: 52.522119,
			longitude: 13.414683
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
			tram: true,
			taxi: false
		},
		station,
		transitAuthority: 'VBB',
		facilities
	}, {
		type: 'stop',
		id: '732536',
		ids: {
			dhid: 'de:11000:900100711',
			VBB: '900100711',
		},
		name: 'Alexanderplatz (S+U)/Grunerstr., Berlin',
		location: {
			type: 'location',
			id: '732536',
			latitude: 52.520825,
			longitude: 13.414926
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
			tram: true,
			taxi: false
		},
		station,
		transitAuthority: 'VBB',
		facilities
	}, {
		type: 'stop',
		id: '8089001',
		ids: {
			dhid: 'de:11000:900100003',
			VBB: '900100003',
		},
		name: 'Berlin Alexanderplatz (S)',
		location: {
			type: 'location',
			id: '8089001',
			latitude: 52.521643,
			longitude: 13.411097
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
			tram: true,
			taxi: false
		},
		transitAuthority: 'VBB',
		station,
		facilities,
		reisezentrumOpeningHours,
	}, {
		type: 'stop',
		id: '732594',
		ids: {
			VBB: '900100517',
		},
		name: 'Otto-Braun-Str./Alexanderplatz, Berlin',
		location: {
			type: 'location',
			id: '732594',
			latitude: 52.522066,
			longitude: 13.41658
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
			tram: false,
			taxi: false
		},
		transitAuthority: 'VBB',
	}],
	entrances: [{
		type: 'location', id: '608011155',
		latitude: 52.521814, longitude: 13.411456
	}, {
		type: 'location', id: '718011155',
		latitude: 52.521373, longitude: 13.413317
	}, {
		type: 'location', id: '708011155',
		latitude: 52.522317, longitude: 13.412895
	}, {
		type: 'location', id: '698011155',
		latitude: 52.520852, longitude: 13.412274
	}, {
		type: 'location', id: '688011155',
		latitude: 52.521176, longitude: 13.412463
	}, {
		type: 'location', id: '678011155',
		latitude: 52.520933, longitude: 13.41285
	}, {
		type: 'location', id: '668011155',
		latitude: 52.520798, longitude: 13.411717
	}, {
		type: 'location', id: '658011155',
		latitude: 52.52096, longitude: 13.414908
	}, {
		type: 'location', id: '648011155',
		latitude: 52.521724, longitude: 13.41027
	}, {
		type: 'location', id: '638011155',
		latitude: 52.52211, longitude: 13.410881
	}, {
		type: 'location', id: '628011155',
		latitude: 52.522119, longitude: 13.414647
	}, {
		type: 'location', id: '618011155',
		latitude: 52.521409, longitude: 13.410728
	}, {
		type: 'location', id: '8089001',
		latitude: 52.521643, longitude: 13.411097
	}, {
		type: 'location', id: '608089001',
		latitude: 52.521409, longitude: 13.410728
	}, {
		type: 'location', id: '718089001',
		latitude: 52.521373, longitude: 13.413317
	}, {
		type: 'location', id: '708089001',
		latitude: 52.522317, longitude: 13.412895
	}, {
		type: 'location', id: '698089001',
		latitude: 52.520852, longitude: 13.412274
	}, {
		type: 'location', id: '688089001',
		latitude: 52.521176, longitude: 13.412463
	}, {
		type: 'location', id: '678089001',
		latitude: 52.520933, longitude: 13.41285
	}, {
		type: 'location', id: '668089001',
		latitude: 52.520798, longitude: 13.411717
	}, {
		type: 'location', id: '658089001',
		latitude: 52.52096, longitude: 13.414908
	}, {
		type: 'location', id: '648089001',
		latitude: 52.521724, longitude: 13.41027
	}, {
		type: 'location', id: '638089001',
		latitude: 52.52211, longitude: 13.410881
	}, {
		type: 'location', id: '628089001',
		latitude: 52.522119, longitude: 13.414647
	}, {
		type: 'location', id: '618089001',
		latitude: 52.521814, longitude: 13.411456
	}, {
		type: 'location', id: '600732533',
		latitude: 52.520933, longitude: 13.41285
	}, {
		type: 'location', id: '710732533',
		latitude: 52.522317, longitude: 13.412895
	}, {
		type: 'location', id: '700732533',
		latitude: 52.520852, longitude: 13.412274
	}, {
		type: 'location', id: '690732533',
		latitude: 52.520798, longitude: 13.411717
	}, {
		type: 'location', id: '680732533',
		latitude: 52.52096, longitude: 13.414908
	}, {
		type: 'location', id: '670732533',
		latitude: 52.521724, longitude: 13.41027
	}, {
		type: 'location', id: '660732533',
		latitude: 52.52211, longitude: 13.410881
	}, {
		type: 'location', id: '650732533',
		latitude: 52.521409, longitude: 13.410728
	}, {
		type: 'location', id: '640732533',
		latitude: 52.521814, longitude: 13.411456
	}, {
		type: 'location', id: '630732533',
		latitude: 52.522119, longitude: 13.414647
	}, {
		type: 'location', id: '620732533',
		latitude: 52.521373, longitude: 13.413317
	}, {
		type: 'location', id: '610732533',
		latitude: 52.521176, longitude: 13.412463
	}, {
		type: 'location', id: '600728660',
		latitude: 52.521373, longitude: 13.413317
	}, {
		type: 'location', id: '710728660',
		latitude: 52.520852, longitude: 13.412274
	}, {
		type: 'location', id: '700728660',
		latitude: 52.521176, longitude: 13.412463
	}, {
		type: 'location', id: '690728660',
		latitude: 52.520933, longitude: 13.41285
	}, {
		type: 'location', id: '680728660',
		latitude: 52.520798, longitude: 13.411717
	}, {
		type: 'location', id: '670728660',
		latitude: 52.521724, longitude: 13.41027
	}, {
		type: 'location', id: '660728660',
		latitude: 52.52211, longitude: 13.410881
	}, {
		type: 'location', id: '650728660',
		latitude: 52.521409, longitude: 13.410728
	}, {
		type: 'location', id: '640728660',
		latitude: 52.521814, longitude: 13.411456
	}, {
		type: 'location', id: '630728660',
		latitude: 52.522317, longitude: 13.412895
	}, {
		type: 'location', id: '620728660',
		latitude: 52.522119, longitude: 13.414647
	}, {
		type: 'location', id: '610728660',
		latitude: 52.52096, longitude: 13.414908
	}, {
		type: 'location', id: '600728659',
		latitude: 52.522119, longitude: 13.414647
	}, {
		type: 'location', id: '710728659',
		latitude: 52.520852, longitude: 13.412274
	}, {
		type: 'location', id: '700728659',
		latitude: 52.521176, longitude: 13.412463
	}, {
		type: 'location', id: '690728659',
		latitude: 52.520933, longitude: 13.41285
	}, {
		type: 'location', id: '680728659',
		latitude: 52.520798, longitude: 13.411717
	}, {
		type: 'location', id: '670728659',
		latitude: 52.521724, longitude: 13.41027
	}, {
		type: 'location', id: '660728659',
		latitude: 52.52211, longitude: 13.410881
	}, {
		type: 'location', id: '650728659',
		latitude: 52.521409, longitude: 13.410728
	}, {
		type: 'location', id: '640728659',
		latitude: 52.521814, longitude: 13.411456
	}, {
		type: 'location', id: '630728659',
		latitude: 52.521373, longitude: 13.413317
	}, {
		type: 'location', id: '620728659',
		latitude: 52.52096, longitude: 13.414908
	}, {
		type: 'location', id: '610728659',
		latitude: 52.522317, longitude: 13.412895
	}],
}

export {
	dbStop,
}
