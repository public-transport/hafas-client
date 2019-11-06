import ProxyAgent from 'https-proxy-agent'
import {isIP} from 'net'
import {Agent as HttpsAgent} from 'https'
import roundRobin from '@derhuerst/round-robin-scheduler'
import {randomBytes} from 'crypto'
import createHash from 'create-hash'
import {Buffer} from 'node:buffer'
import {stringify} from 'qs'
import {Request, fetch} from 'cross-fetch'
import {parse as parseContentType} from 'content-type'
import {HafasError} from './errors.js'
import {randomizeUserAgent} from './randomize-user-agent.js'

const proxyAddress = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || null
const localAddresses = process.env.LOCAL_ADDRESS || null

if (proxyAddress && localAddresses) {
	console.error('Both env vars HTTPS_PROXY/HTTP_PROXY and LOCAL_ADDRESS are not supported.')
	process.exit(1)
}

const plainAgent = new HttpsAgent({
	keepAlive: true,
})
let getAgent = () => plainAgent

if (proxyAddress) {
	const agent = new ProxyAgent(proxyAddress, {
		keepAlive: true,
		keepAliveMsecs: 10 * 1000, // 10s
	})
	getAgent = () => agent
} else if (localAddresses) {
	const agents = process.env.LOCAL_ADDRESS.split(',')
	.map((addr) => {
		const family = isIP(addr)
		if (family === 0) throw new Error('invalid local address:' + addr)
		return new HttpsAgent({
			localAddress: addr, family,
			keepAlive: true,
		})
	})
	const pool = roundRobin(agents)
	getAgent = () => pool.get()
}

const md5 = input => createHash('md5').update(input).digest()

const fetchFromHafas = async (ctx, userAgent, resource, req, opt = {}) => {
	const {profile} = ctx
	const {
		throwIfNotOk,
	} = {
		throwIfNotOk: true,
		...opt,
	}

	req = profile.transformReq(ctx, {
		...req,
		agent: getAgent(),
		method: 'post',
		// todo: CORS? referrer policy?
		headers: {
			'Content-Type': 'application/json',
			'Accept-Encoding': 'gzip, br, deflate',
			'Accept': 'application/json',
			'user-agent': profile.randomizeUserAgent
				? randomizeUserAgent(userAgent)
				: userAgent,
			'connection': 'keep-alive', // prevent excessive re-connecting
			...(req.headers || {}),
		},
		redirect: 'follow',
	})

	if (profile.addChecksum || profile.addMicMac) {
		if (!Buffer.isBuffer(profile.salt) && 'string' !== typeof profile.salt) {
			throw new TypeError('profile.salt must be a Buffer or a string.')
		}
		// Buffer.from(buf, 'hex') just returns buf
		const salt = Buffer.from(profile.salt, 'hex')

		if (profile.addChecksum) {
			const checksum = md5(Buffer.concat([
				Buffer.from(req.body, 'utf8'),
				salt,
			]))
			req.query.checksum = checksum.toString('hex')
		}
		if (profile.addMicMac) {
			const mic = md5(Buffer.from(req.body, 'utf8'))
			req.query.mic = mic.toString('hex')

			const micAsHex = Buffer.from(mic.toString('hex'), 'utf8')
			const mac = md5(Buffer.concat([micAsHex, salt]))
			req.query.mac = mac.toString('hex')
		}
	}

	const reqId = randomBytes(3).toString('hex')
	const url = resource + '?' + stringify(req.query)
	const fetchReq = new Request(url, req)
	profile.logRequest(ctx, fetchReq, reqId)

	const res = await fetch(url, req)

	const errProps = {
		request: fetchReq,
		response: res,
		url,
	}

	if (throwIfNotOk && !res.ok) {
		// todo [breaking]: make this a FetchError or a HafasClientError?
		const err = new Error(res.statusText)
		Object.assign(err, errProps)
		throw err
	}

	let cType = res.headers.get('content-type')
	if (cType) {
		const {type} = parseContentType(cType)
		if (type !== 'application/json') {
			throw new HafasError('invalid/unsupported response content-type: ' + cType, null, errProps)
		}
	}

	const bodyAsText = await res.text()
	profile.logResponse(ctx, res, bodyAsText, reqId)

	const body = JSON.parse(bodyAsText)

	return {
		res,
		body,
		errProps,
	}
}

export {
	fetchFromHafas,
}
