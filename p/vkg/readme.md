# VKG profile for `hafas-client`

[*Kärntner Linien/Verkehrsverbund Kärnten (VKG/VVK)*](https://de.wikipedia.org/wiki/Verkehrsverbund_Kärnten) is the local transport provider of [Carinthia](https://en.wikipedia.org/wiki/Carinthia). This profile adds *VKG* support to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as vkgProfile} from 'hafas-client/p/vkg/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with VKG profile
const client = createClient(vkgProfile, userAgent)
```
