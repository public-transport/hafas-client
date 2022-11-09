# ZVV profile for `hafas-client`

[*Zürcher Verkehrsverbund (ZVV)*](https://en.wikipedia.org/wiki/Zürcher_Verkehrsverbund) is the local transport system of [Zürich](https://en.wikipedia.org/wiki/Zürich). This profile adds *ZVV*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {zvvProfile} from 'hafas-client/p/zvv/index.js'

// create a client with ZVV profile
const client = createClient(zvvProfile, 'my-awesome-program')
```
