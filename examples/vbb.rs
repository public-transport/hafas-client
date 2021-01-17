fn main() {
	let res = hafas_client::request().unwrap();
	println!("{:#?}", res);
}
