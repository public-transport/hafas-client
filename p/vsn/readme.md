# VSN profile for `hafas-client`
[*Verkehrsverbund Süd-Niedersachsen (VSN)*](https://de.wikipedia.org/wiki/Verkehrsverbund_S%C3%BCd-Niedersachsen) is the local transport provider south [Lower Saxony](https://en.wikipedia.org/wiki/Lower_Saxony). This profile adds *VSN*-specific customizations to `hafas-client`.

## Usage
```js
const createClient = require('hafas-client')
const vsnProfile = require('hafas-client/p/vsn')

// create a client with VSN profile
const client = createClient(vsnProfile, 'my-awesome-program')
```

## Customisations
- parses *VSN*-specific products
