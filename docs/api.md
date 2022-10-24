# `hafas-client` API

- [`journeys(from, to, [opt])`](journeys.md) – get journeys between locations
- [`refreshJourney(refreshToken, [opt])`](refresh-journey.md) – fetch up-to-date/more details of a `journey`
- [`journeysFromTrip(tripId, previousStopover, to, [opt])`](journeys-from-trip.md) – get journeys from a trip to a location
- [`trip(id, lineName, [opt])`](trip.md) – get details for a trip
- [`tripsByName(lineNameOrFahrtNr, [opt])`](trips-by-name.md) – get all trips matching a name
- [`departures(station, [opt])`](departures.md) – query the next departures at a station
- [`arrivals(station, [opt])`](arrivals.md) – query the next arrivals at a station
- [`locations(query, [opt])`](locations.md) – find stations, POIs and addresses
- [`stop(id, [opt])`](stop.md) – get details about a stop/station
- [`nearby(location, [opt])`](nearby.md) – show stations & POIs around
- [`radar(north, west, south, east, [opt])`](radar.md) – find all vehicles currently in a certain area
- [`reachableFrom(address, [opt])`](reachable-from.md) – get all stations reachable from an address within `n` minutes
- [`remarks([opt])`](remarks.md) – get all remarks
- [`lines(query, [opt])`](lines.md) – get all lines matching a name
- [`serverInfo([opt])`](server-info.md) – fetch meta information from HAFAS
