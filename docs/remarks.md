# `remarks([opt])`

**Fetches all remarks known to the HAFAS endpoint**, e.g. warnings about disruptions, planned construction work, and general notices about the operating situation.

With `opt`, you can override the default options, which look like this:

```js
{
	results: 100, // maximum number of remarks
	// filter by time
	from: Date.now(),
	to: null,
	products: null, // filter by affected products
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

const {
	remarks,
	realtimeDataUpdatedAt,
} = await client.remarks()
```

`realtimeDataUpdatedAt` is a UNIX timestamp reflecting the latest moment when (at least some of) the response's realtime data have been updated.

`remarks` may look like this:

```js
[
	{
		id: 'HIM_FREETEXT_110342',
		type: 'warning',
		summary: 'Bus will be running at different times',
		text: 'Due to operational changes, this bus will be running at different times. We apologise for any inconvenience this may cause.',
		priority: 50,
		company: 'KGÖVV',
		validFrom: '2020-07-04T00:00:00+02:00',
		validUntil: '2020-08-09T23:59:00+02:00',
		modified: '2020-07-01T14:39:12+02:00',
		products: {
			'bahn-s-bahn': true,
			'u-bahn': true,
			strassenbahn: true,
			fernbus: true,
			regionalbus: true,
			stadtbus: true,
			'seilbahn-zahnradbahn': true,
			schiff: true,
		},
		categories: [1],
		icon: {type: 'HIM1', title: null},
	},
	// …
	{
		id: 'HIM_FREETEXT_110235',
		type: 'warning',
		summary: 'Linie 7 - Umleitungen',
		text: 'Aufgrund einer Baustelle gibt es bei der Linie 7 umfangreiche Umleitungen.',
		priority: 100,
		company: 'VOR',
		validFrom: '2020-07-13T00:00:00+02:00',
		validUntil: '2020-08-31T23:59:00+02:00',
		modified: '2020-06-30T12:37:38+02:00',
		affectedLines: [{
			type: 'line',
			id: '7',
			name: '7',
			public: true,
		}],
		products: {
			'bahn-s-bahn': true,
			'u-bahn': true,
			strassenbahn: true,
			fernbus: true,
			regionalbus: true,
			stadtbus: true,
			'seilbahn-zahnradbahn': false,
			schiff: true,
		},
		categories: [1],
		icon: {type: 'HIM1', title: null},
	},
	// …
	{
		id: 'HIM_FREETEXT_106619',
		type: 'warning',
		summary: 'Stop Bad Hall Bahnhofstraße can not be approached',
		text: 'The stop at Bad Hall Bahnhofstraße can not be approached during 21.04.-24.07.2020. Please use alternatively the stop at Bad Hall Busterminal (Abzw Bahnhofstraße).',
		priority: 100,
		company: 'OÖVG',
		validFrom: '2020-04-21T00:00:00+02:00',
		validUntil: '2020-07-24T23:59:00+02:00',
		modified: '2020-07-08T12:52:13+02:00',
		affectedLines: [{
			type: 'line',
			id: '452',
			name: '452',
			public: true,
		}],
		products: {
			'bahn-s-bahn': false,
			'u-bahn': false,
			strassenbahn: false,
			fernbus: false,
			regionalbus: true,
			stadtbus: false,
			'seilbahn-zahnradbahn': false,
			schiff: false
		},
		categories: [1],
		icon: {type: 'HIM1', title: null},
	},
	// …
	{
		id: 'HIM_FREETEXT_106671',
		type: 'warning',
		summary: 'Neue Haltestellennamen',
		text: 'Im Zuge der Neuordnung der Regionalbusverkehre werden mit 6.7.2020 neue Fahrpläne und Liniennummern wirksam und dadurch können sich mitunter die Haltestellennamen verändern.',
		priority: 100,
		company: 'VOR',
		validFrom: '2020-04-21T00:00:00+02:00',
		validUntil: '2020-09-30T23:59:00+02:00',
		modified: '2020-04-21T13:20:41+02:00',
		products: {
			'bahn-s-bahn': true,
			'u-bahn': true,
			strassenbahn: true,
			fernbus: true,
			regionalbus: true,
			stadtbus: true,
			'seilbahn-zahnradbahn': false,
			schiff: true,
		},
		categories: [4],
		icon: {type: 'HIM4', title: null},
	},
	// …
]
```
