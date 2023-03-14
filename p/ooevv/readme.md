# OÖVV profile for `hafas-client`

[*Oberösterreichischer Verkehrsverbund (OÖVV)*](https://de.wikipedia.org/wiki/Oberösterreichischer_Verkehrsverbund) is the local transport provider of [Upper Austria](https://en.wikipedia.org/wiki/Upper_Austria). This profile adds *OÖVV* support to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as ooevvProfile} from 'hafas-client/p/ooevv/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with OÖVV profile
const client = createClient(ooevvProfile, userAgent)
```

Check out the [code examples](example.js).
