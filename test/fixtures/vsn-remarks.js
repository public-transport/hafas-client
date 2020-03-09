'use strict'

module.exports = [
	{
		id: 'HIM_FREETEXT_14164',
		type: 'warning',
		summary: 'Hinweis zum Flughafenbus X15',
		text: 'Der Flughafenbus X15 ist eine Linie der Regionalverkehr Münsterland GmbH (RVM). Es gilt der Westfalentarif. Infos gibt es online unter www.rvm-online.de sowie telefonisch unter der Rufnummer 0180 650 40 30.',
		icon: { type: 'HIM0', title: null },
		priority: 6,
		company: 'VOS',
		products: {
			nationalExpress: true,
			national: true,
			regionalExpress: true,
			regional: true,
			suburban: true,
			bus: true,
			ferry: true,
			subway: true,
			tram: true,
			anrufSammelTaxi: true
		},
		categories: [ 0 ],
		edges: [
			{
				icoCrd: { x: 7875575, y: 52201492 },
				icon: null,
				fromLoc: null,
				toLoc: null
			}
		],
		events: [
			{
				fromLoc: null,
				toLoc: null,
				start: '2020-02-03T11:11:00+01:00',
				end: '2020-12-13T00:00:00+01:00',
				sections: []
			}
		],
		affectedLines: [
			{
				type: 'line',
				id: 'bus-x15',
				fahrtNr: null,
				name: 'Bus X15',
				public: true
			}
		],
		validFrom: '2020-02-03T11:11:00+01:00',
		validUntil: '2020-12-13T00:00:00+01:00',
		modified: '2020-02-03T11:24:29+01:00'
	},
	{
		id: 'HIM_FREETEXT_9156',
		type: 'warning',
		summary: 'Sperrung Weserbrücke Lauenförde-Beverungen',
		text: 'Aufgrund der Sperrung können die Haltestellen in Beverungen nicht bedient werden.\n' +
			'<a href="http://www.vsninfo.de/de/verkehrsbehinderungen/landkreis-holzminden/554-556-sperrung-weserbruecke-lauenfoerde-beverungen" target="_blank" rel="noopener">Lauenförde-Beverungen</a>\n' +
			'<a href="http://weserems.hafas.de/pdf/1558512346653_HOL_556_beide_FPL_Baustelle%20Beverungen.pdf" target="_blank" rel="noopener">Baustellenfahrplan Linie 556</a>',
		icon: { type: 'HIM0', title: null },
		priority: 6,
		company: 'VSN',
		products: {
			nationalExpress: true,
			national: true,
			regionalExpress: true,
			regional: true,
			suburban: true,
			bus: true,
			ferry: true,
			subway: true,
			tram: true,
			anrufSammelTaxi: true
		},
		categories: [ 0 ],
		edges: [
			{
				icoCrd: { x: 9395422, y: 51748714 },
				icon: null,
				fromLoc: null,
				toLoc: null
			}
		],
		events: [
			{
				fromLoc: null,
				toLoc: null,
				start: '2019-12-15T00:00:00+01:00',
				end: '2020-12-12T23:59:00+01:00',
				sections: []
			}
		],
		affectedLines: [
			{
				type: 'line',
				id: 'bus-554',
				fahrtNr: null,
				name: 'Bus 554',
				public: true
			},
			{
				type: 'line',
				id: 'bus-556',
				fahrtNr: null,
				name: 'Bus 556',
				public: true
			}
		],
		validFrom: '2019-12-15T00:00:00+01:00',
		validUntil: '2020-12-12T23:59:00+01:00',
		modified: '2019-12-09T13:55:14+01:00'
	},
	{
		id: 'HIM_FREETEXT_9155',
		type: 'warning',
		summary: 'Sperrung Weserbrücke Lauenförde-Beverungen',
		text: 'Aufgrund der Sperrung können die Haltestellen in Beverungen nicht bedient werden.\n' +
			'<a href="http://www.vsninfo.de/de/verkehrsbehinderungen/landkreis-holzminden/554-556-sperrung-weserbruecke-lauenfoerde-beverungen" target="_blank" rel="noopener">Lauenförde-Beverungen</a>\n' +
			'<a href="http://weserems.hafas.de/pdf/1558512267592_HOL_554_beide_FPL_Baustelle%20Beverungen.pdf" target="_blank" rel="noopener">Baustellenfahrplan Linie 554</a>',
		icon: { type: 'HIM0', title: null },
		priority: 6,
		company: 'VSN',
		products: {
			nationalExpress: true,
			national: true,
			regionalExpress: true,
			regional: true,
			suburban: true,
			bus: true,
			ferry: true,
			subway: true,
			tram: true,
			anrufSammelTaxi: true
		},
		categories: [ 0 ],
		edges: [
			{
				icoCrd: { x: 9435051, y: 51783147 },
				icon: null,
				fromLoc: null,
				toLoc: null
			}
		],
		events: [
			{
				fromLoc: null,
				toLoc: null,
				start: '2019-12-15T00:00:00+01:00',
				end: '2020-12-12T23:59:00+01:00',
				sections: []
			}
		],
		affectedLines: [
			{
				type: 'line',
				id: 'bus-509',
				fahrtNr: null,
				name: 'Bus 509',
				public: true
			},
			{
				type: 'line',
				id: 'bus-554',
				fahrtNr: null,
				name: 'Bus 554',
				public: true
			},
			{
				type: 'line',
				id: 'bus-556',
				fahrtNr: null,
				name: 'Bus 556',
				public: true
			}
		],
		validFrom: '2019-12-15T00:00:00+01:00',
		validUntil: '2020-12-12T23:59:00+01:00',
		modified: '2019-12-09T13:55:45+01:00'
	},
	{
		id: 'HIM_FREETEXT_14527',
		type: 'warning',
		summary: 'Verlegung einer Stromleitung in der Lindenstraße (Umleitung verschoben)',
		text: 'Betrifft die Linien 91, 92, 94, N7\n' +
			'\n' +
			'Beginn der Umleitung verschoben auf voraussichtlich 16. März bis Juni 2020\n' +
			'\n' +
			'Die Bauarbeiten sollten ursprünglich bereits am 2. März beginnen. Ab diesem Datum wurde auch die Umleitung der Buslinien geplant. Bitte beachten Sie, dass die Fahrpläne an den Haltestellen sowie die Fahrplanauskunft im Internet ab 2. März den Bauplan anzeigen, obwohl die Busse bis zum Beginn der Bauarbeiten noch in der regulären Linienführung fahren.\n' +
			'\n' +
			'Umleitung ab Baubeginn:\n' +
			'Die Linien 91, 92, 94 und N7 werden in Richtung Vegesack zwischen (H) Bf Blumenthal und (H) Bremer Vulkan über die Straßen Zur Westpier und Am Werfttor umgeleitet.\n' +
			'\n' +
			'Haltestellenänderungen in Richtung Vegesack:\n' +
			'(H) Wätjens Park &gt; verlegt vor die Kreuzung Lüssumer Str./Zur Westpier\n' +
			'(H) Margaretenallee &gt; entfällt \n',
		icon: { type: 'HIM0', title: null },
		priority: 6,
		company: 'BSAG',
		products: {
			nationalExpress: false,
			national: false,
			regionalExpress: false,
			regional: false,
			suburban: false,
			bus: true,
			ferry: false,
			subway: false,
			tram: false,
			anrufSammelTaxi: false
		},
		categories: [ 0 ],
		events: [
			{
				fromLoc: null,
				toLoc: null,
				start: '2020-02-21T11:31:00+01:00',
				end: '2020-06-30T23:59:00+02:00',
				sections: []
			}
		],
		affectedLines: [
			{
				type: 'line',
				id: 'bus-91',
				fahrtNr: null,
				name: 'Bus 91',
				public: true
			},
			{
				type: 'line',
				id: 'bus-92',
				fahrtNr: null,
				name: 'Bus 92',
				public: true
			},
			{
				type: 'line',
				id: 'bus-94',
				fahrtNr: null,
				name: 'Bus 94',
				public: true
			},
			{
				type: 'line',
				id: 'bus-n7',
				fahrtNr: null,
				name: 'Bus N7',
				public: true
			}
		],
		validFrom: '2020-02-21T11:31:00+01:00',
		validUntil: '2020-06-30T23:59:00+02:00',
		modified: '2020-02-21T11:34:47+01:00'
	},
	{
		id: 'HIM_FREETEXT_14525',
		type: 'warning',
		summary: 'Verlegung einer Stromleitung in der Lindenstraße',
		text: 'Betrifft die Linien 91, 92, 94, N7\n' +
			'\n' +
			'Beginn der Umleitung verschoben auf voraussichtlich 16. März bis Juni 2020\n' +
			'\n' +
			'Die Bauarbeiten sollten ursprünglich bereits am 2. März beginnen. Ab diesem Datum wurde auch die Umleitung der Buslinien geplant. Bitte beachten Sie, dass die Fahrpläne an den Haltestellen sowie die Fahrplanauskunft im Internet ab 2. März den Bauplan anzeigen, obwohl die Busse bis zum Beginn der Bauarbeiten noch in der regulären Linienführung fahren.\n' +
			'\n' +
			'Umleitung ab Baubeginn:\n' +
			'Die Linien 91, 92, 94 und N7 werden in Richtung Vegesack zwischen (H) Bf Blumenthal und (H) Bremer Vulkan über die Straßen Zur Westpier und Am Werfttor umgeleitet.\n' +
			'\n' +
			'Haltestellenänderungen in Richtung Vegesack:\n' +
			'(H) Wätjens Park &gt; verlegt vor die Kreuzung Lüssumer Str./Zur Westpier\n' +
			'(H) Margaretenallee &gt; entfällt \n',
		icon: { type: 'HIM0', title: null },
		priority: 6,
		company: 'BSAG',
		products: {
			nationalExpress: false,
			national: false,
			regionalExpress: false,
			regional: false,
			suburban: false,
			bus: true,
			ferry: false,
			subway: false,
			tram: false,
			anrufSammelTaxi: false
		},
		categories: [ 0 ],
		events: [
			{
				fromLoc: null,
				toLoc: null,
				start: '2020-02-21T11:01:00+01:00',
				end: '2020-06-30T23:59:00+02:00',
				sections: []
			}
		],
		affectedLines: [
			{
				type: 'line',
				id: 'bus-91',
				fahrtNr: null,
				name: 'Bus 91',
				public: true
			},
			{
				type: 'line',
				id: 'bus-92',
				fahrtNr: null,
				name: 'Bus 92',
				public: true
			},
			{
				type: 'line',
				id: 'bus-94',
				fahrtNr: null,
				name: 'Bus 94',
				public: true
			},
			{
				type: 'line',
				id: 'bus-n7',
				fahrtNr: null,
				name: 'Bus N7',
				public: true
			}
		],
		validFrom: '2020-02-21T11:01:00+01:00',
		validUntil: '2020-06-30T23:59:00+02:00',
		modified: '2020-02-21T13:31:05+01:00'
	}
]
