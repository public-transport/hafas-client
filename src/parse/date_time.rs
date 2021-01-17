use chrono::{TimeZone, FixedOffset};
use chrono_tz::Europe::Berlin;

pub fn parse_date_time(date_str: &str, raw_time_str: &str, tz_offset: Option<i32>) -> i64 {
	let mut time_str = raw_time_str;

	assert_eq!(date_str.len(), 8);
	let year = date_str[0..4].parse::<i32>().expect("date string: invalid year");
	let month = date_str[4..6].parse::<u32>().expect("date string: invalid month");
	let mut day = date_str[6..8].parse::<u32>().expect("date string: invalid day");
	if time_str.len() == 8 {
		day += time_str[0..2].parse::<u32>().expect("time string: invalid day overflow");
		time_str = &time_str[2..];
	}

	assert_eq!(time_str.len(), 6);
	let hour = time_str[0..2].parse::<u32>().expect("time string: invalid hour");
	let minute = time_str[2..4].parse::<u32>().expect("time string: invalid minute");
	let second = time_str[4..6].parse::<u32>().expect("time string: invalid second");

	match tz_offset {
		Some(tz_offset) => {
			let tz = FixedOffset::east(tz_offset * 60);
			// deduplicate with below
			tz.ymd(year, month, day).and_hms(hour, minute, second).timestamp()
		},
		None => {
			// todo: pass into parse_date_time
			let tz = Berlin;
			// deduplicate with above
			tz.ymd(year, month, day).and_hms(hour, minute, second).timestamp()
		},
	}
}

#[cfg(test)]
mod tests {
	use super::*;

    #[test]
    fn parse_date_time_works() {
		assert_eq!(parse_date_time("20190819", "203000", None), 1566239400);
		// works with days overflow
		assert_eq!(parse_date_time("20190819", "02203000", None), 1566412200);
		// works with tz offset
		assert_eq!(parse_date_time("20190819", "203000", Some(-120)), 1566253800);
		// works with days overflow & tz offset
		assert_eq!(parse_date_time("20190819", "02203000", Some(-120)), 1566426600);
		// works with summer & winter time
		assert_eq!(parse_date_time("20190219", "203000", None), 1550604600);
    }
}
