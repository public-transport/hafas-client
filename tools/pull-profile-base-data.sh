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
	ver: p(_, 'options.ver', p(_, 'options.version')), \
	defaultLanguage: _.supportedLanguages && _.supportedLanguages[0] || undefined, \
	}, null, '\\t')
)(
	require('lodash/get'),
	JSON.parse(require('fs').readFileSync(process.argv[1], {encoding: 'utf8'})),
)"

node -p "$query" "$src/de/avv-hafas-mgate.json" >../p/avv/base.json
node -p "$query" "$src/us/bart-hafas-mgate.json" >../p/bart/base.json
node -p "$query" "$src/de/bvg-hafas-mgate.json" >../p/bvg/base.json
node -p "$query" "$src/lu/cfl-hafas-mgate.json" >../p/cfl/base.json
node -p "$query" "$src/us/cmta-hafas-mgate.json" >../p/cmta/base.json
node -p "$query" "$src/de/db-hafas-mgate.json" >../p/db/base.json
node -p "$query" "$src/de/db-streckenagent-hafas-mgate.json" >../p/db-streckenagent/base.json
node -p "$query" "$src/de/db-busradar-nrw-hafas-mgate.json" >../p/db-busradar-nrw/base.json
node -p "$query" "$src/de/nasa-hafas-mgate.json" >../p/insa/base.json
node -p "$query" "$src/de/invg-hafas-mgate.json" >../p/invg/base.json
node -p "$query" "$src/ie/iarnrod-eireann-hafas-mgate.json" >../p/irish-rail/base.json
node -p "$query" "$src/de/mobil-nrw-hafas-mgate.json" >../p/mobil-nrw/base.json
node -p "$query" "$src/lu/mobiliteit-lu-hafas-mgate.json" >../p/mobiliteit-lu/base.json
node -p "$query" "$src/de/nahsh-hafas-mgate.json" >../p/nahsh/base.json
node -p "$query" "$src/de/nvv-hafas-mgate.json" >../p/nvv/base.json
node -p "$query" "$src/at/oebb-hafas-mgate.json" >../p/oebb/base.json
node -p "$query" "$src/pl/pkp-hafas-mgate.json" >../p/pkp/base.json
node -p "$query" "$src/dk/rejseplanen-hafas-mgate.json" >../p/rejseplanen/base.json
node -p "$query" "$src/de/rmv-hafas-mgate.json" >../p/rmv/base.json
node -p "$query" "$src/de/rsag-hafas-mgate.json" >../p/rsag/base.json
node -p "$query" "$src/de/saarvv-hafas-mgate.json" >../p/saarfahrplan/base.json
node -p "$query" "$src/de/db-sbahn-muenchen-hafas-mgate.json" >../p/sbahn-muenchen/base.json
node -p "$query" "$src/be/nmbs-sncb-hafas-mgate.json" >../p/sncb/base.json
node -p "$query" "$src/at/svv-hafas-mgate.json" >../p/svv/base.json
node -p "$query" "$src/de/vbb-hafas-mgate.json" >../p/vbb/base.json
node -p "$query" "$src/de/vbn-hafas-mgate.json" >../p/vbn/base.json
node -p "$query" "$src/at/vkg-hafas-mgate.json" >../p/vkg/base.json
node -p "$query" "$src/de/vmt-hafas-mgate.json" >../p/vmt/base.json
node -p "$query" "$src/de/vos-hafas-mgate.json" >../p/vos/base.json
node -p "$query" "$src/de/vrn-hafas-mgate.json" >../p/vrn/base.json
node -p "$query" "$src/de/vsn-hafas-mgate.json" >../p/vsn/base.json
node -p "$query" "$src/at/ivb-hafas-mgate.json" >../p/ivb/base.json
node -p "$query" "$src/at/ooevv-hafas-mgate.json" >../p/ooevv/base.json
node -p "$query" "$src/at/salzburg-hafas-mgate.json" >../p/salzburg/base.json
node -p "$query" "$src/at/stv-hafas-mgate.json" >../p/stv/base.json
node -p "$query" "$src/at/vor-hafas-mgate.json" >../p/vor/base.json
node -p "$query" "$src/at/vvt-hafas-mgate.json" >../p/vvt/base.json
node -p "$query" "$src/at/vvv-hafas-mgate.json" >../p/vvv/base.json
node -p "$query" "$src/ch/bls-hafas-mgate.json" >../p/bls/base.json
node -p "$query" "$src/ch/tpg-hafas-mgate.json" >../p/tpg/base.json
node -p "$query" "$src/ch/zvv-hafas-mgate.json" >../p/zvv/base.json
node -p "$query" "$src/us/dart-hafas-mgate.json" >../p/dart/base.json
node -p "$query" "$src/de/kvb-hafas-mgate.json" >../p/kvb/base.json
