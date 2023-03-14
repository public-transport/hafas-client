# Rejseplanen profile for `hafas-client`

[*Rejseplanen*](https://da.wikipedia.org/wiki/Rejseplanen) is a Danish website for finding public transport connections throughout Denmark. This profile adds *Rejseplanen*-specific customisations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as rejseplanenProfile} from 'hafas-client/p/rejseplanen/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with Rejseplanen profile
const client = createClient(rejseplanenProfile, userAgent)
```


## Customisations

- parses Denmark-specific products (such as *S-Tog*)
