'use strict'

// todo: https://gist.github.com/anonymous/a5fc856bc80ae7364721943243f934f4#file-haf_products-properties-L32-L144
// - walking
// - bicycle
// - car
// - taxi_t
// - ic_bus, bus_t
// - pr
// - comm, comm_t
// - sub_t
// - tram_t
// - wchair
// - ic
// - reg
// - gen
// - ship
// - plane
// - transf
// etc.

const m = [
	{
		category: 1,
		bitmask: null, // todo
		name: 'walking',
		shortName: 'walking',
		mode: 'walking',
		product: 'walking'
	}, {
		category: 2,
		bitmask: null, // todo
		name: 'bicycle',
		shortName: 'bicycle',
		mode: 'bicycle',
		product: 'bicycle'
	}, {
		category: 3,
		bitmask: null, // todo
		name: 'car',
		shortName: 'car',
		mode: 'car',
		product: 'car'
	}, {
		category: 4,
		bitmask: null, // todo
		name: 'Taxi',
		shortName: 'Taxi',
		mode: 'taxi',
		product: 'taxi'
	}, {
		category: 6,
		bitmask: null, // todo
		name: 'Bus',
		shortName: 'Bus',
		mode: 'bus',
		product: 'bus'
	}, {
		category: 12,
		bitmask: null, // todo
		name: 'Subway',
		shortName: 'Subway',
		mode: 'train',
		product: 'subway'
	}, {
		category: 14,
		bitmask: null, // todo
		name: 'Tram',
		shortName: 'Tram',
		mode: 'train',
		product: 'tram'
	}, {
		category: 17,
		bitmask: 1,
		name: 'RailJet/InterCityExpress/TGV highspeed train',
		shortName: 'RJ/ICE/TGV', // todo: is there a way to tell which?
		mode: 'train',
		product: 'nationalExpress'
	}, {
		category: 18,
		bitmask: 2,
		name: 'EuroCity/InterCity train',
		shortName: 'EC/IC',
		mode: 'train',
		product: 'national'
	}, {
		category: 24,
		bitmask: 3,
		name: 'NightJet/EuroNight/D train',
		shortName: 'EN/D',
		mode: 'train',
		product: 'sleeper'
	}, {
		category: 22,
		bitmask: null, // todo
		name: 'Airplane',
		shortName: 'Plane',
		mode: 'aircraft',
		product: 'airplane'
	}, {
		category: 0,
		bitmask: null,
		name: 'unknown',
		shortName: '?',
		mode: null,
		product: null
	}
}

module.exports = m
