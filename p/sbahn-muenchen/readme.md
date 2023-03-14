# S-Bahn München profile for `hafas-client`

[*S-Bahn München*](https://en.wikipedia.org/wiki/Munich_S-Bahn) runs commuter trains in [Munich](https://en.wikipedia.org/wiki/Munich). This profile adapts `hafas-client` to their HAFAS endpoint.

## Usage

```js
const createClient = require('hafas-client')
const sMuenchenProfile = require('hafas-client/p/sbahn-muenchen')

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with S-Bahn München profile
const client = createClient(sMuenchenProfile, userAgent)
```
