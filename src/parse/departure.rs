use crate::parse::date_time::parse_date_time;
use crate::hafas_json;
use crate::types::*;

impl When {
	pub fn when(&self) -> Option<i64> {
		match (self.planned, self.prognosed, self.cancelled) {
			(_, _, Some(true)) => None,
			(_, Some(prognosed), _) => Some(prognosed),
			(Some(planned), None, _) => Some(planned),
			_ => None,
		}
	}
	pub fn delay(&self) -> Option<i64> {
		match (self.planned, self.prognosed) {
			(Some(planned), Some(prognosed)) => Some(prognosed - planned),
			_ => None,
		}
	}
}

// todo: make this a trait?
pub fn parse_when(dep: hafas_json::Dep) -> When {
	let parse_time = |t| {
		parse_date_time(&dep.date, t, dep.stbStop.dTZOffset)
	};
	When {
		planned: dep.stbStop.dTimeS.as_deref().map(parse_time),
		prognosed: dep.stbStop.dTimeR.as_deref().map(parse_time),
		cancelled: dep.stbStop.dCncl,
	}
}

pub fn parse_departure(dep: hafas_json::Dep) -> Dep {
	Dep {
		when: parse_when(dep),
	}
}

#[cfg(test)]
mod tests {
	use crate::hafas_json;
	use super::*;

    #[test]
    fn when_works() {
    	// just planned time
		let w = When {
			planned: Some(123),
			prognosed: None,
			cancelled: None,
		};
		assert_eq!(w.when(), Some(123));
		assert_eq!(w.delay(), None);

    	// realtime
		let w = When {
			planned: Some(123),
			prognosed: Some(234),
			cancelled: None,
		};
		assert_eq!(w.when(), Some(234));
		assert_eq!(w.delay(), Some(111));

    	// realtime + cancelled
		let w = When {
			planned: Some(123),
			prognosed: Some(234),
			cancelled: Some(false),
		};
		assert_eq!(w.when(), Some(234));
		assert_eq!(w.delay(), Some(111));
		let w = When {
			planned: Some(123),
			prognosed: Some(234),
			cancelled: Some(true),
		};
		assert_eq!(w.when(), None);
		assert_eq!(w.delay(), Some(111));

    	// just realtime
		let w = When {
			planned: None,
			prognosed: Some(234),
			cancelled: None,
		};
		assert_eq!(w.when(), Some(234));
		assert_eq!(w.delay(), None);

    	// just realtime + cancelled
		let w = When {
			planned: None,
			prognosed: Some(234),
			cancelled: Some(true),
		};
		assert_eq!(w.when(), None);
		assert_eq!(w.delay(), None);
    }

    #[test]
    fn parse_when_works() {
    	// just planned time
		let d = hafas_json::Dep {
			date: String::from("20190819"),
			stbStop: hafas_json::DepStbStop {
				dTimeS: Some(String::from("203000")),
				dTimeR: None,
				dTZOffset: None,
				dCncl: None,
			},
		};
		assert_eq!(parse_when(d), When {
			planned: Some(1566239400),
			prognosed: None,
			cancelled: None,
		});

    	// realtime
		let d = hafas_json::Dep {
			date: String::from("20190819"),
			stbStop: hafas_json::DepStbStop {
				dTimeS: Some(String::from("203000")),
				dTimeR: Some(String::from("203100")),
				dTZOffset: None,
				dCncl: None,
			},
		};
		assert_eq!(parse_when(d), When {
			planned: Some(1566239400),
			prognosed: Some(1566239460),
			cancelled: None,
		});

    	// realtime + cancelled
		let d = hafas_json::Dep {
			date: String::from("20190819"),
			stbStop: hafas_json::DepStbStop {
				dTimeS: Some(String::from("203000")),
				dTimeR: Some(String::from("203100")),
				dTZOffset: None,
				dCncl: Some(true),
			},
		};
		assert_eq!(parse_when(d), When {
			planned: Some(1566239400),
			prognosed: Some(1566239460),
			cancelled: Some(true),
		});

    	// just realtime
		let d = hafas_json::Dep {
			date: String::from("20190819"),
			stbStop: hafas_json::DepStbStop {
				dTimeS: None,
				dTimeR: Some(String::from("203100")),
				dTZOffset: None,
				dCncl: None,
			},
		};
		assert_eq!(parse_when(d), When {
			planned: None,
			prognosed: Some(1566239460),
			cancelled: None,
		});
    }
}
