'use strict'

const formatTime = (profile, when) => {
	let time = new Date(when)
	var hour = String(time.getUTCHours() + 1); //months from 1-12
	var minute = String(time.getUTCMinutes());
	var second = String(time.getUTCSeconds());
	if(hour <10){
		hour = "0"+ hour
	}
	if(minute < 10){
		minute = "0" + minute
	}
	if(second < 10){
		second = "0" + second
	}
	time = hour + minute + second
	return time
	
}

module.exports = formatTime
