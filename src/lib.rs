pub fn request() -> Result<Option<()>> {
	let body = r#"{
		"date": "20190819",
		"stbStop": {
			"dTimeS": "02203000",
			"dTimeR": "02203200"
		},
		"foo": true
	}"#;

	// todo: parse
	Ok(None)
}
