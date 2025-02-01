# Deutsche Bahn "smartrbl" profile for `hafas-client`

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as dbSmartrblProfile} from 'hafas-client/p/db-smartrbl/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with the Deutsche Bahn "smartrbl" profile
const client = createClient(dbSmartrblProfile, userAgent)
```
