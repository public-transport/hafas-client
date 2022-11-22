# Migrating to `hafas-client@6`

## If you use Node.js <16 …

… migrate to Node `16` ("Gallium"), sorry. [Node `10`, `12` & `14` are out of (active) LTS now](https://nodejs.org/en/about/releases/).

## If you use `hafas-client` via [CommonJS](https://en.wikipedia.org/wiki/CommonJS) …

… you'll have to either
- migrate your code to ECMAScript Modules (ESM), or
- use [dynamic `import()`](https://nodejs.org/docs/latest-v16.x/api/esm.html#import-expressions), or
- use a (somewhat hacky) tool like [`esm`](https://www.npmjs.com/package/esm).

For more background information, check out [MDN's ESM explainer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and [Node.js's ESM docs](https://nodejs.org/docs/latest-v16.x/api/esm.html).

## If you use `departures()` or `arrivals()` …

… adapt your code as follows:
- `departures()` now returns an object `{departures: […], realtimeDataUpdatedAt: …}`
- `arrivals()` now returns an object `{arrivals: […], realtimeDataUpdatedAt: …}`

### … with `opt.stopovers: true` …

… check if this still works. If `hafas-client` throws "`opt.stopovers` is not supported by this endpoint", you'll have to use `trip()` for each departure/arrival to get its trip's stopovers.

Most profiles had to be upgraded to a newer HAFAS protocol version to still work, and newer HAFAS protocol versions don't support this flag anymore.

## If you use `journeys()`, `refreshJourney()` or `journeysFromTrip()` …

… use `res.realtimeDataUpdatedAt` instead of `res.realtimeDataFrom`, it has been renamed.

## If you use `refreshJourney()` …

… adapt your code as follows: it now returns an object `{journey: …, realtimeDataUpdatedAt: …}`.

## If you use `trip()` …

… adapt your code as follows: it now returns an object `{trip: …, realtimeDataUpdatedAt: …}`.

… don't pass the `lineName` parameter anymore, it is not needed anymore and has been removed.

## If you use `tripsByName()` …

… adapt your code as follows: it now returns an object `{trips: […], realtimeDataUpdatedAt: …}`.

## If you use `radar()` …

… adapt your code as follows: it now returns an object `{movements: […], realtimeDataUpdatedAt: …}`.

## If you use `reachableFrom()` …

… and it sometimes fails with a server error (a.k.a. HAFAS is unable to process the request), wrap it in a retry logic ([open an Issue](https://github.com/public-transport/hafas-client/issues/new) to get help). Automatic retries have been removed.

## If you use `remarks()` …

… adapt your code as follows: it now returns an object `{remarks: […], realtimeDataUpdatedAt: …}`.

## If you use `lines()` …

… adapt your code as follows: it now returns an object `{lines: […], realtimeDataUpdatedAt: …}`.

## If you use the DB profile …

… be aware that the `regionalExp` product has been renamed to `regionalExpress`. Among other places, you will notice this in `line.product`.

## If you use the BVG or VBB profile …

### … and rely on `stop.weight` …

… use [`vbb-stations`](https://npmjs.com/package/vbb-stations) to get it instead. It has been removed from `hafas-client`.

### … and rely on 12-digit stop IDs …

… adapt your code to handle 9-digit (and sometimes 6-digit?) stop IDs. The translation logic has been removed from `hafas-client`.

## If you rely on `line.adminCode` …

… be aware that `hafas-client` now doesn't remove trailing `-` characters anymore (e.g. `DBS---` instead of `DBS`).

## If you use the VBB profile …

### … and rely on `line.{symbol,nr,metro,express,night}` …

… use [`vbb-parse-line`](https://npmjs.com/package/vbb-parse-line) with `line.name` by yourself. It has been removed from `hafas-client`.

### … and rely on `ticket.{amount,fullDay,group,tariff,coverage,variant}` …

… use [`vbb-parse-ticket`](https://npmjs.com/package/vbb-parse-ticket) to parse details from the ticket identifier ([open an Issue](https://github.com/public-transport/hafas-client/issues/new) to get help). It has been removed from `hafas-client`.

## Other breaking changes

- `warning.fromLoc`/`warning.toLoc` are now called `warning.fromLocation`/`warning.toLocation`
- `trip()`/`tripsByName()`: remove `trip.reachable` (it didn't make sense anyways)
