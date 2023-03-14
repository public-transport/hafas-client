# STV profile for `hafas-client`

[*Steirischer Verkehrsverbund (STV)*](https://de.wikipedia.org/wiki/Steirischer_Verkehrsverbund) is the local transport provider of [Styria](https://en.wikipedia.org/wiki/Styria) that runs its apps under the [*VerbundLinie*](https://www.verbundlinie.at) brand. This profile adds *STV*/*VerbundLinie* support to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const stvProfile = require('hafas-client/p/stv')

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with STV profile
const client = createClient(stvProfile, userAgent)
```

Check out the [code examples](example.js).
