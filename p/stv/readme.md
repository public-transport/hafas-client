# STV profile for `hafas-client`

[*Steirischer Verkehrsverbund (STV)*](https://de.wikipedia.org/wiki/Steirischer_Verkehrsverbund) is the local transport provider of [Styria](https://en.wikipedia.org/wiki/Styria) that runs its apps under the [*VerbundLinie*](https://www.verbundlinie.at) brand. This profile adds *STV*/*VerbundLinie* support to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as stvProfile} from 'hafas-client/p/stv/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with STV profile
const client = createClient(stvProfile, userAgent)
```

Check out the [code examples](example.js).
