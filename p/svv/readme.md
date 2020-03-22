# SVV profile for `hafas-client`

[*Salzburger Verkehrsverbund (SVV)*](https://de.wikipedia.org/wiki/Salzburger_Verkehrsverbund) is the local transit authority of [Salzburg](https://en.wikipedia.org/wiki/Salzburg). This profile adds *SVV*-specific customizations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const svvProfile = require('hafas-client/p/svv')

// create a client with SVV profile
const client = createClient(svvProfile, 'my-awesome-program')
```


## Customisations

- parses *SVV*-specific products
