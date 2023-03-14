# `serverInfo([opt])`

**Fetches meta information from the HAFAS endpoint.**

With `opt`, you can override the default options, which look like this:

```js
{
	versionInfo: true, // query HAFAS versions?
	language: 'en', // depends on the profile
}
```

## Example

As an example, we're going to use the [SVV profile](../p/svv):

```js
import {createClient} from 'hafas-client'
import {profile as svvProfile} from 'hafas-client/p/svv/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!
const client = createClient(svvProfile, userAgent)

await client.serverInfo()
```

```js
{
	// version of the HAFAS Connection Interface (HCI), the API that hafas-client uses
	hciVersion: '1.23',

	timetableStart: '20200517',
	timetableEnd: '20201212',
	serverTime: '2020-07-19T21:32:12+02:00',
	realtimeDataUpdatedAt: 1595187102,
}
```
