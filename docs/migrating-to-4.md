# Migrating to `hafas-client@4`

## If you use Node `6`…

…migrate to Node `8`, sorry. bf3c4c5

## If you use the `journeys()` method…

…use the `journeys` entry from the returned object. fcc53b5
…rename `leg.id` to `leg.tripId`. 96ff59d
…use `leg.walking === true` to check for walking legs. 0e1fcb0
…explicitly pass a value for `opt.transfers` if you want to limit the nr of transfers. 61e7d14

## If you use the `departures()`/`arrivals()` method…

…rename `opt.stationLines` to `opt.linesOfStops`. a972dad

## If you use the `station()` method…

…change the `station(id)` call to `stop(id)`. bad0af8

## If you use the `locations()` method…

…pass `opt.results` if you want more than 5 results. 3bc2eff
…rename `opt.stationLines` to `opt.linesOfStops`. a972dad

## If you use the `trip()` method…

…rename `leg.nextStops` to `leg.nextStopovers`. bbff1f4

## If you use the `nearby()` method…

…rename `opt.stations` to `opt.stops`. 8f9b22e
…rename `opt.stationLines` to `opt.linesOfStops`. a972dad

## If you use the `radar()` method…

…rename `movement.nextStops` to `movement.nextStopovers`. bbff1f4

## If you use the DB/INSA/Nah.SH/ÖBB profile…

…rename the product identifier `nationalExp` to `nationalExpress`. 567cc98

## If you use POIs…

…use the `poi: true` flag to check if a location is a POI. eb3ffba
…add `poi: true` to a location to make it a POI. eb3ffba

## If you use `arrival.trip`/`departure.trip` or `movement.trip`…

…[let us know](https://github.com/public-transport/hafas-client/issues) why you need it. We removed it because it is not reliable. 9c44995

## If you use `hafas-client/throttle`…

…check out the [new and slightly different throttling API](readme.md#throttling-requests). 748f8ce

## If you use `hafas-client/retry`…

…check out the [new and slightly different retrying API](readme.md#retrying-failed-requests). fbde6a1

## If you use `arrival.formerScheduledPlatform`/`departure.formerScheduledPlatform`…

…rename to `arrival.scheduledPlatform`/`departure.scheduledPlatform`. 7e39a2f

## If you use `arrival.formerScheduledWhen`/`departure.formerScheduledWhen`…

…rename to `arrival.scheduledWhen`/`departure.scheduledWhen`. 7e39a2f

## If you use `leg.formerScheduledArrival`/`leg.formerScheduledDeparture`…

…rename to `leg.scheduledArrival`/`leg.scheduledDeparture`. 7e39a2f

## If you use `stopover.formerScheduledArrival`/`stopover.formerScheduledDeparture`…

…rename to `stopover.scheduledArrival`/`stopover.scheduledDeparture`. 7e39a2f

## If you use `stopover.formerScheduledArrivalPlatform`/`stopover.formerScheduledDeparturePlatform`…

…rename to `stopover.scheduledArrivalPlatform`/`stopover.scheduledDeparturePlatform`. 7e39a2f

## If you use `line.class` or `line.productCode`…

…write a custom `parseLine` implementation that exposes them. a1ffad3

An example with the VBB profile:

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

- return an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string. a9fd9ff
- have accept an optional `tzOffset`. ca1105f

…change the `parseLocation` to strip leading zeros from stop/station IDs. 1e13cf1

## If you inspect errors thrown by `hafas-client`…

…adapt your code to 1646173.
