const bike = {type: 'BC', mode: 'INC'}

const accessibility = {
	none: {type: 'META', mode: 'INC', meta: 'notBarrierfree'},
	partial: {type: 'META', mode: 'INC', meta: 'limitedBarrierfree'},
	complete: {type: 'META', mode: 'INC', meta: 'completeBarrierfree'}
}

export {
	bike,
	accessibility,
}
