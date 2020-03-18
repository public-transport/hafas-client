# Profiles

This directory contains specific customisations for each endpoint, called *profiles*. They **parse data from the API differently, add additional information, or enable non-default methods** (such as [`trip`](../docs/trip.md)) if they are supported.

Each profile has it's own directory. It will be passed into `hafas-client` and is expected to be in a certain structure:

```js
const createClient = require('hafas-client')
const someProfile = require('hafas-client/p/some-profile')

// create a client with the profile
const client = createClient(dbProfile)

// use it to query data…
```

If you want to write a profile for an endpoint, check out the [*writing a profile* guide](../docs/writing-a-profile.md).
