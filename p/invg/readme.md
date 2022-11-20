# INVG profile for `hafas-client`

[*Ingolstädter Verkehrsgesellschaft (INVG)*](https://de.wikipedia.org/wiki/Ingolstädter_Verkehrsgesellschaft) is a public transportation provider serving [Ingolstadt, Germany](https://en.wikipedia.org/wiki/Ingolstadt). This profile adds *INVG*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile} from 'hafas-client/p/invg/index.js'

// create a client with INVG profile
const client = createClient(profile, 'my-awesome-program')
```


## Customisations

- parses *INVG*-specific products
