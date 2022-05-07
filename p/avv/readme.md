# AVV profile for `hafas-client`

[*Aachener Verkehrsverbund (AVV)*](https://de.wikipedia.org/wiki/Aachener_Verkehrsverbund) is the local transport provider of [Aachen](https://en.wikipedia.org/wiki/Aachen). This profile adds *AVV* support to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {avvProfile} from 'hafas-client/p/avv/index.js'

// create a client with AVV profile
const client = createClient(avvProfile, 'my-awesome-program')
```
