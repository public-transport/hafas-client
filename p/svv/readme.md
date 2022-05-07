# SVV profile for `hafas-client`

[*Salzburger Verkehrsverbund (SVV)*](https://de.wikipedia.org/wiki/Salzburger_Verkehrsverbund) is the local transit authority of [Salzburg](https://en.wikipedia.org/wiki/Salzburg). This profile adds *SVV*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {svvProfile} from 'hafas-client/p/svv/index.js'

// create a client with SVV profile
const client = createClient(svvProfile, 'my-awesome-program')
```


## Customisations

- parses *SVV*-specific products
