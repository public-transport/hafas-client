import omit from 'lodash/omit.js'
// todo: get the original parseHint differently
import {parseHint as _parseHint} from '../parse/hint.js'

const parseHint = (ctx, hint) => {
	return _parseHint(ctx, {
		...omit(hint, ['value']),
		code: hint.key,
		txtN: hint.value
		// todo: map hint.routeIdxFrom & hint.routeIdxTo
	})
}

export {
	parseHint,
}
