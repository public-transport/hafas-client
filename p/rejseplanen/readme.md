# Rejseplanen profile for `hafas-client`

[*Rejseplanen*](https://da.wikipedia.org/wiki/Rejseplanen) is a Danish website for finding public transport connections throughout Denmark. This profile adds *Rejseplanen*-specific customisations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const rejseplanenProfile = require('hafas-client/p/rejseplanen')

// create a client with Rejseplanen profile
const client = createClient(rejseplanenProfile)
```


## Customisations

- parses Denmark-specific products (such as *S-Tog*)
