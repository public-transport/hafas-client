// For any type of "thing to parse", there's >=1 parse functions.
// By composing custom parse function(s) with the default ones, one
// can customize the behaviour of hafas-client. Profiles extensively
// use this mechanism.

// Each parse function has the following signature:
// ({opt, profile, common, res}, ...raw) => newParsed

// Compose a new/custom parse function with the old/existing parse
// function, so that the new fn will be called with the output of the
// old fn.
const parseHook = (oldParse, newParse) => {
	return (ctx, ...args) => {
		return newParse({
			...ctx,
			parsed: oldParse({...ctx, parsed: {}}, ...args)
		}, ...args)
	}
}

export {
	parseHook,
}
