import {gunzipSync} from 'node:zlib'
import {DateTime} from 'luxon'

const parseSubscription = (ctx, id, s) => {
	const {profile, opt} = ctx

	const res = {
		id,
		hysteresis: s.hysteresis,
		monitorFlags: s.monitorFlags,
		connectionInfo: s.connectionInfo,
		journeyRefreshToken: s.ctxRecon,
	}

	if (opt.payload && s.data && s.data.slice(0, 5) === 'GZip:') {
		const gzipped = Buffer.from(s.data.slice(5), 'base64')
		const gunzipped = gunzipSync(gzipped) // async?
		res.payload = JSON.parse(gunzipped.toString('utf8'))
	}

	if (opt.activeDays && s.serviceDays) {
		res.activeDays = Object.create(null)
		const days = s.serviceDays.selectedDays
		let d = DateTime.fromObject({
			year: parseInt(s.serviceDays.beginDate.slice(0, 4)),
			month: parseInt(s.serviceDays.beginDate.slice(4, 6)),
			day: parseInt(s.serviceDays.beginDate.slice(6, 8)),
			hour: 0, minute: 0, second: 0, millisecond: 0
		}, {
			zone: profile.timezone,
			locale: profile.locale,
		})
		for (let b = 0; b < days.length; b++) {
			res.activeDays[d.toISODate()] = !!parseInt(days[b])
			d = d.plus({days: 1})
		}
	}

	return res
}

export {
	parseSubscription,
}
