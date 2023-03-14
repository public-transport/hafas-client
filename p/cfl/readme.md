# CFL profile for `hafas-client`

The [*Société Nationale des Chemins de Fer Luxembourgeois (CFL)*](https://en.wikipedia.org/wiki/Société_Nationale_des_Chemins_de_Fer_Luxembourgeois) is the national railway company of [Luxembourg](https://en.wikipedia.org/wiki/Luxembourg). This profile adds *CFL*-specific customisations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as cflProfile} from 'hafas-client/p/cfl/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with CFL profile
const client = createClient(cflProfile, userAgent)
```


## Customisations

- *CFL*-specific products (such as [*Standseilbahn_Pfaffenthal-Kirchberg*](https://de.wikipedia.org/wiki/Standseilbahn_Pfaffenthal-Kirchberg))
