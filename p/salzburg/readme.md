# Salzburg profile for `hafas-client`

The government of [Salzburg](https://en.wikipedia.org/wiki/Salzburg) operates a [public transport planner](https://verkehrsauskunft.salzburg.gv.at). This profile adds support for it to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const salzburgProfile = require('hafas-client/p/salzburg')

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with Salzburg profile
const client = createClient(salzburgProfile, userAgent)
```

Check out the [code examples](example.js).
