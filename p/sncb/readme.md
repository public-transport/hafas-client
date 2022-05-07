# SNCB profile for `hafas-client`

[*Société nationale des chemins de fer belges (SNCB)*/*Nationale Maatschappij der Belgische Spoorwegen (NMBS)*](https://en.wikipedia.org/wiki/National_Railway_Company_of_Belgium) is the major public transport provider of [Belgium](https://en.wikipedia.org/wiki/Belgium). This profile adds *SNCB*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {sncbProfile} from 'hafas-client/p/sncb/index.js'

// create a client with SNCB profile
const client = createClient(sncbProfile, 'my-awesome-program')
```


## Customisations

- parses *SNCB*-specific products
