# API documentation

- [`journeys(from, to, [opt])`](journeys.md) – get journeys between locations
- [`refreshJourney(refreshToken, [opt])`](refresh-journey.md) – fetch up-to-date/more details of a `journey`
- [`trip(id, lineName, [opt])`](trip.md) – get details for a trip
- [`departures(station, [opt])`](departures.md) – query the next departures at a station
- [`arrivals(station, [opt])`](arrivals.md) – query the next arrivals at a station
- [`locations(query, [opt])`](locations.md) – find stations, POIs and addresses
- [`station(id, [opt])`](station.md) – get details about a station
- [`nearby(location, [opt])`](nearby.md) – show stations & POIs around
- [`radar(north, west, south, east, [opt])`](radar.md) – find all vehicles currently in a certain area
- [`reachableFrom(location, [opt])`](reachable-from.md) – get all stations reachable from a location within `n` minutes

## Writing a profile

Check [the guide](writing-a-profile.md).
