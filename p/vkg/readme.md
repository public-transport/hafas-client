# VKG profile for `hafas-client`

[*Kärntner Linien/Verkehrsverbund Kärnten (VKG/VVK)*](https://de.wikipedia.org/wiki/Verkehrsverbund_Kärnten) is the local transport provider of [Carinthia](https://en.wikipedia.org/wiki/Carinthia). This profile adds *VKG* support to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const vkgProfile = require('hafas-client/p/vkg')

// create a client with VKG profile
const client = createClient(vkgProfile, 'my-awesome-program')
```
