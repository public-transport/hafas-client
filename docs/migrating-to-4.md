# Migrating to `hafas-client@4`

## If you use Node `6`…

…migrate to Node `8`, sorry. 53753a9

## If you use the `journeys()` method…

…use the `journeys` entry from the returned object. 7a633c0
…rename `leg.id` to `leg.tripId`. 03b272e
…rename `leg.nextStops` to `movement.nextStopovers`. e5b0c1f
…use `leg.walking === true` to check for walking legs. 0e9bd0d
…use `leg.walking` instead of `leg.mode === 'walking'` to find walking legs. bbfdf03
…explicitly pass a value for `opt.transfers` if you want to limit the nr of transfers. 764f560

## If you use the `departures()`/`arrivals()` method…

…rename `opt.stationLines` to `opt.linesOfStops`. 251b8cc

## If you use the `station()` method…

…change the `station(id)` call to `stop(id)`. 46ea5a8

## If you use the `locations()` method…

…pass `opt.results` if you want more than 5 results. 0a3b32d
…rename `opt.stationLines` to `opt.linesOfStops`. 251b8cc

## If you use the `trip()` method…

…rename `leg.nextStops` to `movement.nextStopovers`. e5b0c1f

## If you use the `nearby()` method…

…rename `opt.stations` to `opt.stops`. 84146e2
…rename `opt.stationLines` to `opt.linesOfStops`. 251b8cc

## If you use the `radar()` method…

…rename `movement.nextStops` to `movement.nextStopovers`. e5b0c1f

## If you use the DB/INSA/Nah.SH/ÖBB profile…

…rename the product identifier `nationalExp` to `nationalExpress`. 104f74a

## If you use POIs…

…use the `poi: true` flag to check if a location is a POI. af3e813
…add `poi: true` to a location to make it a POI. af3e813

## If you use `arrival.trip`/`departure.trip` or `movement.trip`…

…[let us know](https://github.com/public-transport/hafas-client/issues) why you need it. We removed it because it is not reliable. 6fffe35

## If you use `hafas-client/throttle`…

…check out the [new and slightly different throttling API](readme.md#throttling-requests). 24f9db5

## If you use `hafas-client/retry`…

…check out the [new and slightly different retrying API](readme.md#retrying-failed-requests). fe4bca9

## If you use `arrival.formerScheduledPlatform`/`departure.formerScheduledPlatform`…

…rename to `arrival.scheduledPlatform`/`departure.scheduledPlatform`. 53ecac4

## If you use `arrival.formerScheduledWhen`/`departure.formerScheduledWhen`…

…rename to `arrival.scheduledWhen`/`departure.scheduledWhen`. 53ecac4

## If you use `leg.formerScheduledArrival`/`leg.formerScheduledDeparture`…

…rename to `leg.scheduledArrival`/`leg.scheduledDeparture`. 53ecac4

## If you use `stopover.formerScheduledArrival`/`stopover.formerScheduledDeparture`…

…rename to `stopover.scheduledArrival`/`stopover.scheduledDeparture`. 53ecac4

## If you use `stopover.formerScheduledArrivalPlatform`/`stopover.formerScheduledDeparturePlatform`…

…rename to `stopover.scheduledArrivalPlatform`/`stopover.scheduledDeparturePlatform`. 53ecac4

## If you use `line.class` or `line.productCode`…

…write a custom `parseLine` implementation that exposes them. 7a633c0

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

- return an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string. 8c238e3
- have accept an optional `tzOffset`. 427305f

…change the `parseLocation` to strip leading zeros from stop/station IDs. 53027ec

## If you inspect errors thrown by `hafas-client`…

…adapt your code to 76546bf.
