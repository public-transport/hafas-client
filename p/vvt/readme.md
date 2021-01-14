# VVT profile for `hafas-client`

[*Verkehrsverbund Tirol (VVT)*](https://de.wikipedia.org/wiki/Verkehrsverbund_Tirol) is the regional transport provider of [Tyrol](https://en.wikipedia.org/wiki/Tyrol). This profile adds *VVT* support to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const vvtProfile = require('hafas-client/p/vvt')

// create a client with VVT profile
const client = createClient(vvtProfile, 'my-awesome-program')
```
