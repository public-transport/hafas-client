# INSA profile for `hafas-client`

The [Nahverkehr Sachsen-Anhalt (NASA)](https://de.wikipedia.org/wiki/Nahverkehrsservice_Sachsen-Anhalt) offers [Informationssystem Nahverkehr Sachsen-Anhalt (INSA)](https://insa.de) to distribute their public transport data.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as insaProfile} from 'hafas-client/p/insa/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with INSA profile
const client = createClient(insaProfile, userAgent)
```


## Customisations

- parses *INSA*-specific products (such as *Tourism Train*)
