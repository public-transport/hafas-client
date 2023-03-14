# SVV profile for `hafas-client`

[*Salzburger Verkehrsverbund (SVV)*](https://de.wikipedia.org/wiki/Salzburger_Verkehrsverbund) is the local transit authority of [Salzburg](https://en.wikipedia.org/wiki/Salzburg). This profile adds *SVV*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as svvProfile} from 'hafas-client/p/svv/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with SVV profile
const client = createClient(svvProfile, userAgent)
```


## Customisations

- parses *SVV*-specific products
