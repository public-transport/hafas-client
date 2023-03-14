# DB Busradar NRW profile for `hafas-client`

[*DB Busradar NRW*](https://www.bahn.de/westfalenbus/view/fahrplan/busradar.shtml) is a mobile application used in [North Rhine-Westphalia](https://en.wikipedia.org/wiki/North_Rhine-Westphalia).
It shows realtime locations and arrival/departure information for vehicles operated by bus companies which are part of [DB Regio Bus](https://www.dbregio.de/db_regio/view/wir/bus.shtml) in NRW, namely:
- [BVR Busverkehr Rheinland GmbH](https://www.rheinlandbus.de/) (DB Rheinlandbus)
- [WB Westfalen Bus GmbH](https://www.westfalenbus.de/) (DB Westfalenbus)
- [BVO Busverkehr Ostwestfalen GmbH](https://www.ostwestfalen-lippe-bus.de) (DB Ostwestfalen-Lippe-Bus)

This profile adapts `hafas-client` to the HAFAS endpoint used by the application.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as dbbusradarnrwProfile} from 'hafas-client/p/db-busradar-nrw/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with DB Busradar NRW profile
const client = createClient(dbbusradarnrwProfile, userAgent)
```
