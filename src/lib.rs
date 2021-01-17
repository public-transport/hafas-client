use serde_json::Result;

pub mod parse;
pub mod hafas_json;

pub fn request() -> Result<Option<()>> {
	let body = r#"{
		"date": "20190819",
		"stbStop": {
			"dTimeS": "02203000",
			"dTimeR": "02203200"
		},
		"foo": true
	}"#;

	let dep: hafas_json::Dep = serde_json::from_str(body)?;
	// todo: parse
	Ok(dep)
}
