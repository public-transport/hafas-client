# STV profile for `hafas-client`

[*Steirischer Verkehrsverbund (STV)*](https://de.wikipedia.org/wiki/Steirischer_Verkehrsverbund) is the local transport provider of [Styria](https://en.wikipedia.org/wiki/Styria) that runs its apps under the [*VerbundLinie*](https://www.verbundlinie.at) brand. This profile adds *STV*/*VerbundLinie* support to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {stvProfile} from 'hafas-client/p/stv/index.js'

// create a client with STV profile
const client = createClient(stvProfile, 'my-awesome-program')
```

Check out the [code examples](example.js).
