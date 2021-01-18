#![allow(non_snake_case)]

#[derive(PartialEq, Clone, Debug)]
pub struct Location {
	pub latitude: f32,
	pub longitude: f32,
}

#[derive(PartialEq, Clone, Debug)]
pub struct PointOfInterest {
	pub id: Option<String>,
	pub name: String,
	pub location: Location,
}

#[derive(PartialEq, Clone, Debug)]
pub struct Address {
	pub id: Option<String>,
	pub name: String,
	pub location: Location,
}

#[derive(PartialEq, Clone, Debug)]
pub struct Stop {
	pub id: String,
	pub name: String,
	pub location: Location,
	// todo: products[], parent_stop, child_stops
}

#[derive(PartialEq, Clone, Debug)]
pub enum Place {
	PointOfInterest(PointOfInterest),
	Address(Address),
	Stop(Stop),
}

#[derive(PartialEq, Clone, Debug)]
pub struct When {
	pub planned: Option<i64>,
	pub prognosed: Option<i64>,
	pub cancelled: Option<bool>,
}

#[derive(PartialEq, Clone, Debug)]
pub struct Line {
	pub id: Option<String>,
	pub product: i32, // todo: make this an enum?
	pub name: Option<String>,
	pub adminCode: Option<String>, // todo: make a struct?
	// todo: plenty more
}

#[derive(PartialEq, Clone, Debug)]
pub struct Vehicle {
	// todo: vehicle ID?
	// todo: route ID?
	// todo: "fahrt nr"?
	// todo: label/name?
}

#[derive(PartialEq, Clone, Debug)]
pub struct Dep {
	pub when: When,
}
