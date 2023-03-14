# DART profile for `hafas-client`

[*Des Moines Area Rapid Transit (DART)*](https://en.wikipedia.org/wiki/Des_Moines_Area_Regional_Transit) is the local transport provider of [Des Moines](https://en.wikipedia.org/wiki/Des_Moines_metropolitan_area), Iowa, USA. This profile adds *DART* support to `hafas-client`.

*Note:* This profile *does not* support [*Dallas Area Rapid Transit (DART)*](https://de.wikipedia.org/wiki/Verkehrsverbund_Vorarlberg) in [Dallas–Fort Worth](https://en.wikipedia.org/wiki/Dallas–Fort_Worth_metroplex), Texas, USA.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as dartProfile} from 'hafas-client/p/dart/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with DART profile
const client = createClient(dartProfile, userAgent)
```

Check out the [code examples](example.js).
