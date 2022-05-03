'use strict'

const {HafasError, byErrorCode} = require('./errors')

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

module.exports = checkIfResponseIsOk
