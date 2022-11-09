# CMTA profile for `hafas-client`

[*Capital Metropolitan Transportation Authority (CMTA)* or *CapMetro*](https://en.wikipedia.org/wiki/Capital_Metropolitan_Transportation_Authority) is a public transportation provider serving [Austin, Texas](https://en.wikipedia.org/wiki/Austin,_Texas) metropolitan area. This profile adds *CMTA*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {cmtaProfile} from 'hafas-client/p/cmta/index.js'

// create a client with CMTA profile
const client = createClient(cmtaProfile, 'my-awesome-program')
```


## Customisations

- parses *CMTA*-specific products (such as *MetroRapid* and *MetroRail*)
