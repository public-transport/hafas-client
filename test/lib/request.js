// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module';
const require = createRequire(import.meta.url);

import tap from 'tap';
import forEach from 'lodash/forEach.js';
import {
	checkIfResponseIsOk as checkIfResIsOk,
	request,
} from '../../lib/request.js';
import {
	INVALID_REQUEST,
	NOT_FOUND,
	HafasError,
	HafasInvalidRequestError,
	HafasNotFoundError,
} from '../../lib/errors.js';
import {formatTripReq} from '../../format/trip-req.js';

const resParameter = require('../fixtures/error-parameter.json');
const resNoMatch = require('../fixtures/error-no-match.json');
const resH9360 = require('../fixtures/error-h9360.json');
const resLocation = require('../fixtures/error-location.json');

const USER_AGENT = 'public-transport/hafas-client:test';

const secret = Symbol('secret');

tap.test('checkIfResponseIsOk properly throws HAFAS "H9360" errors', (t) => {
	try {
		checkIfResIsOk({
			body: resH9360,
			errProps: {secret},
		});
	} catch (err) {
		t.ok(err);

		t.ok(err instanceof HafasError);
		t.equal(err.isHafasError, true);
		t.equal(err.message.slice(0, 7), 'H9360: ');
		t.ok(err.message.length > 7);

		t.ok(err instanceof HafasInvalidRequestError);
		t.equal(err.isCausedByServer, false);
		t.equal(err.code, INVALID_REQUEST);
		t.equal(err.hafasCode, 'H9360');

		t.equal(err.hafasResponseId, resH9360.id);
		t.equal(err.hafasMessage, 'HAFAS Kernel: Date outside of the timetable period.');
		t.equal(err.hafasDescription, 'Fehler bei der Datumseingabe oder Datum außerhalb der Fahrplanperiode (01.05.2022 - 10.12.2022)');
		t.equal(err.secret, secret);

		t.end();
	}
});

tap.test('checkIfResponseIsOk properly throws HAFAS "LOCATION" errors', (t) => {
	try {
		checkIfResIsOk({
			body: resLocation,
			errProps: {secret},
		});
	} catch (err) {
		t.ok(err);

		t.ok(err instanceof HafasError);
		t.equal(err.isHafasError, true);
		t.equal(err.message.slice(0, 10), 'LOCATION: ');
		t.ok(err.message.length > 10);

		t.ok(err instanceof HafasNotFoundError);
		t.equal(err.isCausedByServer, false);
		t.equal(err.code, NOT_FOUND);
		t.equal(err.hafasCode, 'LOCATION');

		t.equal(err.hafasResponseId, resLocation.id);
		t.equal(err.hafasMessage, 'HCI Service: location missing or invalid');
		t.equal(err.hafasDescription, 'Während der Suche ist ein interner Fehler aufgetreten');
		t.equal(err.secret, secret);

		t.end();
	}
});

tap.test('checkIfResponseIsOk properly throws HAFAS "NO_MATCH" errors', (t) => {
	try {
		checkIfResIsOk({
			body: resNoMatch,
			errProps: {secret},
		});
	} catch (err) {
		t.ok(err);

		t.ok(err instanceof HafasError);
		t.equal(err.isHafasError, true);
		t.equal(err.message.slice(0, 10), 'NO_MATCH: ');
		t.ok(err.message.length > 10);

		t.ok(err instanceof HafasNotFoundError);
		t.equal(err.isCausedByServer, false);
		t.equal(err.code, NOT_FOUND);
		t.equal(err.hafasCode, 'NO_MATCH');

		t.equal(err.hafasResponseId, resNoMatch.id);
		t.equal(err.hafasMessage, 'Nothing found.');
		t.equal(err.hafasDescription, 'Während der Suche ist leider ein interner Fehler aufgetreten. Bitte wenden Sie sich an unsere Serviceauskunft unter Tel. 0421 596059.');
		t.equal(err.secret, secret);

		t.end();
	}
});

