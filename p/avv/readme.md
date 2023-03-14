# AVV profile for `hafas-client`

[*Aachener Verkehrsverbund (AVV)*](https://de.wikipedia.org/wiki/Aachener_Verkehrsverbund) is the local transport provider of [Aachen](https://en.wikipedia.org/wiki/Aachen). This profile adds *AVV* support to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const avvProfile = require('hafas-client/p/AVV')

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with AVV profile
const client = createClient(avvProfile, userAgent)
```
