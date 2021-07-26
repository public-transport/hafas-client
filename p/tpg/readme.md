# TPG profile for `hafas-client`

[*Transports publics genevois (TPG)*](https://en.wikipedia.org/wiki/Geneva_Public_Transport) is the local transport provider of the [Canton of Geneva](https://en.wikipedia.org/wiki/Canton_of_Geneva). This profile adds *TPG* support to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const tpgProfile = require('hafas-client/p/TPG')

// create a client with TPG profile
const client = createClient(tpgProfile, 'my-awesome-program')
```

Check out the [code examples](example.js).
