// todo: get the original parseScheduledDays differently, this is ugly
import {parseScheduledDays as _parseScheduledDays} from '../parse/scheduled-days.js'

const parseScheduledDays = (ctx, sDays) => {
	const ctxWithPatchedRes = {
		...ctx,
		res: {
			...ctx.res,
			fpB: sDays.planningPeriodBegin,
			fpE: sDays.planningPeriodEnd,
		},
	}
	return _parseScheduledDays(ctxWithPatchedRes, sDays)
}

export {
	parseScheduledDays,
}
