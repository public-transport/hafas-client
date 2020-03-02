# VMT profile for `hafas-client`

[*Verkehrsverbund Mittelthüringen (VMT)*](https://en.wikipedia.org/wiki/Verkehrsverbund_Mittelthüringen) is a major local transport authority in [Thuringia](https://en.wikipedia.org/wiki/Thuringia). This profile adds *VMT*-specific customizations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const vmtProfile = require('hafas-client/p/vmt')

// create a client with VMT profile
const client = createClient(vmtProfile, 'my-awesome-program')
```

## Customisations

- parses *VMT*-specific products
