# RMV profile for `hafas-client`

[*Rhein-Main-Verkehrsverbund (RMV)*](https://en.wikipedia.org/wiki/Rhein-Main-Verkehrsverbund) is a public transport authority in [Hesse](https://en.wikipedia.org/wiki/Hesse)/[Rhineland-Palatinate](https://en.wikipedia.org/wiki/Rhineland-Palatinate). This profile adds *RMV*-specific customizations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const rmvProfile = require('hafas-client/p/rmv')

// create a client with RMV profile
const client = createClient(rmvProfile, 'my-awesome-program')
```


## Customisations

- parses *RMV*-specific products
