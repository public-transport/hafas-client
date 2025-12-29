# SNCB profile for `hafas-client`

> [!IMPORTANT]
> The underlying [SNCB HAFAS API has been permanently shut down](https://github.com/public-transport/hafas-client/issues/284).
> The API responds with: "This feature is no longer available. To plan your trip, download the new SNCB app."

> [!TIP]
> **Alternative:** For Belgian railway data, consider using the [iRail API](https://api.irail.be/) instead.
> - Documentation: https://docs.irail.be/
> - GitHub: https://github.com/iRail

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
