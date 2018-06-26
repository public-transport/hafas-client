# Changelog

## `3.0.0`

This version is not fully backwords-compatible. Check out [the migration guide](migration-to-3.md).

- b7c1ee3 profiles: new products markup ([guide](https://github.com/public-transport/hafas-client/blob/ebe4fa64d871f711ced99d528c0171b180edc135/docs/writing-a-profile.md#3-products))
- 40b559f `radar(n, w, s, e)` → `radar({n, w, s, e})` 💥
- 005f3f8 remove `journey.departure`, `journey.arrival`, … 💥
- 0ef0301 validate `opt.when` 💥
- 431574b parse polylines using `profile.parsePolyLine` 💥 – [docs for the output format](https://github.com/public-transport/hafas-client/blob/ebe4fa64d871f711ced99d528c0171b180edc135/docs/journey-leg.md#polyline-option)
- a356a26 throw if 0 products enabled 💥
- c82ad23 `journeys()`: `opt.when` → `opt.departure`/`opt.arrival` 💥
- 21c273c `journeys()`/`journeyLeg()`: leg stopovers: parse & expose delays
- 665bed9 `location(id)` → `station(id)` 💥
- 6611f26 `journeys()`/`journeyLeg()`: `leg.passed` → `leg.stopovers` 💥
- ebe4fa6 `journeys()`/`journeyLeg()`: `opt.passedStations` → `opt.stopovers` 💥
- 3e672ee `journeys()`/`journeyLeg()`: `stopover.station` → `stopover.stop` 💥
- 021ae45: `journeys()`/`journeyLeg()`: leg stopovers: parse & expose platforms
- 85e0bdf `journeys()`: `startWithWalking` option with default `true` ✨
- 2e6aefe journey leg, departure, movement: `journeyId` -> `tripId` 💥

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
