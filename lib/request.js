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
import {HafasError, byErrorCode} from './errors.js'

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
	// todo: this doesn't honor `keepAlive: true`
	// related:
	// - https://github.com/TooTallNate/node-https-proxy-agent/pull/112
	// - https://github.com/TooTallNate/node-agent-base/issues/5
	const agent = new ProxyAgent(proxyAddress)
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

const md5 = input => createHash('md5').update(input).digest()

const checkIfResponseIsOk = (_) => {
	const {
		body,
		errProps: baseErrProps,
	} = _

	const errProps = {
		...baseErrProps,
	}
	if (body.id) errProps.hafasResponseId = body.id

	// Because we want more accurate stack traces, we don't construct the error here,
	// but only return the constructor & error message.
	const getError = (_) => {
		// mutating here is ugly but pragmatic
		if (_.errTxt) errProps.hafasMessage = _.errTxt
		if (_.errTxtOut) errProps.hafasDescription = _.errTxtOut

		if (_.err in byErrorCode) return byErrorCode[_.err]
		return {
			Error: HafasError,
			message: body.errTxt || 'unknown error',
			props: {},
		}
	}

	if (body.err && body.err !== 'OK') {
		const {Error: HafasError, message, props} = getError(body)
		throw new HafasError(message, body.err, {...errProps, ...props})
	}
	if (!body.svcResL || !body.svcResL[0]) {
		throw new HafasError('invalid/unsupported response structure', null, errProps)
	}
	if (body.svcResL[0].err !== 'OK') {
		const {Error: HafasError, message, props} = getError(body.svcResL[0])
		throw new HafasError(message, body.svcResL[0].err, {...errProps, ...props})
	}
}

const request = async (ctx, userAgent, reqData) => {
	const {profile, opt} = ctx

	const rawReqBody = profile.transformReqBody(ctx, {
		// todo: is it `eng` actually?
		// RSAG has `deu` instead of `de`
		lang: opt.language || profile.defaultLanguage || 'en',
		svcReqL: [reqData],

		client: profile.client, // client identification
		ext: profile.ext, // ?
		ver: profile.ver, // HAFAS protocol version
		auth: profile.auth, // static authentication
	})

	const req = profile.transformReq(ctx, {
		agent: getAgent(),
		method: 'post',
		// todo: CORS? referrer policy?
		body: JSON.stringify(rawReqBody),
		headers: {
			'Content-Type': 'application/json',
			'Accept-Encoding': 'gzip, br, deflate',
			'Accept': 'application/json',
			'user-agent': profile.randomizeUserAgent
				? randomizeUserAgent(userAgent)
				: userAgent,
			'connection': 'keep-alive', // prevent excessive re-connecting
		},
		redirect: 'follow',
		query: {}
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
	const url = profile.endpoint + '?' + stringify(req.query)
	const fetchReq = new Request(url, req)
	profile.logRequest(ctx, fetchReq, reqId)

	const res = await fetch(url, req)

	const errProps = {
		request: fetchReq,
		response: res,
		url,
	}

	if (!res.ok) {
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

	const body = await res.text()
	profile.logResponse(ctx, res, body, reqId)

	const b = JSON.parse(body)
	checkIfResponseIsOk({
		body: b,
		errProps,
	})

	const svcRes = b.svcResL[0].res
	return {
		res: svcRes,
		common: profile.parseCommon({...ctx, res: svcRes}),
	}
}

export {
	checkIfResponseIsOk,
	request,
}
