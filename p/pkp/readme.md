# PKP profile for `hafas-client`

[*Polskie Koleje Państwowe (PKP)*](https://en.wikipedia.org/wiki/Polish_State_Railways) is the major national transport provider in Poland. This profile adds *PKP*-specific customizations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const pkpProfile = require('hafas-client/p/pkp')

// create a client with PKP profile
const client = createClient(pkpProfile, 'my-awesome-program')
```


## Customisations

- parses *PKP*-specific products (such as *TLK*)
