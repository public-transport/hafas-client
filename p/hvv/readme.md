# HVV profile for `hafas-client`

[*Hamburger Verkehrsverbund (HVV)*](https://en.wikipedia.org/wiki/Hamburger_Verkehrsverbund) is the major local transport provider in [Hamburg](https://en.wikipedia.org/wiki/Hamburg). This profile adds *HVV*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {hvvProfile} from 'hafas-client/p/hvv/index.js'

// create a client with HVV profile
const client = createClient(hvvProfile, 'my-awesome-program')
```


## Customisations

- parses *HVV*-specific products (such as *AKN*)
