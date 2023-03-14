# VMT profile for `hafas-client`

[*Verkehrsverbund Mittelthüringen (VMT)*](https://en.wikipedia.org/wiki/Verkehrsverbund_Mittelthüringen) is a major local transport authority in [Thuringia](https://en.wikipedia.org/wiki/Thuringia). This profile adds *VMT*-specific customizations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const vmtProfile = require('hafas-client/p/vmt')

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with VMT profile
const client = createClient(vmtProfile, userAgent)
```

## Customisations

- parses *VMT*-specific products
