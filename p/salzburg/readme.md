# Salzburg profile for `hafas-client`

The government of [Salzburg](https://en.wikipedia.org/wiki/Salzburg) operates a [public transport planner](https://verkehrsauskunft.salzburg.gv.at). This profile adds support for it to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {salzburgProfile} from 'hafas-client/p/salzburg/index.js'

// create a client with Salzburg profile
const client = createClient(salzburgProfile, 'my-awesome-program')
```

Check out the [code examples](example.js).
