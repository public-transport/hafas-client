import tap from 'tap';

import {createClient} from '../../index.js';
import {profile as vbbProfile} from '../../p/vbb/index.js';

const client = createClient(vbbProfile, 'public-transport/hafas-client:test');

tap.test('exposes the profile', (t) => {
	t.ok(client.profile);
	t.equal(client.profile.endpoint, vbbProfile.endpoint);
	t.end();
});
