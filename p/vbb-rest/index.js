import pick from 'lodash/pick.js'
import {profile as vbbMgateProfile} from '../vbb/index.js'

const vbbRestProfile = {
	...pick(vbbMgateProfile, [
		'ver',
		'defaultLanguage', 'locale', 'timezone',
		'products',
	]),

	// todo: the production endpoint is https://fahrinfo.vbb.de/restproxy/2.10/
	endpoint: 'https://vbb.demo.hafas.de/fahrinfo/restproxy/2.15/',
}

export {
	vbbRestProfile as profile,
}
