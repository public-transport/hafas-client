# Saarfahrplan/VGS profile for `hafas-client`

*Saarfahrplan* is the public transport information system in [Saarland](https://en.wikipedia.org/wiki/Saarland). This profile adds *Saarfahrplan*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {saarfahrplanProfile} from 'hafas-client/p/saarfahrplan/index.js'

// create a client with Saarfahrplan profile
const client = createClient(saarfahrplanProfile, 'my-awesome-program')
```


## Customisations

- parses *Saarfahrplan*-specific products (such as *Saarbahn*)
