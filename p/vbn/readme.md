# VBN profile for `hafas-client`

The [*Verkehrsverbund Bremen/Niedersachsen (VBN)*](https://de.wikipedia.org/wiki/Verkehrsverbund_Bremen/Niedersachsen) is a public transportation provider for [Lower Saxony](https://en.wikipedia.org/wiki/Lower_Saxony). This profile adds *VBN*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {vbnProfile} from 'hafas-client/p/vbn/index.js'

// create a client with VBN profile
const client = createClient(vbnProfile, 'my-awesome-program')
```


## Customisations

- parses *VBN*-specific products (such as *Anrufverkehr*)
