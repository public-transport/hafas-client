# CFL profile for `hafas-client`

The [*Société Nationale des Chemins de Fer Luxembourgeois (CFL)*](https://en.wikipedia.org/wiki/Société_Nationale_des_Chemins_de_Fer_Luxembourgeois) is the national railway company of [Luxembourg](https://en.wikipedia.org/wiki/Luxembourg). This profile adds *CFL*-specific customisations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as cflProfile} from 'hafas-client/p/cfl/index.js'

// create a client with CFL profile
const client = createClient(cflProfile, 'my-awesome-program')
```


## Customisations

- *CFL*-specific products (such as [*Standseilbahn_Pfaffenthal-Kirchberg*](https://de.wikipedia.org/wiki/Standseilbahn_Pfaffenthal-Kirchberg))
