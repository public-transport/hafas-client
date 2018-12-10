# Migrating to `hafas-client@4`

## If you use Node `6`…

…migrate to Node `8`, sorry. 46becf2

## If you use `line.class` or `line.productCode`…

…write a custom `parseLine` implementation that exposes them. An example with the VBB profile:

```js
const createOrigParseLine = require('hafas-client/parse/line')

const createParseLine = (profile, opt, data) => {
	const origParseLine = createOrigParseLine(profile, opt, data)

	const parseLine = (p) => {
		const res = origParseLine(p)
		res.class = p.cls
		return res
	}
}

const customVbbProfile = Object.assign({}, vbbProfile)
customVbbProfile.parseLine = createParseLine

const hafas = createHafas(customVbbProfile, 'my-awesome-program')
```

## If you use the `station()` method…

…change the `station(id)` call to `stop(id)`. 94fb64d

## If you use the `locations()` method…

…pass `opt.results` if you want more than 5 results. 4ed2436

## If you use the `journeys()` method…

…rename `leg.id` to `leg.tripId`. 6bc4755
…rename `leg.nextStops` to `movement.nextStopovers`. b4d763f

## If you use the `trip()` method…

…rename `leg.nextStops` to `movement.nextStopovers`. b4d763f

## If you use the `radar()` method…

…rename `movement.nextStops` to `movement.nextStopovers`. b4d763f

## If you use `hafas-client` with custom parse functions…

…change the `parseDateTime` to

- return an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string – c01df39
- have accept an optional `tzOffset` – b1e1e53

…change the `parseLocation` to strip leading zeros from stop/station IDs – 53027ec
