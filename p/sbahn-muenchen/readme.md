# S-Bahn München profile for `hafas-client`

[*S-Bahn München*](https://en.wikipedia.org/wiki/Munich_S-Bahn) runs commuter trains in [Munich](https://en.wikipedia.org/wiki/Munich). This profile adapts `hafas-client` to their HAFAS endpoint.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as sMuenchenProfile} from 'hafas-client/p/sbahn-muenchen/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with S-Bahn München profile
const client = createClient(sMuenchenProfile, userAgent)
```
