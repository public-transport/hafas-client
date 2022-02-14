import pick from 'lodash/pick.js'
import {profile as vbbMgateProfile} from '../vbb/index.js'

const TEST_ENDPOINT = 'https://vbb.demo.hafas.de/fahrinfo/restproxy/2.15/'
const PRODUCTION_ENDPOINT = 'https://fahrinfo.vbb.de/restproxy/2.15/'
const ENDPOINT = process.env.NODE_ENV === 'production'
	? PRODUCTION_ENDPOINT
	: TEST_ENDPOINT

const vbbRestProfile = {
	...pick(vbbMgateProfile, [
		'ver',
		'defaultLanguage', 'locale', 'timezone',
		'products',
	]),

	endpoint: ENDPOINT,
}

export {
	vbbRestProfile as profile,
}
