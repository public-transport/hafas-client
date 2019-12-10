# Migrating to `hafas-client@5`

## If you use `journeys()`…

…with the `walkingSpeed` option and a custom profile, add `journeysWalkingSpeed` to your profile. 937583e
…without the `results` option, but *expect* a certain number of results, you must pass `results` now. 0045587

## If you use `departures()`/`arrivals()` with the [BVG profile](../p/bvg)…

With the latest protocol version, the BVG endpoint doesn't support these options anymore:

- `stopovers` – Fetch & parse previous/next stopovers? Default: `false`
- `includeRelatedStations` – Fepartures at related stations, e.g. those that belong together on the metro map? Default: `true`

2d72391

## If you use a custom profile…

Let's assume you have parse function looking like this:

```js
const createParseLine = (profile, opt, data) => (rawLine) => {
	const operator = data.operators[rawLine.oprX] || null
	if (operator && operator.name === 'foo') {
		return {
			type: 'line',
			name: 'really special tram line',
			mode: 'tram',
			product: 'special-tram',
			operator
		}
	}
	return defaultParseLine(rawLine)
}
```

Adapt your parse function like this:

```diff
const createParseLine = (profile, opt, _) => (rawLine) => {
-	const operator = data.operators[rawLine.oprX] || null
+	const operator = rawLine.operator || null
```

See also [`#127`](https://github.com/public-transport/hafas-client/pull/127).

If you use `icons` in `parseWarning`/`parseHint`, adapt the function(s) to take an object `data` as the first argument. You can access the list of *parsed* icons via `data.icons`, *parsed* warnings via `data.warnings`, etc. a229205 b36f0e3

## Other breaking changes

- `journey.price` will be `null` if there's no pricing data returned by the endpoint, instead of `{amount: null}`. 8fe277d
