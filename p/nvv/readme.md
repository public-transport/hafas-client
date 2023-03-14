# NVV profile for `hafas-client`

[*Nordhessischer Verkehrsverbund (NVV)*](https://en.wikipedia.org/wiki/Nordhessischer_Verkehrsverbund) is a local transport association in [Hesse](https://en.wikipedia.org/wiki/Hesse). This profile adds *NVV*-specific customizations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const nvvProfile = require('hafas-client/p/nvv')

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with NVV profile
const client = createClient(nvvProfile, userAgent)
```


## Customisations

- parses *NVV*-specific products (such as *RegioTram*)
