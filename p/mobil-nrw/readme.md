# *mobil.nrw* profile for `hafas-client`

[*mobil.nrw*](https://www.mobil.nrw) is the name of the travel planning service of the [*NRW-Tarif*](https://de.wikipedia.org/wiki/NRW-Tarif). This profile adds *mobil.nrw*-specific customisations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const mobilNrwProfile = require('hafas-client/p/mobil-nrw')

// create a client with mobil.nrw profile
const client = createClient(mobilNrwProfile)
```


## Customisations

- *mobil.nrw*-specific products
