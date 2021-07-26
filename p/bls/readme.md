# BLS profile for `hafas-client`

[*BLS AG*](https://en.wikipedia.org/wiki/BLS_AG) is the local transport provider of the [Canton of Bern](https://en.wikipedia.org/wiki/Canton_of_Bern). This profile adds *BLS* support to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const blsProfile = require('hafas-client/p/BLS')

// create a client with BLS profile
const client = createClient(blsProfile, 'my-awesome-program')
```

Check out the [code examples](example.js).
