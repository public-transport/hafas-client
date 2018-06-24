'use strict'

const formatDate = (profile, when) => {
	var date = new Date(when)
	var month = String(date.getMonth() + 1); //months from 1-12
	var day = String(date.getDate()));
	var year = String(date.getFullYear());
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
