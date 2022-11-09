# VBB profile for `hafas-client`

[*Verkehrsverbund Berlin-Brandenburg (VBB)*](https://en.wikipedia.org/wiki/Verkehrsverbund_Berlin-Brandenburg) is a group of public transport companies, running the public transport network in [Berlin](https://en.wikipedia.org/wiki/Berlin). This profile adds *VBB*-specific customizations to `hafas-client`. Consider using [`vbb-hafas`](https://github.com/derhuerst/vbb-hafas#vbb-hafas), to always get the customized client right away.

## Usage

```js
import {createClient} from 'hafas-client'
import {vbbProfile} from 'hafas-client/p/vbb/index.js'

// create a client with VBB profile
const client = createClient(vbbProfile, 'my-awesome-program')
```


## Customisations

- parses *VBB*-specific products (such as *X-Bus*)
- renames *Ringbahn* line names to contain `⟳` and `⟲`
