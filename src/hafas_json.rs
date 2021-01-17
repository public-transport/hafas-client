#![allow(non_snake_case)]

use serde::Deserialize;

#[derive(Deserialize, Clone, Debug)]
pub struct Crd {
	pub x: i32,
	pub y: i32,
	// todo: type, layerX, crdSysX
}
#[derive(Deserialize, Clone, Debug)]
pub struct Loc {
	pub r#type: String,
	pub lid: String,
	pub extId: Option<String>,
	pub name: Option<String>,
	pub crd: Option<Crd>,
	pub pCls: Option<i32>,
	// todo: icoX, state, pRefL, mMastLocX
}

#[derive(Deserialize, Clone, Debug)]
pub struct DepStbStop {
	// todo: type
	// pub locX: Option<i32>,
	// pub idx: Option<i32>,
	// pub aOutS: Option<bool>,
	// pub aOutR: Option<bool>,
	// pub aCncl: Option<bool>,
	// pub aTimeS: Option<String>,
	// pub aTimeR: Option<String>,
	// pub aTZOffset: Option<i32>,
	// pub dOutS: Option<bool>,
	// pub dOutR: Option<bool>,
	pub dCncl: Option<bool>,
	pub dTimeS: Option<String>,
	pub dTimeR: Option<String>,
	pub dTZOffset: Option<i32>,
}

#[derive(Deserialize, Clone, Debug)]
pub struct Dep {
	// todo: status, isRchbl, subscr
	// pub jid: Jid,
	pub date: String,
	// pub prodX: Option<i32>,
	// pub dirTxt: Option<String>,
	pub stbStop: DepStbStop,
}
