# RSAG profile for `hafas-client`

[*Rostocker Straßenbahn AG (RSAG)*](https://de.wikipedia.org/wiki/Rostocker_Straßenbahn_AG) is the local transport provider in [Rostock](https://en.wikipedia.org/wiki/Rostock). This profile adds *RSAG*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as rsagProfile} from 'hafas-client/p/rsag/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with RSAG profile
const client = createClient(rsagProfile, userAgent)
```


## Customisations

- parses *RSAG*-specific products
