# VMT profile for `hafas-client`

[*Verkehrsverbund Mittelthüringen (VMT)*](https://en.wikipedia.org/wiki/Verkehrsverbund_Mittelthüringen) is a major local transport authority in [Thuringia](https://en.wikipedia.org/wiki/Thuringia). This profile adds *VMT*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as vmtProfile} from 'hafas-client/p/vmt/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with VMT profile
const client = createClient(vmtProfile, userAgent)
```

## Customisations

- parses *VMT*-specific products
