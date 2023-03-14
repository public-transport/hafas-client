# Irish Rail profile for `hafas-client`

The [*Iarnród Éireann* (Irish Rail)](https://en.wikipedia.org/wiki/Iarnród_Éireann) is the national railway company of Ireland. This profile adds *Iarnród Éireann*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as irishProfile} from 'hafas-client/p/irish-rail/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with Irish Rail profile
const client = createClient(irishProfile, userAgent)
```


## Customisations

- parses *Irish Rail*-specific products (such as *LUAS* or *DART*)
