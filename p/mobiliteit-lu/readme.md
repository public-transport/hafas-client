# mobiliteit.lu profile for `hafas-client`

[*mobiliteit.lu*](https://www.mobiliteit.lu) provides public transport data for Luxembourg. This profile adds *mobiliteit.lu*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as mobiliteitProfile} from 'hafas-client/p/mobiliteit-lu/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with mobiliteit.lu profile
const client = createClient(mobiliteitProfile, userAgent)
```


## Customisations

- parses *mobiliteit.lu*-specific products
