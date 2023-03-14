# CMTA profile for `hafas-client`

[*Capital Metropolitan Transportation Authority (CMTA)* or *CapMetro*](https://en.wikipedia.org/wiki/Capital_Metropolitan_Transportation_Authority) is a public transportation provider serving [Austin, Texas](https://en.wikipedia.org/wiki/Austin,_Texas) metropolitan area. This profile adds *CMTA*-specific customizations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const cmtaProfile = require('hafas-client/p/cmta')

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with CMTA profile
const client = createClient(cmtaProfile, userAgent)
```


## Customisations

- parses *CMTA*-specific products (such as *MetroRapid* and *MetroRail*)
