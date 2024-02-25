// Polly's HTTP adapter uses nock [1] underneath, with currenctly monkey-patches the built-in `node:http` module. For this to work, it must be imported quite early, before many other parts of hafas-client.
// Importing the adapter itself has no side effects (or rather: immediately undoes nock's monkey-patching, to re-patch when it is actually getting used). We activate it (by passing it into Polly's core) below.
// remotely related: https://github.com/nock/nock/issues/2461
import NodeHttpAdapter from '@pollyjs/adapter-node-http';

import isRoughlyEqual from 'is-roughly-equal';
import {ok, AssertionError} from 'assert';
import {DateTime} from 'luxon';
import * as a from 'assert';
import {createRequire} from 'module';
// Note: We *must* import tap up here, not just in the if(VCR_MODE) block below, because a) we can only use `require()` conditionally, not `import`; and b) requiring it below makes the teardown script behave differently.
// may be related: https://github.com/tapjs/tapjs/issues/1005
import tap from 'tap';
import {gunzipSync} from 'zlib';

const hour = 60 * 60 * 1000;
const day = 24 * hour;
const week = 7 * day;

// next Monday 10 am
const createWhen = (timezone, locale, tMock) => {
	ok(Number.isInteger(tMock), 'tMock must be an integer');

	const t = process.env.VCR_MODE && !process.env.VCR_OFF
		? tMock
		: Date.now();
	return DateTime.fromMillis(t, {
		zone: timezone,
		locale,
	})
		.startOf('week')
		.plus({weeks: 1, hours: 10})
		.toJSDate();
};

const assertValidWhen = (actual, expected, name, delta = day + 6 * hour) => {
	const ts = Number(new Date(actual));
	a.ok(!Number.isNaN(ts), name + ' is not parsable by Date');
	// the timestamps might be from long-distance trains
	if (!isRoughlyEqual(delta, Number(expected), ts)) {
		throw new AssertionError({
			message: name + ' is out of range',
			actual: ts,
			expected: `${expected - delta} - ${Number(expected) + delta}`,
			operator: 'isRoughlyEqual',
		});
	}
};

// HTTP request mocking
if (process.env.VCR_MODE && !process.env.VCR_OFF) {
	const require = createRequire(import.meta.url);

	const {Polly} = require('@pollyjs/core');
	const NodeHttpAdapter = require('@pollyjs/adapter-node-http');
	const FSPersister = require('@pollyjs/persister-fs');

	// monkey-patch NodeHttpAdapter to handle gzipped responses properly
	// todo: submit a PR
	// related: https://github.com/Netflix/pollyjs/issues/256
	// related: https://github.com/Netflix/pollyjs/issues/463
	// related: https://github.com/Netflix/pollyjs/issues/207
	const _getBodyFromChunks = NodeHttpAdapter.prototype.getBodyFromChunks;
	NodeHttpAdapter.prototype.getBodyFromChunks = function getBodyFromChunksWithGunzip (chunks, headers) {
		if (headers['content-encoding'] === 'gzip') {
			const concatenated = Buffer.concat(chunks);
			chunks = [gunzipSync(concatenated)];
			// todo: this is ugly, find a better way
			delete headers['content-encoding'];
			headers['content-length'] = chunks[0].length;
		}
		return _getBodyFromChunks.call(this, chunks, headers);
	};

	Polly.register(NodeHttpAdapter);
	Polly.register(FSPersister);

	// https://github.com/Netflix/pollyjs/blob/9b6bede12b7ee998472b8883c9dd01e2159e00a8/packages/%40pollyjs/adapter/src/index.js#L184-L189
	if ('navigator' in global && global.navigator && !('onLine' in global.navigator)) {
		global.navigator.onLine = true;
	}

	let mode;
	if (process.env.VCR_MODE === 'record') {
		mode = 'record';
	} else if (process.env.VCR_MODE === 'playback') {
		mode = 'replay';
	} else {
		throw new Error('invalid $VCR_MODE, must be "record" or "replay"');
	}

	const polly = new Polly('requests', {
		logLevel: 'warn',
		// If a request's recording is not found, pass-through to the server and record the response.
		recordIfMissing: false,
		// If false, Polly will throw when attempting to persist any failed requests. A request is considered to be a failed request when its response's status code is ≥ 400.
		recordFailedRequests: true,
		// Await any unresolved requests handled by the polly instance (via flush) when stop is called.
		flushRequestsOnStop: true,
		// The Polly mode. Can be one of the following:
		// - replay: Replay responses from recordings.
		// - record: Force Polly to record all requests. This will overwrite recordings that already exist.
		// - passthrough: Passes all requests through directly to the server without recording or replaying.
		mode,
		adapters: ['node-http'],
		persister: 'fs',
		persisterOptions: {
			fs: {
				recordingsDir: new URL('../fixtures', import.meta.url).pathname,
			},
			// When disabled, requests that have not been captured by the running Polly instance will be removed from any previous recording. This ensures that a recording will only contain the requests that were made during the lifespan of the Polly instance. When enabled, new requests will be appended to the recording file.
			keepUnusedRequests: true, // todo: change to false?
		},
		matchRequestsBy: {
			order: false, // todo: set to true for better Git diffs?
			headers: {
				// todo: use an allow-list here?
				exclude: [
					// request
					'user-agent', // randomised
					'connection', // not relevant for tests
					// response
					'set-cookie', // often randomised
					'date', // constantly changing
				],
			},
		},
	});

	tap.teardown(async () => {
		await polly.stop();
	});
}

export {
	hour, createWhen, assertValidWhen,
};
