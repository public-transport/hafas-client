'use strict'

// There are two kinds of notes: "remarks" (in `remL`) and HAFAS
// Information Manager (HIM) notes (in `himL`). The former describe
// the regular operating situation, e.g. "bicycles allows", whereas
// the latter describe cancellations, construction work, etc.

// hafas-client's naming scheme:
// - hints: notes from `remL` for regular operation
// - warnings: notes from `himL` for cancellations, construction, etc
// - remarks: both "notes" and "warnings"

const findRemark = (hints, warnings, ref) => {
	return warnings[ref.himX] || hints[ref.remX] || null
}

module.exports = findRemark
