# SBB profile for `hafas-client`

[*Schweizerische Bundesbahnen (SBB)*](https://en.wikipedia.org/wiki/Swiss_Federal_Railways) is the largest Swiss long-distance public transport company. This profile adds *SBB*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {sbbProfile} from 'hafas-client/p/sbb/index.js'

// create a client with SBB profile
const client = createClient(sbbProfile, 'my-awesome-program')
```

By default, the `de_CH` locale is being used. You can customize it using `withLocale()`:

```js
// create a client with SBB profile and fr_CH locale
const client = createClient(sbbProfile.withLocale('fr_CH'), 'my-awesome-program')
```


## Customisations
