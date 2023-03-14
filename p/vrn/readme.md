# VRN profile for `hafas-client`

[*Verkehrsverbund Rhein-Neckar (VRN)*](https://en.wikipedia.org/wiki/Verkehrsverbund_Rhein-Neckar) is a public transport network in south-west Germany. This profile adds *VRN*-specific customizations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const vrnProfile = require('hafas-client/p/vrn')

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with VRN profile
const client = createClient(vrnProfile, userAgent)
```


## Customisations

- parses *VRN*-specific products
