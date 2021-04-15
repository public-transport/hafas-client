#!/bin/sh

set -e
cd $(realpath $(dirname $0))

src="transport-apis/data"

query="(\
	(p, _) => JSON.stringify({\
	auth: {
		type: 'AID',
		aid: p(_, 'options.auth.aid'), \
	}, \
	salt: p(_, 'options.checksumSalt'), \
	client: {
		type: p(_, 'options.client.type'), \
		id: p(_, 'options.client.id'), \
		v: p(_, 'options.client.v'), \
		name: p(_, 'options.client.name'), \
	}, \
	endpoint: p(_, 'options.endpoint'), \
	ext: p(_, 'options.ext'), \
	ver: p(_, 'options.ver'), \
	}, null, '\\t')
)(
	require('lodash/get'),
	JSON.parse(require('fs').readFileSync(process.argv[1], {encoding: 'utf8'})),
)"

jq -r --tab "$query" <"$src/de/db-hafas-mgate.json" >../p/db/base.json
