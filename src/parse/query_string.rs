// I couldn't find any Rust query string parser that works with a custom
// delimiter, so I adapted the `qstring` source code here.

use percent_encoding::{percent_decode};

/// A query-string-like HAFAS-style set of key/value pairs.
///
/// Examples
///
/// Parameters can be get by their names.
///
/// ```
/// let qs = hafas_client::parse::query_string::HafasQueryString::from("foo=bar%20baz@hey=there@");
/// assert_eq!(qs.get("foo").unwrap(), "bar baz");
/// ```
///
/// Parameters not found are `None`.
///
/// ```
/// let qs = hafas_client::parse::query_string::HafasQueryString::from("foo=bar");
/// let foo = &qs.get("baz");
/// assert!(foo.is_none());
/// ```
///
/// The query string can be assembled from pairs.
///
/// ```
/// let qs = hafas_client::parse::query_string::HafasQueryString::new(vec![
///    ("foo", "bar baz"),
///    ("hey", "there"),
/// ]);
/// ```
///
#[derive(Clone, PartialEq, Debug)]
pub struct HafasQueryString {
    pub pairs: Vec<(String, String)>,
}

impl HafasQueryString {
    /// Constructs a `HafasQueryString` from a list of pairs.
    ///
    /// ```
    /// let qs = hafas_client::parse::query_string::HafasQueryString::new(vec![
    ///    ("foo", "bar baz"),
    ///    ("panda", "true"),
    /// ]);
    /// assert_eq!(qs.get("foo").unwrap(), "bar baz");
    /// ```
    pub fn new<S, T>(params: Vec<(S, T)>) -> HafasQueryString
    where
        S: Into<String>,
        T: Into<String>,
    {
        HafasQueryString {
            pairs: params
                .into_iter()
                .map(|(k, v)| (k.into(), v.into()))
                .collect(),
        }
    }

    /// Tells if a query parameter is present.
    ///
    /// ```
    /// let qs = hafas_client::parse::query_string::HafasQueryString::from("foo=bar");
    /// assert!(qs.has("foo"));
    /// ```
    pub fn has(&self, name: &str) -> bool {
        self.pairs.iter().any(|p| p.0 == name)
    }

    /// Get a query parameter by name.
    ///
    /// Empty query parameters (`foo`) return `""`
    ///
    /// ```
    /// let qs = hafas_client::parse::query_string::HafasQueryString::from("foo=bar");
    /// assert_eq!(qs.get("foo"), Some("bar"));
    /// ```
    pub fn get<'a>(&'a self, name: &str) -> Option<&'a str> {
        self.pairs
            .iter()
            .find(|pair| pair.0 == name)
            .map(|pair| pair.1.as_str())
    }
}

impl<'a> From<&'a str> for HafasQueryString {
    fn from(origin: &str) -> Self {
        HafasQueryString {
            pairs: str_to_pairs(origin),
        }
    }
}

fn str_to_pairs(origin: &str) -> Vec<(String, String)> {
    // current slice left to find params in
    let mut cur = origin;
    // where we build found parameters into
    let mut params: Vec<(String, String)> = vec![];

    while !cur.is_empty() {
        // if we're positioned on a &, skip it
        if &cur[0..1] == "@" {
            cur = &cur[1..];
            continue;
        }
        // find position of next =
        let (name, rest) = match cur.find('=') {
            // no next =, name will be until next & or until end
            None => match cur.find('@') {
                // no &, name is until end
                None => {
                    params.push((decode(&cur[..]), "".to_string()));
                    break;
                }
                // name is until next &, which means no value and shortcut
                // to start straight after the &.
                Some(pos) => {
                    params.push((decode(&cur[..pos]), "".to_string()));
                    cur = &cur[(pos + 1)..];
                    continue;
                }
            },
            Some(pos) => {
                if let Some(apos) = cur.find('@') {
                    if apos < pos {
                        params.push((decode(&cur[..apos]), "".to_string()));
                        cur = &cur[(apos + 1)..];
                        continue;
                    }
                }
                (&cur[..pos], &cur[(pos + 1)..])
            }
        };
        // skip parameters with no name
        if name.is_empty() {
            cur = rest;
            continue;
        }
        // from rest, find next occurence of &
        let (value, newcur) = match rest.find('@') {
            // no next &, then value is all up until end
            None => (rest, ""),
            // found one, value is up until & and next round starts after.
            Some(pos) => (&rest[..pos], &rest[(pos + 1)..]),
        };
        // found a parameter
        params.push((decode(name), decode(value)));
        cur = newcur;
    }
    params
}

impl std::fmt::Display for HafasQueryString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self.pairs)
    }
}

impl Into<std::vec::IntoIter<(String, String)>> for HafasQueryString {
    fn into(self) -> std::vec::IntoIter<(String, String)> {
        self.pairs.into_iter()
    }
}

fn decode(s: &str) -> String {
    percent_decode(s.as_bytes())
        .decode_utf8()
        .map(|cow| cow.into_owned())
        .unwrap_or_else(|_| s.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    macro_rules! test {
        ($func_name:ident, $origin:expr, $result:expr) => {
            #[test]
            fn $func_name() {
                let qs = HafasQueryString::from($origin);
                let cs: Vec<(String, String)> = ($result as Vec<(&str, &str)>)
                    .into_iter()
                    .map(|(k, v)| (k.to_string(), v.to_string()))
                    .collect();
                assert_eq!(qs.pairs, cs);
            }
        };
    }

    test!(empty_1, "", vec![]);
    test!(empty_2, "@", vec![]);
    test!(empty_3, "@@", vec![]);
    test!(empty_4, "=", vec![]);

    test!(a_is_1, "a", vec![("a", "")]);
    test!(a_is_2, "a=", vec![("a", "")]);
    test!(a_is_3, "a=b", vec![("a", "b")]);
    test!(a_is_7, "@a", vec![("a", "")]);
    test!(a_is_8, "@a=", vec![("a", "")]);
    test!(a_is_9, "@a=@", vec![("a", "")]);
    test!(a_is_10, "@a=b", vec![("a", "b")]);
    test!(a_is_11, "@a=b@", vec![("a", "b")]);
    test!(a_is_12, "a=@", vec![("a", "")]);
    test!(a_is_13, "=a", vec![("a", "")]);

    test!(a_is_eq_1, "a==", vec![("a", "=")]);

    test!(ac_is_1, "a@c", vec![("a", ""), ("c", "")]);
    test!(ac_is_2, "a@c@", vec![("a", ""), ("c", "")]);
    test!(ac_is_3, "a=@c", vec![("a", ""), ("c", "")]);
    test!(ac_is_4, "a=@c=", vec![("a", ""), ("c", "")]);
    test!(ac_is_5, "a=b@c=", vec![("a", "b"), ("c", "")]);
    test!(ac_is_6, "a=@c=d", vec![("a", ""), ("c", "d")]);
    test!(ac_is_7, "a=b@c=d", vec![("a", "b"), ("c", "d")]);
}
