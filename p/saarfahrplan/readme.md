# Saarfahrplan/VGS profile for `hafas-client`

*Saarfahrplan* is the public transport information system in [Saarland](https://en.wikipedia.org/wiki/Saarland). This profile adds *Saarfahrplan*-specific customizations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const saarfahrplanProfile = require('hafas-client/p/saarfahrplan')

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with Saarfahrplan profile
const client = createClient(saarfahrplanProfile, userAgent)
```


## Customisations

- parses *Saarfahrplan*-specific products (such as *Saarbahn*)
