# SBB profile for `hafas-client`

[*Schweizerische Bundesbahnen (SBB)*](https://en.wikipedia.org/wiki/Swiss_Federal_Railways) is the largest Swiss long-distance public transport company. This profile adds *SBB*-specific customizations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const sbbProfile = require('hafas-client/p/sbb')

// create a client with ÖBB profile
const client = createClient(sbbProfile, 'my-awesome-program')
```


## Customisations
