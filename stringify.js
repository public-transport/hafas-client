'use strict'

const moment = require('moment-timezone')



const date = (tz, when) => moment(when).tz(tz).format('YYYYMMDD')
const time = (tz, when) => moment(when).tz(tz).format('HHmmss')



// filters
const bike = {type: 'BC', mode: 'INC'}
const accessibility = {
	  none:     {type: 'META', mode: 'INC', meta: 'notBarrierfree'}
	, partial:  {type: 'META', mode: 'INC', meta: 'limitedBarrierfree'}
	, complete: {type: 'META', mode: 'INC', meta: 'completeBarrierfree'}
}



const coord = (x) => Math.round(x * 1000000)
const station = (id) => ({type: 'S', lid: 'L=' + id})
const address = (latitude, longitude, name) => {
	if (!latitude || !longitude || !name) throw new Error('invalid address.')
	return {type: 'A', name, crd: {x: coord(longitude), y: coord(latitude)}}
}
const poi = (latitude, longitude, id, name) => {
	if (!latitude || !longitude || !id || !name) throw new Error('invalid poi.')
	return {type: 'P', name, lid: 'L=' + id, crd: {x: coord(longitude), y: coord(latitude)}}
}

const locationFilter = (stations, addresses, poi) => {
	if (stations && addresses && poi) return 'ALL'
	return (stations ? 'S' : '')
	+ (addresses ? 'A' : '')
	+ (poi ? 'P' : '')
}



module.exports = {
	date, time,
	bike, accessibility,
	coord, station, address, poi, locationFilter
}
