import {products} from '../../../p/bvg/products.js'

import {
	createValidateStation,
	createValidateJourneyLeg,
	createValidateDeparture,
	createValidateMovement,
} from './validators.js'

const createVbbBvgValidators = ({when}) => {
	const cfg = {
		when,
		stationCoordsOptional: false,
		products
	}

	// todo: coordsOptional = false
	const validateStation = createValidateStation(cfg)

	const validateJourneyLeg = createValidateJourneyLeg(cfg)

	const validateDeparture = createValidateDeparture(cfg)

	const validateMovement = createValidateMovement(cfg)

	return {
		cfg,
		validateStation,
		validateJourneyLeg,
		validateDeparture,
		validateMovement
	}
}

export {
	createVbbBvgValidators,
}
