# Changelog

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
