# PKP profile for `hafas-client`

[*Polskie Koleje Państwowe (PKP)*](https://en.wikipedia.org/wiki/Polish_State_Railways) is the major national transport provider in Poland. This profile adds *PKP*-specific customizations to `hafas-client`.

> [!CAUTION]
> Note that usage of the endpoint might be subject to [terms of service](http://regulamin.rozklad-pkp.pl). Please clarify first if you're allowed to access it.

> [!TIP]
> The endpoint applies IP-based Geoblocking with some false positives, so you might have additional steps to go through in order to access it.

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
