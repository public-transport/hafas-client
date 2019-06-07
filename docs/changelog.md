# Changelog

## `4.2.0`

- 6da1e80 add `leg.reachable`

## `4.1.1`

- 875ea18 parse scheduled/actual platform information on legs, fixes #116 🐛
- f92e933 [DB](../p/db) departures/arrivals: parse load factor #112

## `4.1.0`

- 831bcaf ISO date+time: suppress milliseconds if 0
- 3e01303/75432fc CFG profile
- 820f2ab `parseWarning`: parse products
- 3ab099b/57c7186 HVV profile

## `4.0.3`

- 6aa57d4 `parseJourneyLeg`/`parseMovement`/`parseArrival`/`parseDeparture`: handle missing `dirTxt` 🐛

## `4.0.2`

- 133cee9 `parseWarning`: expose `warning.id` 🐛

## `4.0.1`

- 5d49fd0 `parseDateTime`: fix `tzOffset` & `daysOffset` 🐛

## `4.0.0`

This version is not fully backwords-compatible. Check out [the migration guide](migrating-to-4.md).

### breaking changes 💥

- 1e13cf1/b99ceb2 `parseLocation`: strip leading zeros from IDs
- a9fd9ff `parseDateTime`: return ISO string/timestamp
- ca1105f `parseDateTime`: parse timezone offset if given
- bf3c4c5 require Node `>=8.3.0`
- bbff1f4 `movement.nextStops` -> `movement.nextStopovers`
- bad0af8/8b87868/2e12206 rename `station(id)` -> `stop(id)`
- 96ff59d/0daa1c5/88c78c2 `leg.id` -> `leg.tripId`
- 3bc2eff `locations()`: default `opt.results` to `5`
- a1ffad3/cb535cd `parseLine`: remove `line.class` & `line.productCode`
- fcc53b5/b2b2d11/a1c40ad `journeys()`: return object with `journeys`, `earlierRef`, `laterRef`
- 61e7d14 `journeys()`: default `opt.transfers` to `-1`
- d7e439b debugging: `NODE_DEBUG` -> `DEBUG`
- 8f9b22e `locations()`, `nearby()`: `opt.stations` -> `opt.stops`
- a972dad `departures()`/`arrivals()`, `locations()`, `nearby()`, `stop()`: `opt.stationLines` -> `opt.linesOfStops`
- 0e1fcb0/0e1fcb0 `leg.mode: 'walking'` -> `leg.walking: true`
- 567cc98 DB, INSA, Nah.SH, ÖBB: `nationalExp` -> `nationalExpress`
- 9c44995 remove `arrival.trip`/`departure.trip` & `movement.trip`
- eb3ffba/eab850e mark POIs objects with `poi: true`
- 748f8ce `createThrottledClient` -> `withThrottling`
- fbde6a1 `createClientWithRetry` -> `withRetrying`
- 1646173 throw `Error`s -> `TypeError`s
- 7e39a2f/3b0740d `formerScheduled…` -> `scheduled…`

### bugfixes 🐛

- fcc2a23 ÖBB `journeys()`: fix `opt.results`

## `3.10.1`

- dafc96a update CMTA credentials
- 46e7729 remove `console.error` call 🐛

## `3.10.0`

- d797333/1e16a10 [DB](../p/db): parse additional line names

## `3.9.1`

- a145fea extend default retrying options 🐛

## `3.9.0`

