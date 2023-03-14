# IVB profile for `hafas-client`

[*Innsbrucker Verkehrsbetriebe (IVB)*](https://de.wikipedia.org/wiki/Innsbrucker_Verkehrsbetriebe_und_Stubaitalbahn) is the local transport provider of [Innsbruck](https://en.wikipedia.org/wiki/Innsbruck). This profile adds *IVB* support to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as ivbProfile} from 'hafas-client/p/ivb/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with IVB profile
const client = createClient(ivbProfile, userAgent)
```

Check out the [code examples](example.js).
