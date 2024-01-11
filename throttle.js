import throttle from 'p-throttle'
import {defaultRestProfile} from './lib/default-rest-profile.js'

const withThrottling = (profile, limit = 5, interval = 1000) => {
	// https://github.com/public-transport/hafas-client/issues/76#issuecomment-574408717
	const {request} = {...defaultRestProfile, ...profile}

	return {
		...profile,
		request: throttle({limit, interval})(request)
	}
}

export {
	withThrottling,
}
