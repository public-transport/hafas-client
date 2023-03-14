# VOS profile for `hafas-client`

[*Verkehrsgemeinschaft Osnabrück (VOS)*](https://de.wikipedia.org/wiki/Verkehrsgemeinschaft_Osnabrück) is the local transport provider of [Osnabrück](https://en.wikipedia.org/wiki/Osnabrück). This profile adds *VOS* support to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as vosProfile} from 'hafas-client/p/vos/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with VOS profile
const client = createClient(vosProfile, userAgent)
```
