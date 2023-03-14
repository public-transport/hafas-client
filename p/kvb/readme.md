# KVB profile for `hafas-client`

[*Kölner Verkehrs-Betriebe (KVB)*](https://de.wikipedia.org/wiki/Kölner_Verkehrs-Betriebe) is the local transport provider of [Cologne](https://en.wikipedia.org/wiki/Cologne). This profile adds *KVB* support to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const kvbProfile = require('hafas-client/p/kvb')

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with KVB profile
const client = createClient(kvbProfile, userAgent)
```

Check out the [code examples](example.js).
