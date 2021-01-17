use serde_json::Result;
use parse::departure::parse_departure;

pub mod types;
pub mod parse;
pub mod hafas_json;

pub fn request() -> Result<types::Dep> {
	let body = r#"{
		"date": "20190819",
		"stbStop": {
			"dTimeS": "02203000",
			"dTimeR": "02203200"
		},
		"foo": true
	}"#;

	let dep: hafas_json::Dep = serde_json::from_str(body)?;
	let dep = parse_departure(dep);
	Ok(dep)
}
