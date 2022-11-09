# BART profile for `hafas-client`

[*Bay Area Rapid Transit (BART)*](https://en.wikipedia.org/wiki/Bay_Area_Rapid_Transit) is the rapid transit public transportation system serving the [San Francisco Bay Area](https://en.wikipedia.org/wiki/San_Francisco_Bay_Area). This profile adds *BART* support to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {bartProfile} from 'hafas-client/p/bart/index.js'

// create a client with BART profile
const client = createClient(bartProfile, 'my-awesome-program')
```
