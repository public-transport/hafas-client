# VOR profile for `hafas-client`

[*Verkehrsverbund Ost-Region (VOR)*](https://de.wikipedia.org/wiki/Verkehrsverbund_Ost-Region) is the local transport provider of [Vienna](https://en.wikipedia.org/wiki/Vienna), [Lower Austria](https://en.wikipedia.org/wiki/Lower_Austria) and [Burgenland](https://en.wikipedia.org/wiki/Burgenland); It runs its apps under the [*AnachB*](https://anachb.vor.at) brand. This profile adds *VOR*/*AnachB* support to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {vorProfile} from 'hafas-client/p/vor/index.js'

// create a client with VOR profile
const client = createClient(vorProfile, 'my-awesome-program')
```

Check out the [code examples](example.js).
