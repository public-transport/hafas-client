import {DateTime, FixedOffsetZone, IANAZone} from 'luxon';
import {luxonIANAZonesByProfile as timezones} from '../lib/luxon-timezones.js';

const parseDaysOffset = (_, time) => {
	return time.length > 6
		? parseInt(time.slice(0, -6))
		: 0;
};

const parseDateTime = (ctx, date, time, tzOffset = null, timestamp = false) => {
	const {profile} = ctx;

	const pDate = [date.substr(-8, 4), date.substr(-4, 2), date.substr(-2, 2)];
	if (!pDate[0] || !pDate[1] || !pDate[2]) {
		throw new Error('invalid date format: ' + date);
	}

	const pTime = [time.substr(-6, 2), time.substr(-4, 2), time.substr(-2, 2)];
	if (!pTime[0] || !pTime[1] || !pTime[2]) {
		throw new Error('invalid time format: ' + time);
	}

	const daysOffset = parseDaysOffset(ctx, time);

	let timezone;
	if (tzOffset !== null) {
		timezone = FixedOffsetZone.instance(tzOffset);
	} else if (timezones.has(profile)) {
		timezone = timezones.get(profile);
	} else {
		timezone = new IANAZone(profile.timezone);
		timezones.set(profile, timezone);
	}

	let dt = DateTime.fromISO(pDate.join('-') + 'T' + pTime.join(':'), {
		locale: profile.locale,
		zone: timezone,
	});
	if (daysOffset > 0) {
		dt = dt.plus({days: daysOffset});
	}
	return timestamp
		? dt.toMillis()
		: dt.toISO({suppressMilliseconds: true});
};

export {
	parseDateTime,
};
