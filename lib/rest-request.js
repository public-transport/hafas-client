import {fetchFromHafas} from './fetch.js'
import {byErrorCode} from './rest-exe-errors.js'
import {createFindInTree as findInTree} from './find-in-tree.js'

const request = async (ctx, userAgent, method, query) => {
	const {profile, opt, token} = ctx

	const req = profile.transformReq(ctx, {
		// todo: CORS? referrer policy?
		query: {
			lang: opt.language || 'en',
			...query,
		},
		headers: {
			'Authorization': 'Bearer ' + token,
		},
	})

	const resource = profile.endpoint + method
	const {
		res,
		body,
		errProps,
	} = await fetchFromHafas(ctx, userAgent, resource, req, {
		throwIfNotOk: false,
	})

	if (!res.ok) {
		// todo: parse HTML error messages
		const err = new Error(res.statusText)
		Object.assign(err, errProps)

		const {errorCode, errorText} = body
		if (errorCode && byErrorCode[errorCode]) {
			Object.assign(err, byErrorCode[errorCode])
			err.hafasErrorCode = errorCode
			if (errorText) err.hafasErrorMessage = errorText
		} else {
			err.message = errorText
			err.code = errorCode
		}

		throw err
	}

	// todo: parse such error responses:
	// Error: Error message from HAFAS server 10.255.253.12:2115: error=1&ttp=15406#15685&plancode0=itb9j&planid=1646912709&planid0=1646912709&planid_adr=1592347662&plancode_adr=mbtls&planid_poi=1646913327&plancode_poi=itcqp&planid_ext=1516270147&plancode_ext=c07th&srvv=5.45.VBB.9.6.6 (customer/hcuvbb/release/vbb_2021.08) [Aug  6 2021]&tlibv=TRFVER: rel/vbb/2.16.2 2020-12-07 09:48:02 +0100 (Built-by: mschu) VBB_TARIF&jno=5 (ServerErrorException)
	// 	at Object.request (/var/www/bbnavi-gtfs-rt-feed.jannisr.de/node_modules/hafas-client/lib/rest-request.js:37:15)
	// 	at runMicrotasks (<anonymous>)
	// 	at processTicksAndRejections (node:internal/process/task_queues:96:5)
	// 	at async Object.trip (/var/www/bbnavi-gtfs-rt-feed.jannisr.de/node_modules/hafas-client/rest-exe.js:226:17)
	// 	at async atomWithCache (/var/www/bbnavi-gtfs-rt-feed.jannisr.de/node_modules/cached-hafas-client/index.js:135:15)
	// 	at async EventEmitter.fetchTrip (/var/www/bbnavi-gtfs-rt-feed.jannisr.de/node_modules/hafas-monitor-trips/fetch-trips/index.js:46:11)
	// 	isHafasError: true,
	// 	fetchRequest: {
	// 		agent: '[Redacted]',
	// 		method: 'post',
	// 		redirect: 'follow',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'Accept-Encoding': 'gzip, br, deflate',
	// 			Accept: 'application/json',
	// 			'user-agent': 'App/4.5e906ab.1 (iPhoe906abne; iOe906abS 14.8.1;e906ab Scale906abe/3.00)',
	// 			connection: 'keep-alive',
	// 			Authorization: 'Bearer [Redacted]',
	// 		},
	// 	},
	// 	url: 'https://fahrinfo.vbb.de/restproxy/2.15/journeyDetail?lang=en&id=1%7C53508%7C0%7C86%7C14032022',
	// 	response: {
	// 		size: 0,
	// 		timeout: 0
	// 	},
	// 	statusCode: 503,
	// 	code: 'INT_GATEWAY'

	// todo: sometimes it returns a body without any data
	// e.g. `location.nearbystops` with an invalid `type`

	const mapping = {
		'**.Stops.Stop': 'stops',
		'**.Names.Name': 'products',
		'**.Directions.Direction': 'directions',
		'**.JourneyDetailRef.ref': 'ref',
		'**.Notes.Note': 'notes',
		'**.LegList.Leg': 'legs',
		'**.ServiceDays[0]': 'serviceDays',
	}

	const allMatches = findInTree(Object.keys(mapping))(body)
	for (const [needle, matches] of Object.entries(allMatches)) {
		const newKey = mapping[needle]

		for (const [item, parents] of matches) {
			const grandParent = parents[1]
			grandParent[newKey] = item
		}
	}

	return {
		res: body,
	}
}

export {
	request,
}
