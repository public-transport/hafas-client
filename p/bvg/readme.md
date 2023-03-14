# BVG profile for `hafas-client`

[*Verkehrsverbund Berlin-Brandenburg (BVG)*](https://en.wikipedia.org/wiki/Verkehrsverbund_Berlin-Brandenburg) is the major local transport provider in [Berlin](https://en.wikipedia.org/wiki/Berlin). This profile adds *BVG*-specific customizations to `hafas-client`.

## Usage

```js
import {createClient} from 'hafas-client'
import {profile as bvgProfile} from 'hafas-client/p/bvg/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!

// create a client with BVG profile
const client = createClient(bvgProfile, userAgent)
```


## Customisations

- parses *BVG*-specific products (such as *X-Bus*)
- supports [BerlKönig `journey` legs](#berlkoenig)
- strips parts from station names that are unnecessary in the Berlin context
- parses line names to give more information (e.g. "Is it an express bus?")
- renames *Ringbahn* line names to contain `⟳` and `⟲`

### BerlKönig

BVG has recently announced [a ride-sharing service called *BerlKönig*](https://www.berlkoenig.de). Pass `berlkoenig: true` into `journeys()` to get special legs:

```js
{
	mode: 'walking',
	departure: // …
	arrival: // …
	origin: // …
	destination: // …
	line: {
		type: 'line',
		name: 'BerlKönig',
		public: true,
		mode: 'taxi',
		product: 'berlkoenig'
	}
}
```
