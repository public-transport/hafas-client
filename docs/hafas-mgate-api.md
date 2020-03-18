# HAFAS `mgate.exe` protocol

The protocol of `mgate.exe` HAFAS endpoints is not openly (and freely) documented. The following documentation is based on general observations and reverse-engineering.

*Note:* There are also `rest.exe` (a.k.a. "open API", a.k.a. "REST API") endpoints. This documentation is *not* about them.

## date & time format

Dates are encoded as `YYYYMMDD`, time strings as `HHMMSS`. These are in the timezone configured on the HAFAS/server side, *per endpoint*.

Whenever HAFAS returns a time string that exceeds the day the response describes, it will add a "day offset". As an example, when you query departures at `2019-12-12T23:50+01:00` for the next 30 minutes, it will encode the departure at `2019-12-13T00:13+01:00` as `20191212` & `01001300`.

For working code, check out [`parseDateTime()`](../parse/date-time.js).

## coordinate format

All endpoints I've seen so far use [WGS84](http://wiki.gis.com/wiki/index.php/WGS84). Values are multiplied by `10^6` though, so you would encode `{latitude: 1.23, longitude: -2.34}` as `{Y: 1230000: X: -2340000}`. There's an optional parameter `z` with the elevation.

For working code, check out [`formatAddress()`](../format/address.js).

## querying the API

In many aspects, the API looks and feels like [RPCs](https://en.wikipedia.org/wiki/Remote_procedure_call). You must send queries via HTTP `POST`, with the minimal JSON body looking like this:

```js
{
	"auth": {
		"type": "AID",
		"aid": "…" // endpoint-specific authentication token, e.g. `1Rxs112shyHLatUX4fofnmdxK`
	},
	"ver": "…", // endpoint-specific string, e.g. `1.15`
	"ext": "…", // endpoint-specific string, e.g. `BVG.1`
	"client": {
		"type": "IPA", // might also be `IPH` for "iPhone" or `WEB` for "web client"
		"id": "…", // endpoint-specific string, e.g. `BVG`
		"name": "…", // endpoint-specific string, e.g. `FahrInfo`
		"v": "…" // endpoint-specific string, e.g. `4070700`
	},
	"lang": "…", // language, sometimes 2-digit (e.g. `de`), sometimes 3-digit (e.g. `deu`)
	"svcReqL": [
		{
			"meth": "…", // name of the API call, supported values depend on the endpoint
			"req": {
				// actual request parameters…
			}
			// some endpoints also require this:
			"cfg": {
				"cfgGrpL": [],
				"cfgHash": "…" // endpoint-specific string
			}
		}
	]
}
```

- The data in `client` must be correct, otherwise HAFAS will reject your request.
- HAFAS will return slightly different response formats (and slightly different levels of detail) for different `ver`, `ext` and `client.v` values.
- All endpoints known support JSON & UTF-8, so make sure to send `Accept: application/json` & `Accept-Charset: utf-8` headers.
- Most endpoints support at least GZIP compression, so make sure to send a `Accept-Encoding: gzip` header.

For working code, check out [`request()`](lib/request.js).

## Authentication

There are three known types of authentication used among `mgate.exe` endpoints.

For working code, check out [`hafas-client`'s `request()`](lib/request.js), [`public-transport-enabler`'s Java implementation](https://github.com/schildbach/public-transport-enabler/blob/69614c87af627e2feafc576882f2ccccdbf4b7e6/src/de/schildbach/pte/AbstractHafasClientInterfaceProvider.java#L845-L860), [`TripKit`'s Swift implementation](https://github.com/alexander-albers/tripkit/blob/724b6cd8c258c9c61e7443c81e914618b79393cb/TripKit/AbstractHafasClientInterfaceProvider.swift#L1473-L1495) or [`marudor.de`'s TypeScript implementation](https://github.com/marudor/BahnhofsAbfahrten/blob/cf64d53c6902981ec529d3952253b2c83bff9221/src/server/HAFAS/profiles.ts#L30-L54).

### unprotected endpoints

You can just query these, as long as you send a formally correct request.

### endpoints using the `checksum` query parameter

`checksum` is a [message authentication code](https://en.wikipedia.org/wiki/Message_authentication_code): You can compute it by [hashing](https://en.wikipedia.org/wiki/Hash_function) the request body and a secret *salt*.

This secret can be read from the config file inside the accompanying client app. There is no guide for this yet, so please [open an issue](https://github.com/public-transport/hafas-client/issues/new).

### endpoints using the `mic` & `mac` query parameters

`mic` is a [message integrity code](https://en.wikipedia.org/wiki/Message_authentication_code), the [hash](https://en.wikipedia.org/wiki/Hash_function) of the request body.

`mac` is a [message authentication code](https://en.wikipedia.org/wiki/Message_authentication_code), the hash of `mic` and a secret *salt*.

This secret can be read from the config file inside the accompanying client app. There is no guide for this yet, so please [open an issue](https://github.com/public-transport/hafas-client/issues/new).

## API responses

A minimal valid response looks like this:

```js
{
	"ver": "…", // endpoint-specific string, e.g. `1.15`
	"lang": "…", // language
	"ext": "…", // endpoint-specific string, e.g. `BVG.1`
	"id": "…", // unique ID for each response?
	"svcResL": [
		{
			"meth": "StationBoard",
			"err": "OK",
			"res": {
				// result of the API call
			}
		}
	]
}
```

For working code, check out [`request()`](lib/request.js).

### parse error

todo: generic server error

```js
{
	"ver": "…", // endpoint-specific string, e.g. `1.15`
	"lang": "…", // language, sometimes 2-digit (e.g. `de`), sometimes 3-digit (e.g. `deu`)
	"err": "PARSE", // error code
	"errTxt": "…", // error message, not always present
	"svcResL": []
}
```

### authentication error

```js
{
	"ver": "…", // endpoint-specific string, e.g. `1.15`
	"lang": "…", // language
	"ext": "…", // endpoint-specific string, e.g. `BVG.1`
	"err": "AUTH", // error code
	"errTxt": "…", // error message, not always present
	"svcResL": []
}
```

### API-call-specific error

```js
{
	"ver": "…", // endpoint-specific string, e.g. `1.15`
	"lang": "…", // language
	"ext": "…", // endpoint-specific string, e.g. `BVG.1`
	"svcResL": [
		{
			"meth": "StationBoard",
			"err": "…", // error code, e.g. `H9300`
			"errTxt": "…", // error message, e.g. `Unknown arrival station`
			"res": {}
		}
	]
}
```

## more ressources

- [@Nakaner's `strecken.info` API docs](https://github.com/Nakaner/bahnstoerungen/tree/62a72b1e0f0255668500b438187ff65aef39242a/api-doc/db-strecken-info)
- [unfinished HAFAS glossary](https://gist.github.com/derhuerst/74b703e2a0fc64e4a0fa8fbb1f3a61b4)
- [various `mgate.exe` HTTP traffic recordings](https://gist.github.com/search?q=post+mgate.exe&ref=searchresults)
