# INVG profile for `hafas-client`

[*Ingolstädter Verkehrsgesellschaft (INVG)*](https://de.wikipedia.org/wiki/Ingolstädter_Verkehrsgesellschaft) is a public transportation provider serving [Ingolstadt, Germany](https://en.wikipedia.org/wiki/Ingolstadt). This profile adds *INVG*-specific customizations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const invgProfile = require('hafas-client/p/invg')

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with INVG profile
const client = createClient(invgProfile, userAgent)
```


## Customisations

- parses *INVG*-specific products
