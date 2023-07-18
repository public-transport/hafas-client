import tap from 'tap'

import {createClient} from '../../index.js'
import {profile as dbProfile} from '../../p/db/index.js'
import {routingModes as routingModes} from '../../lib/db-routing-modes.js'

const client = createClient(dbProfile, 'public-transport/hafas-client:test')

const berlinHbf = '8011160'
const münchenHbf = '8000261'

tap.test('journeys – check all routing modes', async (t) => {
	for (let mode in routingModes) {
		console.log(mode)
		const res = await client.journeys(berlinHbf, münchenHbf,
			{
				results: 1, tickets: true, routingMode: mode
			}
			)
		console.log(res)
	}

	t.end()
})
