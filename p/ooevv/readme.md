# OÖVV profile for `hafas-client`

[*Oberösterreichischer Verkehrsverbund (OÖVV)*](https://de.wikipedia.org/wiki/Oberösterreichischer_Verkehrsverbund) is the local transport provider of [Upper Austria](https://en.wikipedia.org/wiki/Upper_Austria). This profile adds *OÖVV* support to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const oövvProfile = require('hafas-client/p/ooevv')

// create a client with OÖVV profile
const client = createClient(oövvProfile, 'my-awesome-program')
```

Check out the [code examples](example.js).
