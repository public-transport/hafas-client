# Changelog

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
