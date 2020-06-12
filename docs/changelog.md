# Changelog

## `5.6.1`

- de896b1 `parseCommon`: respect `opt.polyline` 🐛
- fc2e214 ÖBB: add `trip()` test ✅
- dce42bf move trip parsing into `parse/trip`

[🏷 `5.6.1`](https://github.com/public-transport/hafas-client/releases/tag/5.6.1), 2020-06-13

## `5.6.1`

- 542aa8c parse `DEVI` journey legs (#175)
- 3ca4a0c/57fc610 `arrivals()`: add `provenance` field (#180)
- ee94c65 ÖBB: improve `onCall` product name
- a8a9303 `nearby()`: return at most `opt.results` results

[🏷 `5.6.1`](https://github.com/public-transport/hafas-client/releases/tag/5.6.1), 2020-06-10

## `5.6.0`

- 07c77f8/76e3102/1abafb5/d92eb15/0251e31 parse stop/station entrances & sub-stops (#153)
- 9e75f42/0251e31/322004b DB: parse *Reisezentrum* opening hours & station facilities (#153)

[🏷 `5.6.0`](https://github.com/public-transport/hafas-client/releases/tag/5.6.0), 2020-05-21

## `5.5.1`

- 3c888a0 `refreshJourney()`: actually throw the error 🐛, add error code
- e02a20b readme: update links 📝
- b302ba7 minor readme/documentation tweaks 📝

[🏷 `5.5.1`](https://github.com/public-transport/hafas-client/releases/tag/5.5.1), 2020-05-21

## `5.5.0`

- fa3146d/9c4189a add [*SVV* profile](../p/svv)
- e032ec1 "invalid response" error: add `isHafasError: true` flag
- 0699d4d `departures()`/`arrivals()`: let `results` option default to `null`
- 1b01331 use `object-scan@13` ⚡️

[🏷 `5.5.0`](https://github.com/public-transport/hafas-client/releases/tag/5.5.0), 2020-04-09

## `5.4.0`

- 01b3693/17031f3/7d3107e add [*SNCB*/*NMBS* profile](../p/sncb)
- ae74bb4 `departures()`/`arrivals()`: add `results` option

[🏷 `5.4.0`](https://github.com/public-transport/hafas-client/releases/tag/5.4.0), 2020-03-29

## `5.3.1`

- 916ac30 PKP: trim `-` from stop names
- a939090 INSA: `ver` `1.21` -> `1.18` 🐛
- 2cb6a0c `parseIcon()`, `parseHint()`, `parseLocation()`: handle more edge cases 🐛
- 0dceb41 `parseJourneyLeg()`: parse isRchbl correctly 🐛
- 78487d9 `journeys()`: default `earlierRef` & `laterRef` to `null` 🐛
- cda96b6 improve docs 📝

[🏷 `5.3.1`](https://github.com/public-transport/hafas-client/releases/tag/5.3.1), 2020-03-18

## `5.3.0`

- 1c790e1/299b5ac add [*INVG* profile](../p/invg)
- d5116c2/c2b15fa add [*PKP* profile](../p/pkp)
- 682f9f9/8540f5f add [*VBN* profile](../p/vbn)
- 3a9e548/0ea2c01 add [*RMV* profile](../p/rmv)
- 84637b2/522248b add [*RSAG* profile](../p/rsag)
- 86ddf2c add [*VMT* profile](../p/vmt)

[🏷 `5.3.0`](https://github.com/public-transport/hafas-client/releases/tag/5.3.0), 2020-03-12

## `5.2.0`

- 1b03b2e INSA: protocol version `1.21`, enable [`reachableFrom()`](reachable-from.md)
- 2a24137/3ea9380 `parseLocation()`: parse foreign stop IDs
- 3ea9380 `parseLocation()`: parse fare zone, transit authority
- 8c7f164 `parseLine()`: expose admin code
- b9d5c85 add DB & INSA `stop()` tests

[🏷 `5.2.0`](https://github.com/public-transport/hafas-client/releases/tag/5.2.0), 2020-03-08

## `5.1.2`

- e5abe3d DB: fix journey leg loadFactor parsing 🐛
- bc30309 fix undefined variables 🐛
- db94a62/c072a70/df010fc/9874292 add linting

[🏷 `5.1.2`](https://github.com/public-transport/hafas-client/releases/tag/5.1.2), 2020-03-02

## `5.1.1`

- 8cb7d80 improve `findInTree` performance (#152) ⚡️
- 940519b make readme more helpful 📝
- 9522e92 `object-scan@11`

[🏷 `5.1.1`](https://github.com/public-transport/hafas-client/releases/tag/5.1.1), 2020-02-22

## `5.1.0`

- 542a9ee/1c67350/738354d add [*VSN* profile](../p/vsn)
- dfff999 `request()`: add resonse ID to error objects
- c1beb28 `Error` -> `TypeError`

[🏷 `5.1.0`](https://github.com/public-transport/hafas-client/releases/tag/5.1.0), 2020-02-08

## `5.0.4`

- db9287f [`@mapbox/polyline`](https://www.npmjs.com/package/@mapbox/polyline) -> [`google-polyline`](https://www.npmjs.com/package/google-polyline)
- 9b0e55c VBB: accept station IDs with an unknown length 🐛
- ea4912a debug CLI: accept JS objects

[🏷 `5.0.4`](https://github.com/public-transport/hafas-client/releases/tag/5.0.4), 2020-02-03

## `5.0.3`

- 8c6a8d8 `findInTree`: improved performance ⚡️
- c080f32 `vbb-translate-ids@4` 🐛

[🏷 `5.0.3`](https://github.com/public-transport/hafas-client/releases/tag/5.0.3), 2020-01-29

## `5.0.2`

- e049aa3 `parseWarning()`: fix `parseMsgEvent()` 🐛

[🏷 `5.0.2`](https://github.com/public-transport/hafas-client/releases/tag/5.0.2), 2020-01-15

## `5.0.1`

- 51b1e68 `throttle.js`, `retry.js`: use default profile 🐛

[🏷 `5.0.1`](https://github.com/public-transport/hafas-client/releases/tag/5.0.1), 2020-01-15

## `5.0.0`

Note that this version is not backwords-compatible with `4.*`. Check out [the migration guide](migrating-to-5.md).

### breaking changes 💥

- 2f8f82f require Node `>=10`
- 29a2cf3/2b9280e add `plannedArrival`/`plannedDeparture`/`plannedWhen`, `scheduled*` -> `planned*`/`prognosed*`
- 938a6f2/2d1d482 add `plannedArrivalPlatform`/`plannedDeparturePlatform`/`plannedPlatform`, `scheduled*` -> `planned*`/`prognosed*`
- 35e44d4 `parseWarning()`/`parseHint()`: change signature to `(profile, raw, data) => …`
- 4162328 `createClient()`: change signature to `(profile, userAgent, opt = {}) => …`
- fb7a565/252ce5b/9fc6664/2cfee22/e2567ef change parse fns signature to `({profile, opt, res, common}) => (rawData) => …`
- baff692 `journeys()`: don't request nr of results by default
- b8496be DB `journeys()`: let `journey.price` default to `null`
- 6d5c608 call `request()` via `profile`

### features

- f8210c5/9c47a39/0c145d3/9a89cd0 `journeys()`: add `walkingSpeed` option
- a40006f/1afe4ca BVG: support *BerlKönig*, add E2E test
- 352fa2e parse more warning fields
- 8b2a5a8 `parseIcon()`: use `.txt` & `.txtS` as text fallback
- 39a6267 request formatters (e.g. `formatTripReq()`) via `profile`

### bugfixes 🐛

- 5ea22f7 `parseHint()`: parse `.code` & `.text` properly
- 29d7bd4 `parseJourney()`: fix `journey.scheduledDays` year
- 9a6bc2d `parseWarning()`: call `parseDateTime()` via `profile`
- 7b7293e `request()`: use *transformed* `req`

[🏷 `5.0.0`](https://github.com/public-transport/hafas-client/releases/tag/5.0.0), 2020-01-05

## `4.8.0`

- 56dee66/46eadcf/1611635 add [*DB Busradar NRW* profile](../p/db-busradar-nrw)

[🏷 `4.8.0`](https://github.com/public-transport/hafas-client/releases/tag/4.8.0), 2019-12-29

## `4.7.0`

- fceaf86 parse `Q` hints
- c883d96 documentation for `mgate.exe` endpoints

[🏷 `4.7.0`](https://github.com/public-transport/hafas-client/releases/tag/4.7.0), 2019-12-26

## `4.6.2`

- 105c18b DB: always use `rtMode: HYBRID`

[🏷 `4.6.2`](https://github.com/public-transport/hafas-client/releases/tag/4.6.2), 2019-11-18

## `4.6.1`

- 43b4a6e handle `H_UNKNOWN` error
- 1cc453b parseArrOrDep, parseLocation: bugfixes 🐛

[🏷 `4.6.1`](https://github.com/public-transport/hafas-client/releases/tag/4.6.1), 2019-10-28

## `3.10.3`

- c9ceeca put deprecation note

[🏷 `3.10.3`](https://github.com/public-transport/hafas-client/releases/tag/3.10.3), 2019-10-28

## `2.10.4`

- 096f8a0 put deprecation note

[🏷 `2.10.4`](https://github.com/public-transport/hafas-client/releases/tag/2.10.4), 2019-10-28

## `4.6.0`

- 73ca349/19c3ee6 NVV profile

[🏷 `4.6.0`](https://github.com/public-transport/hafas-client/releases/tag/4.6.0), 2019-08-16

## `4.5.2`

- 2e88e96 install-unique client ID via `postinstall` step -> generate process-unique ID

[🏷 `4.5.2`](https://github.com/public-transport/hafas-client/releases/tag/4.5.2), 2019-08-16

## `3.10.2`

- 1babfbf `parseWarning`: handle missing summary/text 🐛

[🏷 `3.10.2`](https://github.com/public-transport/hafas-client/releases/tag/3.10.2), 2019-08-12

## `4.5.1`

- bd7d5bb `parseWarning`: handle missing `summary`/`text` 🐛
- 92c842b DB: enable `radar()`

[🏷 `4.5.1`](https://github.com/public-transport/hafas-client/releases/tag/4.5.1), 2019-07-20

## `4.5.0`

- b144dd5/b57c212 return nice error messages & error codes

[🏷 `4.5.0`](https://github.com/public-transport/hafas-client/releases/tag/4.5.0), 2019-07-08

## `4.4.0`

- e46d6cd `parseLocation`: expose `stop.isMeta`

[🏷 `4.4.0`](https://github.com/public-transport/hafas-client/releases/tag/4.4.0), 2019-06-30

## `4.3.0`

- 1e0182f `parseLint`: use `addName`
- d0f7ca1 follow HTTP redirects, accept `br` encoding

[🏷 `4.3.0`](https://github.com/public-transport/hafas-client/releases/tag/4.3.0), 2019-06-25

## `4.2.2`

- 64f797e `parseProductsBitmask`: fix bitmask handling 🐛
- 707fd29 `p-retry@4`, `p-throttle@3`

[🏷 `4.2.2`](https://github.com/public-transport/hafas-client/releases/tag/4.2.2), 2019-06-25

## `4.2.1`

- 9078d2d fix `leg.reachable`, which was breaking all walking legs 🐛

[🏷 `4.2.1`](https://github.com/public-transport/hafas-client/releases/tag/4.2.1), 2019-06-08

## `4.2.0`

- 6da1e80 add `leg.reachable`

[🏷 `4.2.0`](https://github.com/public-transport/hafas-client/releases/tag/4.2.0), 2019-06-07

## `4.1.1`

- 875ea18 parse scheduled/actual platform information on legs, fixes #116 🐛
- f92e933 [DB](../p/db) departures/arrivals: parse load factor #112

[🏷 `4.1.1`](https://github.com/public-transport/hafas-client/releases/tag/4.1.1), 2019-05-29

## `4.1.0`

- 831bcaf ISO date+time: suppress milliseconds if 0
- 3e01303/75432fc CFG profile
- 820f2ab `parseWarning`: parse products
- 3ab099b/57c7186 HVV profile

[🏷 `4.1.0`](https://github.com/public-transport/hafas-client/releases/tag/4.1.0), 2019-05-27

## `4.0.3`

- 6aa57d4 `parseJourneyLeg`/`parseMovement`/`parseArrival`/`parseDeparture`: handle missing `dirTxt` 🐛

[🏷 `4.0.3`](https://github.com/public-transport/hafas-client/releases/tag/4.0.3), 2019-04-01

## `4.0.2`

- 133cee9 `parseWarning`: expose `warning.id` 🐛

[🏷 `4.0.2`](https://github.com/public-transport/hafas-client/releases/tag/4.0.2), 2019-03-27

## `4.0.1`

- 5d49fd0 `parseDateTime`: fix `tzOffset` & `daysOffset` 🐛

[🏷 `4.0.1`](https://github.com/public-transport/hafas-client/releases/tag/4.0.1), 2019-03-19

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

[🏷 `4.0.0`](https://github.com/public-transport/hafas-client/releases/tag/4.0.0), 2019-02-28

## `3.10.1`

- dafc96a update CMTA credentials
- 46e7729 remove `console.error` call 🐛

[🏷 `3.10.1`](https://github.com/public-transport/hafas-client/releases/tag/3.10.1), 2019-02-28

## `3.10.0`

- d797333/1e16a10 [DB](../p/db): parse additional line names

[🏷 `3.10.0`](https://github.com/public-transport/hafas-client/releases/tag/3.10.0), 2019-02-13

## `3.9.1`

- a145fea extend default retrying options 🐛

[🏷 `3.9.1`](https://github.com/public-transport/hafas-client/releases/tag/3.9.1), 2019-02-08

## `3.9.0`

- b0f786c support for retrying failed requests ✨ – [docs](readme.md#retrying-failed-requests)

[🏷 `3.9.0`](https://github.com/public-transport/hafas-client/releases/tag/3.9.0), 2019-02-08

## `3.8.1`

- 3f58d84 handle `stop` objects as input 🐛

[🏷 `3.8.1`](https://github.com/public-transport/hafas-client/releases/tag/3.8.1), 2019-02-06

## `3.8.0`

- 5d0096c `departures()`: profile flag for `getPasslist` & `stbFilterEquiv`
- #99 [Saarfahrplan profile](p/saarfahrplan) – Thanks @ialokim & @juliuste!

[🏷 `3.8.0`](https://github.com/public-transport/hafas-client/releases/tag/3.8.0), 2018-12-31

## `3.7.0`

- e867dac/f097022 `opt.stopovers`, `departure.nextStopovers`/`arrival.previousStopovers`

[🏷 `3.7.0`](https://github.com/public-transport/hafas-client/releases/tag/3.7.0), 2018-12-28

## `3.6.3`

- cb2d298 `stop`s/`station`s: default `id` of `null` 🐛

[🏷 `3.6.3`](https://github.com/public-transport/hafas-client/releases/tag/3.6.3), 2018-12-28

## `3.6.2`

- 5beff47 `radar()`: fix `polylines` option 🐛
- 48424cf `p-throttle` as normal dependency 🐛

[🏷 `3.6.2`](https://github.com/public-transport/hafas-client/releases/tag/3.6.2), 2018-12-16

## `3.6.1`

- b809281 fix error parsing 🐛
- bcbc366/ae2007c/e1f1d0d ÖBB `radar()`: fix filtering of `movement.nextStops` 🐛

[🏷 `3.6.1`](https://github.com/public-transport/hafas-client/releases/tag/3.6.1), 2018-12-10

## `3.6.0`

- 4b56f66 parse `journey.cycle` if returned by HAFAS
- 17b8f14 `journeyLeg.cycle`: parse `nr` field if returned by HAFAS
- 8fac5fc `journeyLeg.alternatives`: parse `direction`, `delay`, `tripId`

[🏷 `3.6.0`](https://github.com/public-transport/hafas-client/releases/tag/3.6.0), 2018-12-03

## `3.5.0`

- 9d96902 `readableFrom()`: make `opt.maxDuration` optional
- 02e0e51 parse scheduled days of a `journey`

[🏷 `3.5.0`](https://github.com/public-transport/hafas-client/releases/tag/3.5.0), 2018-11-13

## `3.4.3`

- 9936466 `p-throttle@2`, `tape-promise@4`

[🏷 `3.4.3`](https://github.com/public-transport/hafas-client/releases/tag/3.4.3), 2018-10-24

## `3.4.2`

- 2a6b0dc speed up date+time formatting ⚡️

[🏷 `3.4.2`](https://github.com/public-transport/hafas-client/releases/tag/3.4.2), 2018-09-24

## `3.4.1`

- 582c9de speed up date+time parsing ⚡️

[🏷 `3.4.1`](https://github.com/public-transport/hafas-client/releases/tag/3.4.1), 2018-09-22

## `3.4.0`

- #81 [S-Bahn München profile](p/sbahn-muenchen) – Thanks @flori-uni!

[🏷 `3.4.0`](https://github.com/public-transport/hafas-client/releases/tag/3.4.0), 2018-09-20

## `3.3.1`

- 035877c `reachableFrom()` retry 🐛

[🏷 `3.3.1`](https://github.com/public-transport/hafas-client/releases/tag/3.3.1), 2018-09-03

## `3.3.0`

- #80/b36ccda `reachableFrom()` method – [docs](reachable-from.md)

[🏷 `3.3.0`](https://github.com/public-transport/hafas-client/releases/tag/3.3.0), 2018-09-03

## `3.2.1`

- 044a5ee `arrivals()`: return a `direction` of `null` :bug:
- b37bedb parse `line.id` if possible

[🏷 `3.2.1`](https://github.com/public-transport/hafas-client/releases/tag/3.2.1), 2018-09-03

## `3.2.0`

- #79 [CapMetro/CMTA profile](p/cmta) – Thanks @nickturskyi!

[🏷 `3.2.0`](https://github.com/public-transport/hafas-client/releases/tag/3.2.0), 2018-08-26

## `3.1.2`

- f796337 handle warnings without schedule `sDate`/`eDate`/`lModDate` 🐛

[🏷 `3.1.2`](https://github.com/public-transport/hafas-client/releases/tag/3.1.2), 2018-08-24

## `3.1.1`

- 39cc2f3 fix install on Windows 🐛

[🏷 `3.1.1`](https://github.com/public-transport/hafas-client/releases/tag/3.1.1), 2018-08-23

## `3.1.0`

- 9257d3a parse `line.fahrtNr`

[🏷 `3.1.0`](https://github.com/public-transport/hafas-client/releases/tag/3.1.0), 2018-08-22

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

[🏷 `3.0.0`](https://github.com/public-transport/hafas-client/releases/tag/3.0.0), 2018-08-17

## `2.10.3`

- 50bd440 better `User-Agent` randomization

[🏷 `2.10.3`](https://github.com/public-transport/hafas-client/releases/tag/2.10.3), 2018-08-08

## `2.10.2`

- d54c26d randomize `User-Agent`

[🏷 `2.10.2`](https://github.com/public-transport/hafas-client/releases/tag/2.10.2), 2018-07-25

## `2.10.1`

- 04d550f parse `TRSF` legs as `walking` 🐛

[🏷 `2.10.1`](https://github.com/public-transport/hafas-client/releases/tag/2.10.1), 2018-07-02

## `2.10.0`

- 4da8689 journey legs with `type: 'walking'` now have a `distance` in meters
- c1bdade `departures()`: parse & expose platforms
- fccd3d0 `journeys()`: `startWithWalking` option

[🏷 `2.10.0`](https://github.com/public-transport/hafas-client/releases/tag/2.10.0), 2018-06-30

## `2.9.1`

- a952b08 notes on how to use `hafas-client` with react-native 📝
- 38a3749 `parseStopover`: fix first/last canceled stopovers 🐛

## `2.9.0`

- 49186ae journey leg passed stations: add `arrivalDelay` & `departureDelay`
- deb8829 [`journeys()`](journeys.md): new `whenRepresents` option
- f3d8304 let the `insa` and `nahsh` profiles use HTTPS

[🏷 `2.9.0`](https://github.com/public-transport/hafas-client/releases/tag/2.9.0), 2018-06-20

## `2.8.1`

- 769f2e3 send `Accept: application/json`

[🏷 `2.8.1`](https://github.com/public-transport/hafas-client/releases/tag/2.8.1), 2018-06-07

## `2.8.0`

- 16c3f01 enable [`journeyLeg()`](journey-leg.md) for [DB](../p/db)

[🏷 `2.8.0`](https://github.com/public-transport/hafas-client/releases/tag/2.8.0), 2018-05-24

## `2.7.5`

- 908d531 [DB](../p/db) [`journeys()`](journeys.md): fix polylines parsing 🐛

[🏷 `2.7.5`](https://github.com/public-transport/hafas-client/releases/tag/2.7.5), 2018-05-24

## `2.7.4`

- 709b7b4 update dependencies

[🏷 `2.7.4`](https://github.com/public-transport/hafas-client/releases/tag/2.7.4), 2018-05-24

## `2.7.3`

- 48f2cef each movement from `radar()` now has a `journeyId` field

[🏷 `2.7.3`](https://github.com/public-transport/hafas-client/releases/tag/2.7.3), 2018-05-21

## `2.7.2`

- a97e0d3 fix polylines parsing 🐛

[🏷 `2.7.2`](https://github.com/public-transport/hafas-client/releases/tag/2.7.2), 2018-05-16

## `2.7.1`

- aa480e0 fix polylines parsing 🐛

[🏷 `2.7.1`](https://github.com/public-transport/hafas-client/releases/tag/2.7.1), 2018-05-16

## `2.7.0`

- `journeys()`: `polylines` option
- `journeyLeg()`: `polyline` option
- `radar()`: `polylines` option

[🏷 `2.7.0`](https://github.com/public-transport/hafas-client/releases/tag/2.7.0), 2018-05-15

## `2.6.0`

- 5d10d76 journey legs: parse cycle

[🏷 `2.6.0`](https://github.com/public-transport/hafas-client/releases/tag/2.6.0), 2018-04-29

## `2.5.3`

- d676b84 fix parsing for journey leg alternatives 🐛

[🏷 `2.5.3`](https://github.com/public-transport/hafas-client/releases/tag/2.5.3), 2018-04-29

## `2.5.2`

- 16e6dd6 departure docs: fix method 📝
- c60213a DB: tram mode should be `train` 🐛

[🏷 `2.5.2`](https://github.com/public-transport/hafas-client/releases/tag/2.5.2), 2018-04-24

## `2.5.1`

- afc0124 fix stopover parsing 🐛

[🏷 `2.5.1`](https://github.com/public-transport/hafas-client/releases/tag/2.5.1), 2018-04-05

## `2.5.0`

- new [Schleswig-Holstein (NAH.SH)](https://de.wikipedia.org/wiki/Nahverkehrsverbund_Schleswig-Holstein) [profile](../p/nahsh)
- new [*writing a profile* guide](./writing-a-profile.md)

[🏷 `2.5.0`](https://github.com/public-transport/hafas-client/releases/tag/2.5.0), 2018-03-18

## `2.4.2`

- `parseStopover`: expose canceled arrivals & departures 🐛

[🏷 `2.4.2`](https://github.com/public-transport/hafas-client/releases/tag/2.4.2), 2018-03-17

## `2.4.1`

- new [*writing a profile* guide](./writing-a-profile.md)
- `parseMovement`: use `parseStopover` 🐛
- `parseStopover`: use `parseStationName` 🐛

[🏷 `2.4.1`](https://github.com/public-transport/hafas-client/releases/tag/2.4.1), 2018-03-17

## `2.4.0`

- new [Nahverkehr Sachsen-Anhalt (NASA)](https://de.wikipedia.org/wiki/Nahverkehrsservice_Sachsen-Anhalt)/[INSA](https://insa.de) profile
- new `earlierRef`/`laterRef` feature to query earlier/later journeys (pagination)
- former scheduled date & time for canceled departures & journeys

[🏷 `2.4.0`](https://github.com/public-transport/hafas-client/releases/tag/2.4.0), 2018-03-14
