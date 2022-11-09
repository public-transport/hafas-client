# VVT profile for `hafas-client`

[*Verkehrsverbund Tirol (VVT)*](https://de.wikipedia.org/wiki/Verkehrsverbund_Tirol) is the regional transport provider of [Tyrol](https://en.wikipedia.org/wiki/Tyrol). This profile adds *VVT* support to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {vvtProfile} from 'hafas-client/p/vvt/index.js'

// create a client with VVT profile
const client = createClient(vvtProfile, 'my-awesome-program')
```
