import {randomBytes} from 'crypto'

const id = randomBytes(3).toString('hex')
const randomizeUserAgent = (userAgent) => {
	let ua = userAgent
	for (
		let i = Math.round(5 + Math.random() * 5);
		i < ua.length;
		i += Math.round(5 + Math.random() * 5)
	) {
		ua = ua.slice(0, i) + id + ua.slice(i)
		i += id.length
	}
	return ua
}

export {
	randomizeUserAgent,
}
