'use strict'

import pick from 'lodash/pick.js'
import {profile as dbMgateProfile} from '../db/index.js'

const dbRestProfile = {
	...pick(dbMgateProfile, [
		'ver',
		'defaultLanguage', 'locale', 'timezone',
		'products',
	]),

	endpoint: 'https://db-streckenagent.hafas.de/restproxy/',
}

export {
	dbRestProfile as profile,
}
