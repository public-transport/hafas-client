import flatMap from 'lodash/flatMap.js'

// There are two kinds of notes: "remarks" (in `remL`) and HAFAS
// Information Manager (HIM) notes (in `himL`). The former describe
// the regular operating situation, e.g. "bicycles allows", whereas
// the latter describe cancellations, construction work, etc.

// hafas-client's naming scheme:
// - hints: notes from `remL` for regular operation
// - warnings: notes from `himL` for cancellations, construction, etc
// - remarks: both "notes" and "warnings"

const findRemarks = (refs) => {
	return flatMap(refs, (ref) => {
		return [ref.warning, ref.hint]
		.filter(rem => !!rem)
		.map(rem => [rem, ref])
	})
}

export {
	findRemarks,
}
