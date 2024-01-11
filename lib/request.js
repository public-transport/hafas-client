import {HafasError, byErrorCode} from './errors.js'
import {fetchFromHafas} from './fetch.js'

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

	const req = {
		body: JSON.stringify(rawReqBody),
		query: {}
	}

	const {
		body: b,
		errProps,
	} = await fetchFromHafas(ctx, userAgent, profile.endpoint, req)

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
