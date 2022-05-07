import {DateTime} from 'luxon'

// todo: DRY with parse/date-time.js
const parseDate = (date) => {
	const res = {
		year: parseInt(date.substr(-8, 4)),
		month: parseInt(date.substr(-4, 2)),
		day: parseInt(date.substr(-2, 2)),
	}
	if (!Number.isInteger(res.year) || !Number.isInteger(res.month) || !Number.isInteger(res.day)) {
		throw new Error('invalid date format: ' + date)
	}
	return res
}

const parseScheduledDays = (ctx, sDays) => {
	const {profile} = ctx

	// sDaysB is a bitmap mapping all days from fpB (first date of schedule) to fpE (last date in schedule).
	const {fpB, fpE} = ctx.res
	if (!sDays.sDaysB || !fpB || !fpE) return null

	const sDaysB = Buffer.from(sDays.sDaysB, 'hex')
	const res = Object.create(null)

	const _fpB = parseDate(fpB)
	let d = DateTime.fromObject({
		year: _fpB.year, month: _fpB.month, day: _fpB.day,
		hour: 0, minute: 0, second: 0, millisecond: 0
	}, {
		zone: profile.timezone,
		locale: profile.locale,
	})
	for (let b = 0; b < sDaysB.length; b++) {
		for (let i = 0; i < 8; i++) {
			res[d.toISODate()] = (sDaysB[b] & Math.pow(2, 7 - i)) > 0
			d = d.plus({days: 1})
		}
	}
	return res
}

export {
	parseScheduledDays,
}
