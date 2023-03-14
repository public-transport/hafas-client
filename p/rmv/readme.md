# RMV profile for `hafas-client`

[*Rhein-Main-Verkehrsverbund (RMV)*](https://en.wikipedia.org/wiki/Rhein-Main-Verkehrsverbund) is a public transport authority in [Hesse](https://en.wikipedia.org/wiki/Hesse)/[Rhineland-Palatinate](https://en.wikipedia.org/wiki/Rhineland-Palatinate). This profile adds *RMV*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as rmvProfile} from 'hafas-client/p/rmv/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with RMV profile
const client = createClient(rmvProfile, userAgent)
```


## Customisations

- parses *RMV*-specific products
