use crate::parse::query_string::HafasQueryString;
use crate::hafas_json;
use crate::types::*;

// todo: make this a trait?
// todo: lat/long can be encoded in hafas_json::Loc.lid
pub fn parse_crd(crd: hafas_json::Crd) -> Location {
	Location {
		latitude: (crd.y as f32) / 1000000.0,
		longitude: (crd.x as f32) / 1000000.0,
	}
}

// todo: make this a trait?
pub fn parse_id_from_lid(lid: &str) -> Option<String> {
	let qs = HafasQueryString::from(lid);
	qs.get("L").map(|id| String::from(id))
}

// todo: make this a trait?
pub fn parse_location(loc: hafas_json::Loc) -> Place {
	let id = match (loc.extId, loc.lid) {
		(Some(ext_id), _) => Some(ext_id),
		(_, lid) => parse_id_from_lid(&lid),
	};
	let name = loc.name.expect("missing Loc.name");
	let location = parse_crd(loc.crd.expect("missing Loc.crd"));
	match loc.r#type.as_str() {
		"P" => Place::PointOfInterest(PointOfInterest {
			id: id,
			name: name,
			location: location,
		}),
		"A" => Place::Address(Address {
			id: id,
			name: name,
			location: location,
		}),
		"S" => Place::Stop(Stop {
			id: id.expect("Loc has no ID"),
			name: name,
			location: location,
		}),
		_ => panic!("invalid/unknown Loc.type"),
	}
}

#[cfg(test)]
mod tests {
	use crate::hafas_json as haf;
	use super::*;

    #[test]
    fn parse_id_from_lid_works() {
    	assert_eq!(parse_id_from_lid("a=b@L=some%20id@c=d@"), Some("some id".to_string()));
    	assert_eq!(parse_id_from_lid(""), None);
    	assert_eq!(parse_id_from_lid("a=b"), None);
    	assert_eq!(parse_id_from_lid("a=b@c=d"), None);
    }

    #[test]
    fn parse_location_parses_a_poi() {
    	let p = haf::Loc {
    		r#type: "P".to_string(),
    		name: Some("some POI".to_string()),
    		lid: "a=b@L=some%20id@c=d@".to_string(),
    		extId: None,
    		crd: Some(haf::Crd {x: 13418027, y: 52515503}),
    		pCls: None,
    	};
		assert_eq!(parse_location(p), Place::PointOfInterest(PointOfInterest {
			id: Some("some id".to_string()),
    		name: "some POI".to_string(),
    		location: Location {latitude: 52.515503, longitude: 13.418027},
    	}));
    }

    #[test]
    fn parse_location_prefers_extid() {
    	let p = haf::Loc {
    		r#type: "P".to_string(),
    		name: Some("some POI".to_string()),
    		lid: "a=b@L=some%20id@c=d@".to_string(),
    		extId: Some("some ext id".to_string()),
    		crd: Some(haf::Crd {x: 13418027, y: 52515503}),
    		pCls: None,
    	};
		assert_eq!(match parse_location(p) {
			Place::PointOfInterest(poi) => poi.id,
			_ => panic!("unexpected type"),
		}, Some("some ext id".to_string()));
    }

    #[test]
    fn parse_location_parses_an_address() {
    	let a = haf::Loc {
    		r#type: "A".to_string(),
    		name: Some("foo street 1, 1234 bar".to_string()),
    		lid: "a=b@L=some%20id@c=d@".to_string(),
    		extId: None,
    		crd: Some(haf::Crd {x: 13418027, y: 52515503}),
    		pCls: None,
    	};
		assert_eq!(parse_location(a), Place::Address(Address {
			id: Some("some id".to_string()),
    		name: "foo street 1, 1234 bar".to_string(),
    		location: Location {latitude: 52.515503, longitude: 13.418027},
    	}));
    }

    #[test]
    fn parse_location_parses_a_stop() {
    	let s = haf::Loc {
    		r#type: "S".to_string(),
    		name: Some("foo station (bar)".to_string()),
    		lid: "a=b@L=some%20id@c=d@".to_string(),
    		extId: None,
    		crd: Some(haf::Crd {x: 13418027, y: 52515503}),
    		pCls: None,
    	};
		assert_eq!(parse_location(s), Place::Stop(Stop {
			id: "some id".to_string(),
    		name: "foo station (bar)".to_string(),
    		location: Location {latitude: 52.515503, longitude: 13.418027},
    	}));
    }

    #[test]
    #[should_panic(expected = "invalid/unknown Loc.type")]
    fn parse_location_invalid_type() {
    	parse_location(haf::Loc {
    		r#type: "Z".to_string(),
    		name: Some("name".to_string()),
    		lid: "lid".to_string(),
    		extId: None,
    		crd: Some(haf::Crd {x: 13418027, y: 52515503}),
    		pCls: None,
    	});
    }
}
