'use strict'

const a = require('assert')
const products = require('../../../p/bvg/products')

const {
	station: createValidateStation,
	journeyLeg: createValidateJourneyLeg,
	departure: createValidateDeparture,
	movement: createValidateMovement
} = require('./validators')

const createValidators = ({when}) => {
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

module.exports = createValidators
