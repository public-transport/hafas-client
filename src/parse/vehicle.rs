use crate::hafas_json;
use crate::types::*;

// todo: make this a trait?
pub fn parse_line(prod: hafas_json::Prod) -> Line {
    Line {
        id: match prod.prodCtx {
            Some(ref ctx) => ctx.lineId.as_ref().map(|id| id.clone()),
            _ => None,
        },
        product: prod.cls,
        // todo: these might all be `Some("")`
        // todo: make this profile-specific?
        name: prod.addName.or(prod.name),
        adminCode: match prod.prodCtx {
            Some(ref ctx) => ctx.admin.as_ref().map(|a| a.clone()),
            _ => None,
        },
    }
}

// todo: make this a trait?
#[allow(unused_variables)]
pub fn parse_vehicle(prod: hafas_json::Prod) -> Vehicle {
    Vehicle {
    }
}

#[cfg(test)]
mod tests {
	use crate::hafas_json as haf;
	use super::*;

    #[test]
    fn parse_line_basic_db() {
        let p = haf::Prod {
            pid: None,
            cls: 32,
            icoX: Some(2),
            oprX: None,
            name: Some("Bus N7".to_string()),
            nameS: Some("N7".to_string()),
            addName: None,
            prodCtx: Some(haf::ProdCtx {
                lineId: Some("5_vbbBVB_N7".to_string()),
                admin: None,
            }),
            number: None,
            himIdL: None,
        };
        assert_eq!(parse_line(p), Line {
            id: Some("5_vbbBVB_N7".to_string()),
            product: 32,
            name: Some("Bus N7".to_string()),
            adminCode: None,
        });
    }

    #[test]
    fn parse_line_detailed_db() {
        let p = haf::Prod {
            pid: None,
            name: Some("U 7".to_string()),
            nameS: Some("7".to_string()),
            addName: None,
            number: Some("7".to_string()),
            icoX: Some(0),
            cls: 128,
            oprX: Some(0),
            prodCtx: Some(haf::ProdCtx {
                // name: Some("U      7".to_string()),
                // num: Some("19245".to_string()),
                // line: Some("7".to_string()),
                lineId: Some("7_vbbBVU_7".to_string()),
                // matchId: Some("".to_string()),
                // catOut: Some("U".to_string()),
                // catOutS: Some("U".to_string()),
                // catOutL: Some("U-Bahn".to_string()),
                // catIn: Some("U".to_string()),
                // catCode: Some("7".to_string()),
                admin: Some("vbbBVU".to_string()),
            }),
            himIdL: None,
        };
        assert_eq!(parse_line(p), Line {
            id: Some("7_vbbBVU_7".to_string()),
            product: 128,
            name: Some("U 7".to_string()),
            adminCode: Some("vbbBVU".to_string()),
        });
    }

    #[test]
    fn parse_line_detailed_vbb() {
        let p = haf::Prod {
            pid: Some("L::3::Bus::B1090519025::Bus_1090519025_S5X::*".to_string()),
            name: Some("S5X".to_string()),
            nameS: Some("S5X".to_string()),
            addName: None,
            number: Some("S5X".to_string()),
            icoX: Some(1),
            cls: 8,
            oprX: Some(0),
            prodCtx: Some(haf::ProdCtx {
                lineId: None,
                // name: Some("     S5X".to_string()),
                // num: Some("926".to_string()),
                // line: Some("S5X".to_string()),
                // matchId: Some("65150".to_string()),
                // catOut: Some("Bus     ".to_string()),
                // catOutS: Some("Bus".to_string()),
                // catOutL: Some("Bus     ".to_string()),
                // catIn: Some("Bus".to_string()),
                // catCode: Some("3".to_string()),
                admin: Some("SEV---".to_string()),
            }),
            himIdL: Some(vec![
                "HIM_FREETEXT_105582".to_string(),
            ]),
        };
        assert_eq!(parse_line(p), Line {
            id: None,
            product: 8,
            name: Some("S5X".to_string()),
            adminCode: Some("SEV---".to_string()),
        });
    }
}
