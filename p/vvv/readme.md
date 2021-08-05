# VVV profile for `hafas-client`

[*Verkehrsverbund Vorarlberg (VVV)*](https://de.wikipedia.org/wiki/Verkehrsverbund_Vorarlberg) is the local transport provider of [Vorarlberg](https://en.wikipedia.org/wiki/Vorarlberg) that runs its apps under the [*VMOBIL*](https://www.vmobil.at) brand. This profile adds *VVV*/*VMOBIL* support to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const vvvProfile = require('hafas-client/p/vvv')

// create a client with VVV profile
const client = createClient(vvvProfile, 'my-awesome-program')
```

Check out the [code examples](example.js).
