# BLS profile for `hafas-client`

*Note: This is not working in testing might be sensible to disable the profile too if there are no fixes available*

[*BLS AG*](https://en.wikipedia.org/wiki/BLS_AG) is the local transport provider of the [Canton of Bern](https://en.wikipedia.org/wiki/Canton_of_Bern). This profile adds *BLS* support to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as blsProfile} from 'hafas-client/p/bls/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with BLS profile
const client = createClient(blsProfile, userAgent)
```

Check out the [code examples](example.js).
