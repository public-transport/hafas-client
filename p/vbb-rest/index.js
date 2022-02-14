import pick from 'lodash/pick.js'
import {profile as vbbMgateProfile} from '../vbb/index.js'
import {parseHook} from '../../lib/profile-hooks.js'
import {parseLocation as _parseLocation} from '../../parse-rest/location.js'

const TEST_ENDPOINT = 'https://vbb.demo.hafas.de/fahrinfo/restproxy/2.15/'
const PRODUCTION_ENDPOINT = 'https://fahrinfo.vbb.de/restproxy/2.15/'
const ENDPOINT = process.env.NODE_ENV === 'production'
	? PRODUCTION_ENDPOINT
	: TEST_ENDPOINT

const dhidRegex = /^A×[a-z]{2,3}:./u
const dhidPrefix = 'A×'
const parseLocationWithStopDHID = ({parsed: stop}, l) => {
	const dhid = Array.isArray(l.altId) && l.altId.find(id => dhidRegex.test(id))
	if (dhid) {
		if (!stop.ids) stop.ids = {}
		stop.ids.dhid = dhid.slice(dhidPrefix.length)
	}

	return stop
}

const vbbRestProfile = {
	...pick(vbbMgateProfile, [
		'ver',
		'defaultLanguage', 'locale', 'timezone',
		'products',
	]),

	endpoint: ENDPOINT,

	parseLocation: parseHook(_parseLocation, parseLocationWithStopDHID),
}

export {
	vbbRestProfile as profile,
}
