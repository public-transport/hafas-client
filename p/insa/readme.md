# INSA profile for `hafas-client`

The [Nahverkehr Sachsen-Anhalt (NASA)](https://de.wikipedia.org/wiki/Nahverkehrsservice_Sachsen-Anhalt) offers [Informationssystem Nahverkehr Sachsen-Anhalt (INSA)](https://insa.de) to distribute their public transport data.

## Usage

```js
const createClient = require('hafas-client')
const insaProfile = require('hafas-client/p/insa')

// create a client with INSA profile
const client = createClient(insaProfile)
```


## Customisations

- parses *INSA*-specific products (such as *Tourism Train*)
