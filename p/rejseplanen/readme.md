# Rejseplanen profile for `hafas-client`

[*Rejseplanen*](https://da.wikipedia.org/wiki/Rejseplanen) is a Danish website for finding public transport connections throughout Denmark. This profile adds *Rejseplanen*-specific customisations to `hafas-client`.

## Usage

```js
const createClient = require('hafas-client')
const rejseplanenProfile = require('hafas-client/p/rejseplanen')

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with Rejseplanen profile
const client = createClient(rejseplanenProfile, userAgent)
```


## Customisations

- parses Denmark-specific products (such as *S-Tog*)
