# `lines([opt])`

**Fetches all lines known to the HAFAS endpoint**, e.g. warnings about disruptions, planned construction work, and general notices about the operating situation.

## Example

As an example, we're going to use the [SVV profile](../p/svv):

```js
import {createClient} from 'hafas-client'
import {profile as svvProfile} from 'hafas-client/p/svv/index.js'

const userAgent = 'link-to-your-project-or-email' // adapt this to your project!
const client = createClient(svvProfile, userAgent)

const {
	lines,
	realtimeDataUpdatedAt,
} = await client.lines('S1')
```

`realtimeDataUpdatedAt` is a UNIX timestamp reflecting the latest moment when (at least some of) the response's realtime data have been updated.

`lines` may look like this:

```js
[
	{
		"id": "obb-1-S1-V-j20-1",
		"type": "line",
		"name": "S1",
		"public": true,
		"mode": "train",
		"product": "bahn-s-bahn",
		"operator": {
			"type": "operator",
			"id": "montafonerbahn-ag",
			"name": "Montafonerbahn AG"
		},
		"directions": [
			"Bludenz Bahnhof",
			"Bregenz Hafen Bahnhof",
			"Lindau Hbf",
			"Bregenz Bahnhof",
			"Schruns Bahnhof",
			"Lochau Bahnhof"
		],
	},
	// …
	{
		"id": "svv-42-50-j20-2",
		"type": "line",
		"name": "S1",
		"public": true,
		"mode": "train",
		"product": "bahn-s-bahn",
		"operator": {
			"type": "operator",
			"id": "salzburg-ag-salzburger-lokalbahn",
			"name": "Salzburg AG - Salzburger Lokalbahn"
		},
		"directions": [
			"Lamprechtshausen Bahnhof",
			"Salzburg Hauptbahnhof",
			"Acharting S-Bahn",
			"Weitwörth-Nussdorf Bahnhof"
		],
	},
]
```
