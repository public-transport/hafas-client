# VRN profile for `hafas-client`

[*Verkehrsverbund Rhein-Neckar (VRN)*](https://en.wikipedia.org/wiki/Verkehrsverbund_Rhein-Neckar) is a public transport network in south-west Germany. This profile adds *VRN*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as vrnProfile} from 'hafas-client/p/vrn/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with VRN profile
const client = createClient(vrnProfile, userAgent)
```


## Customisations

- parses *VRN*-specific products
