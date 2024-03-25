# DB Streckenagent profile for `hafas-client`

[*DB Regio*](https://en.wikipedia.org/wiki/DB_Regio) is a major prodiver of regional transport services in Germany. This profile adds support for [*Streckenagent*](https://www.bahn.de/service/mobile/streckenagent-app)'s backend to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as dbRegioProfile} from 'hafas-client/p/db-regio/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with DB Streckenagent profile
const client = createClient(dbRegioProfile, userAgent)
```
