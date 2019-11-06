// todo: get the original parseWhen differently, this is ugly
import {parseWhen as _parseWhen} from '../parse/when.js'

const parseWhen = (ctx, date, rtDate, time, rtTime, tzOffset, cncl = false) => {
	// todo: compute `rtTime` offset using `rtDate`
	date = rtDate || date
	if (date) date = date.replace(/-/g, '')
	if (time) time = time.replace(/:/g, '')
	if (rtTime) rtTime = rtTime.replace(/:/g, '')
	return _parseWhen(ctx, date, time, rtTime, tzOffset, cncl)
}

export {
	parseWhen,
}
