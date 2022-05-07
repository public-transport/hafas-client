# INSA profile for `hafas-client`

The [Nahverkehr Sachsen-Anhalt (NASA)](https://de.wikipedia.org/wiki/Nahverkehrsservice_Sachsen-Anhalt) offers [Informationssystem Nahverkehr Sachsen-Anhalt (INSA)](https://insa.de) to distribute their public transport data.

## Usage

```js
import {createClient} from 'hafas-client'
import {insaProfile} from 'hafas-client/p/insa/index.js'

// create a client with INSA profile
const client = createClient(insaProfile, 'my-awesome-program')
```


## Customisations

- parses *INSA*-specific products (such as *Tourism Train*)
