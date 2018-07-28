# VBB profile for `hafas-client`

[*Verkehrsverbund Berlin-Brandenburg (VBB)*](https://en.wikipedia.org/wiki/Verkehrsverbund_Berlin-Brandenburg) is a group of public transport companies, running the public transport network in [Berlin](https://en.wikipedia.org/wiki/Berlin). This profile adds *VBB*-specific customizations to `hafas-client`. Consider using [`vbb-hafas`](https://github.com/derhuerst/vbb-hafas#vbb-hafas), to always get the customized client right away.

## Usage

```js
const createClient = require('hafas-client')
const vbbProfile = require('hafas-client/p/vbb')

// create a client with VBB profile
const client = createClient(vbbProfile, 'my-awesome-program')
```


## Customisations

- parses *VBB*-specific products (such as *X-Bus*)
- strips parts from station names that are unnecessary in the Berlin context
- parses line names to give more information (e.g. "Is it an express bus?")
- parses *VBB*-specific tickets
- renames *Ringbahn* line names to contain `⟳` and `⟲`
