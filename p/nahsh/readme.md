# NAH.SH profile for `hafas-client`

[*Nahverkehrsverbund Schleswig-Holstein (NAH.SH)*](https://de.wikipedia.org/wiki/Nahverkehrsverbund_Schleswig-Holstein) is the transportation authority for regional transport in [Schleswig-Holstein](https://en.wikipedia.org/wiki/Schleswig-Holstein). This profile adds *NAH.SH*-specific customizations to `hafas-client`. Consider using [`nahsh-hafas`](https://github.com/juliuste/nahsh-hafas), to always get the customized client right away.

## Usage

```js
import {createClient} from 'hafas-client'
import {nahshProfile} from 'hafas-client/p/nahsh/index.js'

// create a client with NAH.SH profile
const client = createClient(nahshProfile, 'my-awesome-program')
```


## Customisations

- parses *NAH.SH*-specific products
