# VOS profile for `hafas-client`

[*Verkehrsgemeinschaft Osnabrück (VOS)*](https://de.wikipedia.org/wiki/Verkehrsgemeinschaft_Osnabrück) is the local transport provider of [Osnabrück](https://en.wikipedia.org/wiki/Osnabrück). This profile adds *VOS* support to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const vosProfile = require('hafas-client/p/VOS')

// create a client with VOS profile
const client = createClient(vosProfile, 'my-awesome-program')
```
