import {createParseArrOrDep} from './arrival-or-departure.js'

const DEPARTURE = 'd'
const parseDeparture = createParseArrOrDep(DEPARTURE)

export {
	parseDeparture,
}
