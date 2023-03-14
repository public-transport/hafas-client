# ÖBB profile for `hafas-client`

[*Österreichische Bundesbahnen (ÖBB)*](https://en.wikipedia.org/wiki/Austrian_Federal_Railways) is the largest Austrian long-distance public transport company. This profile adds *ÖBB*-specific customizations to `hafas-client`. Consider using [`oebb-hafas`](https://github.com/juliuste/oebb-hafas#oebb-hafas), to always get the customized client right away.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as oebbProfile} from 'hafas-client/p/oebb/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with ÖBB profile
const client = createClient(oebbProfile, userAgent)
```


## Customisations

- parses *ÖBB*-specific products (such as *RailJet*)
- parses invalid empty stations from the API as [`location`](https://github.com/public-transport/friendly-public-transport-format/blob/3bd36faa721e85d9f5ca58fb0f38cdbedb87bbca/spec/readme.md#location-objects)s
