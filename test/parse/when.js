import tap from 'tap'
import {parseWhen as parse} from '../../parse/when.js'

const profile = {
	parseDateTime: ({profile}, date, time, tzOffset, timestamp = false) => {
		if (timestamp) return ((date + '' + time) - tzOffset * 60) * 1000
		return date + ':' + time
	}
}
const ctx = {
	data: {},
	opt: {},
	profile
}

tap.test('parseWhen works correctly', (t) => {
	const date = '20190606'
	const timeS = '163000'
	const timeR = '163130'
	const tzOffset = 120
	const expected = {
		when: '20190606:163130',
		plannedWhen: '20190606:163000',
		delay: 130 // seconds
	}

	t.same(parse(ctx, date, timeS, timeR, tzOffset), expected)

	// no realtime data
	t.same(parse(ctx, date, timeS, null, tzOffset), {
		...expected, when: expected.plannedWhen, delay: null
	})

	// cancelled
	t.same(parse(ctx, date, timeS, timeR, tzOffset, true), {
		...expected,
		when: null,
		prognosedWhen: expected.when
	})
	t.end()
})
