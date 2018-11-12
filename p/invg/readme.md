# INVG profile for `hafas-client`

[*Ingolstädter Verkehrsgesellschaft (INVG)*](https://de.wikipedia.org/wiki/Ingolstädter_Verkehrsgesellschaft) is a public transportation provider serving [Ingolstadt, Germany](https://en.wikipedia.org/wiki/Ingolstadt). This profile adds *INVG*-specific customizations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const invgProfile = require('hafas-client/p/invg')

// create a client with INVG profile
const client = createClient(invgProfile, 'my-awesome-program')
```


## Customisations

- parses *INVG*-specific products
