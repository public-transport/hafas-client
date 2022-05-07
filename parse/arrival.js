import {createParseArrOrDep} from './arrival-or-departure.js'

const ARRIVAL = 'a'
const parseArrival = createParseArrOrDep(ARRIVAL)

export {
	parseArrival,
}
