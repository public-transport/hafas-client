# VVV profile for `hafas-client`

[*Verkehrsverbund Vorarlberg (VVV)*](https://de.wikipedia.org/wiki/Verkehrsverbund_Vorarlberg) is the local transport provider of [Vorarlberg](https://en.wikipedia.org/wiki/Vorarlberg) that runs its apps under the [*VMOBIL*](https://www.vmobil.at) brand. This profile adds *VVV*/*VMOBIL* support to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as vvvProfile} from 'hafas-client/p/vvv/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with VVV profile
const client = createClient(vvvProfile, userAgent)
```

Check out the [code examples](example.js).
