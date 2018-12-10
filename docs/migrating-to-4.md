# Migrating to `hafas-client@4`

## If you use Node `6`…

…migrate to Node `8`, sorry. 46becf2

## If you use the `station()` method…

…change the `station(id)` call to `stop(id)`. 94fb64d

## If you use the `locations()` method…

…pass `opt.results` if you want more than 5 results. 4ed2436

## If you use the `journeys()` method…

…rename `leg.id` to `leg.tripId`. 6bc4755
…rename `leg.nextStops` to `movement.nextStopovers`. b4d763f
…use `leg.walking` instead of `leg.mode === 'walking'` to find walking legs. bbfdf03

## If you use the `trip()` method…

…rename `leg.nextStops` to `movement.nextStopovers`. b4d763f

## If you use the `radar()` method…

…rename `movement.nextStops` to `movement.nextStopovers`. b4d763f

## If you use the DB/INSA/Nah.SH/ÖBB profile…

…rename the product identifier `nationalExp` to `nationalExpress`. f1eea19

## If you use POIs…

…use the `poi: true` flag to check if a location is a POI. d52db5c
…add `poi: true` to a location to make it a POI. d52db5c

## If you use `arrival.trip`/`departure.trip` or `movement.trip`…

…[let us know](https://github.com/public-transport/hafas-client/issues) why you need it. We removed it because it is not reliable. 03df76e

## If you use `hafas-client/throttle`…

…check out the [new and slightly different throttling API](readme.md#throttling-requests). 349079e

## If you use `hafas-client/retry`…

…check out the [new and slightly different retrying API](readme.md#retrying-failed-requests). ee7442c

## If you use `arrival.formerScheduledPlatform`/`departure.formerScheduledPlatform`…

…rename to `arrival.scheduledPlatform`/`departure.scheduledPlatform`. 969c045

## If you use `arrival.formerScheduledWhen`/`departure.formerScheduledWhen`…

…rename to `arrival.scheduledWhen`/`departure.scheduledWhen`. 969c045

## If you use `leg.formerScheduledArrival`/`leg.formerScheduledDeparture`…

…rename to `leg.scheduledArrival`/`leg.scheduledDeparture`. 969c045

## If you use `stopover.formerScheduledArrival`/`stopover.formerScheduledDeparture`…

…rename to `stopover.scheduledArrival`/`stopover.scheduledDeparture`. 969c045

## If you use `stopover.formerScheduledArrivalPlatform`/`stopover.formerScheduledDeparturePlatform`…

…rename to `stopover.scheduledArrivalPlatform`/`stopover.scheduledDeparturePlatform`. 969c045

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

## If you use `hafas-client` with custom parse functions…

…change the `parseDateTime` to

- return an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string – c01df39
- have accept an optional `tzOffset` – b1e1e53

…change the `parseLocation` to strip leading zeros from stop/station IDs – 53027ec

## If you inspect errors thrown by `hafas-client`…

…adapt your code to 76546bf.
