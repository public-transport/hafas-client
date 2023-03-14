# PKP profile for `hafas-client`

[*Polskie Koleje Państwowe (PKP)*](https://en.wikipedia.org/wiki/Polish_State_Railways) is the major national transport provider in Poland. This profile adds *PKP*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as pkpProfile} from 'hafas-client/p/pkp/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with PKP profile
const client = createClient(pkpProfile, userAgent)
```


## Customisations

- parses *PKP*-specific products (such as *TLK*)
