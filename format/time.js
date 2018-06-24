'use strict'

const formatTime = (profile, when) => {
	var time = new Date(when)
	var hour = String(time.getHours()); 
	var minute = String(time.getMinutes());
	var second = String(time.getSeconds());
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
