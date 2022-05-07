const ageGroup = {
	BABY: 'B',
	CHILD: 'K',
	YOUNG: 'Y',
	ADULT: 'E',
	SENIOR: 'S',
	upperBoundOf: {
		BABY: 6,
		CHILD: 15,
		YOUNG: 27,
		ADULT: 65,
		SENIOR: Infinity
	}
}

const ageGroupFromAge = (age) => {
	const {upperBoundOf} = ageGroup
	if (age < upperBoundOf.BABY)
		return ageGroup.BABY
	if (age < upperBoundOf.CHILD)
		return ageGroup.CHILD
	if (age < upperBoundOf.YOUNG)
		return ageGroup.YOUNG
	if (age < upperBoundOf.ADULT)
		return ageGroup.ADULT
	if (age < upperBoundOf.SENIOR)
		return ageGroup.SENIOR
	throw new TypeError(`Invalid age '${age}'`)
}

export {
	ageGroup,
	ageGroupFromAge,
}
