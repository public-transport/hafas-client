# Salzburg profile for `hafas-client`

The government of [Salzburg](https://en.wikipedia.org/wiki/Salzburg) operates a [public transport planner](https://verkehrsauskunft.salzburg.gv.at). This profile adds support for it to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as salzburgProfile} from 'hafas-client/p/salzburg/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with Salzburg profile
const client = createClient(salzburgProfile, userAgent)
```

Check out the [code examples](example.js).
