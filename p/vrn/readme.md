# VRN profile for `hafas-client`

[*Verkehrsverbund Rhein-Neckar (VRN)*](https://en.wikipedia.org/wiki/Verkehrsverbund_Rhein-Neckar) is a public transport network in south-west Germany. This profile adds *VRN*-specific customizations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const vrnProfile = require('hafas-client/p/vrn')

// create a client with VRN profile
const client = createClient(vrnProfile, 'my-awesome-program')
```


## Customisations

- parses *VRN*-specific products
