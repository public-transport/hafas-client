# HVV profile for `hafas-client`

[*Hamburger Verkehrsverbund (HVV)*](https://en.wikipedia.org/wiki/Hamburger_Verkehrsverbund) is the major local transport provider in [Hamburg](https://en.wikipedia.org/wiki/Hamburg). This profile adds *HVV*-specific customizations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const hvvProfile = require('hafas-client/p/hvv')

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with HVV profile
const client = createClient(hvvProfile, userAgent)
```


## Customisations

- parses *HVV*-specific products (such as *AKN*)
