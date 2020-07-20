# ZVV profile for `hafas-client`

[*Zürcher Verkehrsverbund (ZVV)*](https://en.wikipedia.org/wiki/Zürcher_Verkehrsverbund) is the local transport system of [Zürich](https://en.wikipedia.org/wiki/Zürich). This profile adds *ZVV*-specific customizations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const zvvProfile = require('hafas-client/p/zvv')

// create a client with ZVV profile
const client = createClient(zvvProfile, 'my-awesome-program')
```
