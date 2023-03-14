# *mobil.nrw* profile for `hafas-client`

[*mobil.nrw*](https://www.mobil.nrw) is the name of the travel planning service of the [*NRW-Tarif*](https://de.wikipedia.org/wiki/NRW-Tarif). This profile adds *mobil.nrw*-specific customisations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as mobilNrwProfile} from 'hafas-client/p/mobil-nrw/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with mobil.nrw profile
const client = createClient(mobilNrwProfile, userAgent)
```


## Customisations

- *mobil.nrw*-specific products
