# Saarfahrplan/VGS profile for `hafas-client`

*Saarfahrplan* is the public transport information system in [Saarland](https://en.wikipedia.org/wiki/Saarland). This profile adds *Saarfahrplan*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as saarfahrplanProfile} from 'hafas-client/p/saarfahrplan/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with Saarfahrplan profile
const client = createClient(saarfahrplanProfile, userAgent)
```


## Customisations

- parses *Saarfahrplan*-specific products (such as *Saarbahn*)
