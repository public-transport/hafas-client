'use strict'

const testServerInfo = async (cfg) => {
	const {
		test: t,
		fetchServerInfo,
	} = cfg

	const info = await fetchServerInfo()
	t.ok(info, 'invalid info')

	t.equal(typeof info.timetableStart, 'string', 'invalid info.timetableStart')
	t.ok(info.timetableStart, 'invalid info.timetableStart')
	t.equal(typeof info.timetableEnd, 'string', 'invalid info.timetableEnd')
	t.ok(info.timetableEnd, 'invalid info.timetableEnd')

	t.equal(typeof info.serverTime, 'string', 'invalid info.serverTime')
	t.notOk(Number.isNaN(Date.parse(info.serverTime)), 'invalid info.serverTime')

	t.ok(Number.isInteger(info.realtimeDataUpdatedAt), 'invalid info.realtimeDataUpdatedAt')
	t.ok(info.realtimeDataUpdatedAt > 0, 'invalid info.realtimeDataUpdatedAt')
}

module.exports = testServerInfo
