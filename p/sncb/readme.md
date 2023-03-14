# SNCB profile for `hafas-client`

*Note:* **This profile is currently broken** because [SNCB has switched the HAFAS API style](https://github.com/public-transport/hafas-client/issues/284) and we haven't migrated to the new API.

[*Société nationale des chemins de fer belges (SNCB)*/*Nationale Maatschappij der Belgische Spoorwegen (NMBS)*](https://en.wikipedia.org/wiki/National_Railway_Company_of_Belgium) is the major public transport provider of [Belgium](https://en.wikipedia.org/wiki/Belgium). This profile adds *SNCB*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as sncbProfile} from 'hafas-client/p/sncb/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with SNCB profile
const client = createClient(sncbProfile, userAgent)
```


## Customisations

- parses *SNCB*-specific products
