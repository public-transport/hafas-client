'use strict'

const formatDate = (profile, when) => {
	let date = new Date(when)
	var month = String(date.getUTCMonth() + 1); //months from 1-12
	var day = String(date.getUTCDate());
	var year = String(date.getUTCFullYear());
	if(day <10){
		day = "0"+ day
	}
	if(month < 10){
		month = "0" + month
	}
	date = year + month + day
	return date
}

module.exports = formatDate
