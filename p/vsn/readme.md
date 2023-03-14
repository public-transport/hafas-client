# VSN profile for `hafas-client`
[*Verkehrsverbund Süd-Niedersachsen (VSN)*](https://de.wikipedia.org/wiki/Verkehrsverbund_S%C3%BCd-Niedersachsen) is the local transport provider south [Lower Saxony](https://en.wikipedia.org/wiki/Lower_Saxony). This profile adds *VSN*-specific customizations to `hafas-client`.

## Usage
```js
import {createClient} from 'hafas-client'
import {profile as vsnProfile} from 'hafas-client/p/vsn/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with VSN profile
const client = createClient(vsnProfile, userAgent)
```

## Customisations
- parses *VSN*-specific products
