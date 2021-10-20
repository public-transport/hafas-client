'use strict'

module.exports = {
	id: 'foo',
	hysteresis: {minDeviationInterval: 5, notificationStart: 20},
	monitorFlags: ['AF', 'DF', 'DV', 'FTF', 'OF', 'PF'],
	connectionInfo: [{
		arrivalStation: '8000244',
		arrivalPlatform: '1',
		arrivalStationName: 'Mannheim Hbf',
		arrivalTime: '2020-11-28T18:29:00Z',
		departureStation: '8000156',
		departurePlatform: '4',
		departureStationName: 'Heidelberg Hbf',
		departureTime: '2020-11-28T18:13:00Z',
		productName: 'S 3'
	}],
	journeyRefreshToken: '¶HKI¶T$A=1@O=Heidelberg Hbf@L=8000156@a=128@$A=1@O=Mannheim Hbf@L=8000244@a=128@$202011281813$202011281829$S      3$$1$$$',
	payload: ['hello', 'world'],
}
