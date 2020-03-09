# `serverInfo([opt])`

**Fetches meta information from the HAFAS endpoint.**

With `opt`, you can override the default options, which look like this:

```js
{
	language: 'en', // depends on the profile
}
```

## Example

As an example, we're going to use the [SVV profile](../p/svv):

```js
const createClient = require('hafas-client')
const svvProfile = require('hafas-client/p/svv')

const client = createClient(svvProfile, 'my-awesome-program')

console.log(await client.serverInfo())
```

```js
{
	timetableStart: '20200517',
	timetableEnd: '20201212',
	serverTime: '2020-07-19T21:32:12+02:00',
	realtimeDataUpdatedAt: 1595187102,
}
```
