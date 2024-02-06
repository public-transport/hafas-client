import isRoughlyEqual from 'is-roughly-equal';

const testJourneysWalkingSpeed = async (cfg) => {
	const {test: t, journeys, validate, from, to, when, products, minTimeDifference} = cfg;

	const {journeys: [journeyWithFastWalking]} = await journeys(from, to, {
		departure: when,
		results: 1, products, walkingSpeed: 'fast',
	});
	const legWithFastWalking = journeyWithFastWalking.legs.find(l => l.walking);
	t.ok(legWithFastWalking, 'no walking leg in journey with fast walking');

	const {journeys: [journeyWithSlowWalking]} = await journeys(from, to, {
		departure: when,
		results: 1, products, walkingSpeed: 'slow',
	});
	const legWithSlowWalking = journeyWithSlowWalking.legs.find(l => l.walking);
	t.ok(legWithSlowWalking, 'no walking leg in journey with slow walking');

	const fastDist = legWithFastWalking.distance;
	const slowDist = legWithSlowWalking.distance;
	t.ok(isRoughlyEqual(100, fastDist, slowDist), 'precondition failed');
	const fastDur = new Date(legWithFastWalking.arrival) - new Date(legWithFastWalking.departure);
	const slowDur = new Date(legWithSlowWalking.arrival) - new Date(legWithSlowWalking.departure);
	t.notOk(isRoughlyEqual(minTimeDifference, fastDur, slowDur), 'walkingSpeed not applied');
	t.end();
};

export {
	testJourneysWalkingSpeed,
};
