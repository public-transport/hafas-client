# mobiliteit.lu profile for `hafas-client`

[*mobiliteit.lu*](https://www.mobiliteit.lu) provides public transport data for Luxembourg. This profile adds *mobiliteit.lu*-specific customizations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const mobiliteitProfile = require('hafas-client/p/mobiliteit-lu')

// create a client with mobiliteit.lu profile
const client = createClient(mobiliteitProfile, 'my-awesome-program')
```


## Customisations

- parses *mobiliteit.lu*-specific products