tap.test('checkIfResponseIsOk properly throws HAFAS "PARAMETER" errors', (t) => {
	try {
		checkIfResIsOk({
			body: resParameter,
			errProps: {secret},
		});
	} catch (err) {
		t.ok(err);

		t.ok(err instanceof HafasError);
		t.equal(err.isHafasError, true);
		t.equal(err.message.slice(0, 11), 'PARAMETER: ');
		t.ok(err.message.length > 11);

		t.ok(err instanceof HafasInvalidRequestError);
		t.equal(err.isCausedByServer, false);
		t.equal(err.code, INVALID_REQUEST);
		t.equal(err.hafasCode, 'PARAMETER');

		t.equal(err.hafasResponseId, resParameter.id);
		t.equal(err.hafasMessage, 'HCI Service: parameter invalid');
		t.equal(err.hafasDescription, 'Während der Suche ist ein interner Fehler aufgetreten');
		t.equal(err.secret, secret);

		t.end();
	}
});

tap.test('checkIfResponseIsOk properly parses an unknown HAFAS errors', (t) => {
	const body = {
		ver: '1.42',
		id: '1234567890',
		err: 'FOO',
		errTxt: 'random errTxt',
		errTxtOut: 'even more random errTxtOut',
		svcResL: [],
	};

	try {
		checkIfResIsOk({
			body,
			errProps: {secret},
		});
	} catch (err) {
		t.ok(err);

		t.ok(err instanceof HafasError);
		t.equal(err.isHafasError, true);
		t.equal(err.message, `${body.err}: ${body.errTxt}`);

		t.equal(err.isCausedByServer, false);
		t.equal(err.code, null);
		t.equal(err.hafasCode, body.err);

		t.equal(err.hafasResponseId, body.id);
		t.equal(err.hafasMessage, body.errTxt);
		t.equal(err.hafasDescription, body.errTxtOut);
		t.equal(err.secret, secret);

		t.end();
	}
});

const freeze = (val) => {
	if (
		'object' === typeof val
		&& val !== null
		&& !Array.isArray(val)
	) {
		Object.freeze(val);
	}
};
const ctx = {
	// random but unique
	opt: {
		language: 'ga',
	},
	profile: {
		endpoint: 'https://does.not.exist',
		client: {
			type: 'FOO',
			id: 'BAR',
			name: 'baZ',
		},
		auth: {
			type: 'AID',
			aid: 'some-auth-token',
		},
		ver: '1.23.4',

		timezone: 'Europe/Amsterdam',
		locale: 'de-LU',
		defaultLanguage: 'fr',

		transformReq: (_, req) => req,
	},
};
forEach(ctx, freeze);

tap.test('lib/request calls profile.transformReqBody & profile.transformReq properly', async (t) => {
	const customTransformReqBody = (ctx, reqBody) => {
		const p = 'transformReqBody call: ';
		t.same(ctx, customCtx, 'ctx should be the passed-in ctx');

		t.ok(reqBody, 'reqBody');
		t.equal(reqBody.client, ctx.profile.client, p + 'reqBody.client');
		t.equal(reqBody.ext, ctx.profile.ext, p + 'reqBody.ext');
		t.equal(reqBody.var, ctx.profile.var, p + 'reqBody.var');
		t.equal(reqBody.auth, ctx.profile.auth, p + 'reqBody.auth');
		t.equal(reqBody.lang, ctx.opt.language, p + 'reqBody.lang');

		// We test if lib/request.js handles returning a new object.
		return {
			...reqBody,
		};
	};

	const customTransformReq = (ctx, req) => {
		const p = 'transformReq call: ';
		t.same(ctx, customCtx, p + 'ctx should be the passed-in ctx');

		t.equal(typeof req.body, 'string', p + 'req.body');
		t.ok(req.body, p + 'req.body');

		// We test if lib/request.js handles returning a new object.
		return {
			...req,
			// From node-fetch, used by isomorphic-fetch:
			// > req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies). Signal is recommended instead.
			timeout: 100,
		};
	};

	const customCtx = {
		...ctx,
		profile: {
			...ctx.profile,
			transformReqBody: customTransformReqBody,
			transformReq: customTransformReq,
		},
	};
	const tripReq = formatTripReq(customCtx, 'unknown-trip-id');

	// todo: set 1s timeout
	await t.rejects(async () => {
		await request(customCtx, USER_AGENT, tripReq);
	});
	t.end();
});
