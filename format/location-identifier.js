'use strict'

const sep = '@'

const formatLocationIdentifier = (data) => {
	let str = ''
	for (let key in data) {
		if (!Object.prototype.hasOwnProperty.call(data, key)) continue

		str += key + '=' + data[key] + sep // todo: escape, but how?
	}

	return str
}

module.exports = formatLocationIdentifier