- b0f786c support for retrying failed requests ✨ – [docs](readme.md#retrying-failed-requests)

## `3.8.1`

- 3f58d84 handle `stop` objects as input 🐛

## `3.8.0`

- 5d0096c `departures()`: profile flag for `getPasslist` & `stbFilterEquiv`
- #99 [Saarfahrplan profile](p/saarfahrplan) – Thanks @ialokim & @juliuste!

## `3.7.0`

- e867dac/f097022 `opt.stopovers`, `departure.nextStopovers`/`arrival.previousStopovers`

## `3.6.3`

- cb2d298 `stop`s/`station`s: default `id` of `null` 🐛

## `3.6.2`

- 5beff47 `radar()`: fix `polylines` option 🐛
- 48424cf `p-throttle` as normal dependency 🐛

## `3.6.1`

- b809281 fix error parsing 🐛
- bcbc366/ae2007c/e1f1d0d ÖBB `radar()`: fix filtering of `movement.nextStops` 🐛

## `3.6.0`

- 4b56f66 parse `journey.cycle` if returned by HAFAS
- 17b8f14 `journeyLeg.cycle`: parse `nr` field if returned by HAFAS
- 8fac5fc `journeyLeg.alternatives`: parse `direction`, `delay`, `tripId`

## `3.5.0`

- 9d96902 `readableFrom()`: make `opt.maxDuration` optional
- 02e0e51 parse scheduled days of a `journey`

## `3.4.3`

- 9936466 `p-throttle@2`, `tape-promise@4`

## `3.4.2`

- 2a6b0dc speed up date+time formatting ⚡️

## `3.4.1`

- ed3ecd7 speed up date+time formatting ⚡️

## `3.4.1`

- 582c9de speed up date+time parsing ⚡️

## `3.4.0`

- #81 [S-Bahn München profile](p/sbahn-muenchen) – Thanks @flori-uni!

## `3.3.1`

- 035877c `reachableFrom()` retry 🐛

## `3.3.0`

- #80/b36ccda `reachableFrom()` method – [docs](reachable-from.md)

## `3.2.1`

- 044a5ee `arrivals()`: return a `direction` of `null` :bug:
- b37bedb parse `line.id` if possible

## `3.2.0`

- #79 [CapMetro/CMTA profile](p/cmta) – Thanks @nickturskyi!

## `3.1.2`

- f796337 handle warnings without schedule `sDate`/`eDate`/`lModDate` 🐛

## `3.1.1`

- 39cc2f3 fix install on Windows 🐛

## `3.1.0`

- 9257d3a parse `line.fahrtNr`

## `3.0.0`

This version is not fully backwords-compatible. Check out [the migration guide](migrating-to-3.md).

### new features ✨

- 2d3796a BVG profile
- 0db84ce #61 parse remarks for stopovers and journey legs
- ac9819b `arrivals()` method – [docs](arrivals.md)
- 5b754aa `refreshJourney()` method – [docs](refresh-journey.md)
- 21c273c `journeys()`/`trip()`: leg stopovers: parse & expose delays
- 021ae45 `journeys()`/`trip()`: leg stopovers: parse & expose platforms
- 84bce0c `arrivals()`/`departures()`: parse & expose platforms
- 85e0bdf `journeys()`: `startWithWalking` option with default `true`
- f6ae29c journey legs with `type: 'walking'` now have a `distance` in meters
- 0d5a8fa departures, arrivals, stopovers: former scheduled platform(s)
- 0199749 `language` option with default `en`
- 1551943 `arrivals()`/`departures()`: `includeRelatedStations` option with default `true`

### breaking changes 💥

- c4935bc new mandatory `User-Agent` parameter
- b7c1ee3 profiles: new products markup ([guide](https://github.com/public-transport/hafas-client/blob/ebe4fa64d871f711ced99d528c0171b180edc135/docs/writing-a-profile.md#3-products))
- 40b559f change `radar(n, w, s, e)` signature to `radar({north, west, south, east})`
- 005f3f8 remove `journey.departure`, `journey.arrival`, …
- 0ef0301 validate `opt.when`
- 431574b parse polylines using `profile.parsePolyLine` – [docs for the output format](https://github.com/public-transport/hafas-client/blob/ebe4fa64d871f711ced99d528c0171b180edc135/docs/journey-leg.md#polyline-option)
- a356a26 throw if 0 products enabled
- c82ad23 `journeys()`: `opt.when` → `opt.departure`/`opt.arrival`
- 665bed9 rename `location(id)` to `station(id)`
- 6611f26 `journeys()`/`trip()`: `leg.passed` → `leg.stopovers`
- ebe4fa6 `journeys()`/`trip()`: `opt.passedStations` → `opt.stopovers`
- 3e672ee `journeys()`/`trip()`: `stopover.station` → `stopover.stop`
- 2e6aefe journey leg, departure, movement: `journeyId` -> `tripId`
- 8881d8a & b6fbaa5: change parsers signature to `parse…(profile, opt, data)`
- cabe5fa: option to parse & expose `station.lines`, default off
- c8ff217 rename `journeyLeg()` to `trip()`
- 8de4447 rename `profile.journeyLeg` to `profile.trip`

### bugfixes

- dd0a9b2 `parseStopover`: fix first/last canceled stopovers 🐛

## `2.10.3`

- 50bd440 better `User-Agent` randomization

## `2.10.2`

- d54c26d randomize `User-Agent`

## `2.10.1`

- 04d550f parse `TRSF` legs as `walking` 🐛

## `2.10.0`

- 4da8689 journey legs with `type: 'walking'` now have a `distance` in meters
- c1bdade `departures()`: parse & expose platforms
- fccd3d0 `journeys()`: `startWithWalking` option

## `2.9.1`

- a952b08 notes on how to use `hafas-client` with react-native 📝
- 38a3749 `parseStopover`: fix first/last canceled stopovers 🐛

## `2.9.0`

- 49186ae journey leg passed stations: add `arrivalDelay` & `departureDelay`
- deb8829 [`journeys()`](journeys.md): new `whenRepresents` option
- f3d8304 let the `insa` and `nahsh` profiles use HTTPS

## `2.8.1`

- 769f2e3 send `Accept: application/json`

## `2.8.0`

- 16c3f01 enable [`journeyLeg()`](journey-leg.md) for [DB](../p/db)

## `2.7.5`

- 908d531 [DB](../p/db) [`journeys()`](journeys.md): fix polylines parsing 🐛

## `2.7.4`

- 709b7b4 update dependencies

## `2.7.3`

- 48f2cef each movement from `radar()` now has a `journeyId` field

## `2.7.2`

- a97e0d3 fix polylines parsing 🐛

## `2.7.1`

- aa480e0 fix polylines parsing 🐛

## `2.7.0`

- `journeys()`: `polylines` option
- `journeyLeg()`: `polyline` option
- `radar()`: `polylines` option

## `2.6.0`

- 5d10d76 journey legs: parse cycle

## `2.5.3`

- d676b84 fix parsing for journey leg alternatives 🐛

## `2.5.2`

- 16e6dd6 departure docs: fix method 📝
- c60213a DB: tram mode should be `train` 🐛

## `2.5.1`

- afc0124 fix stopover parsing 🐛

## `2.5.0`

- new [Schleswig-Holstein (NAH.SH)](https://de.wikipedia.org/wiki/Nahverkehrsverbund_Schleswig-Holstein) [profile](../p/nahsh)
- new [*writing a profile* guide](./writing-a-profile.md)

## `2.4.2`

- `parseStopover`: expose canceled arrivals & departures 🐛

## `2.4.1`

- new [*writing a profile* guide](./writing-a-profile.md)
- `parseMovement`: use `parseStopover` 🐛
- `parseStopover`: use `parseStationName` 🐛

## `2.4.0`

- new [Nahverkehr Sachsen-Anhalt (NASA)](https://de.wikipedia.org/wiki/Nahverkehrsservice_Sachsen-Anhalt)/[INSA](https://insa.de) profile
- new `earlierRef`/`laterRef` feature to query earlier/later journeys (pagination)
- former scheduled date & time for canceled departures & journeys
