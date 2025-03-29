#!/bin/bash

set -e
cd $(realpath $(dirname $0))

src="transport-apis/data"

query="(\
	(p, _) => 'export default ' + util.inspect(JSON.parse(JSON.stringify({\
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
	})), {
		depth: null,
		// maxArrayLength: 0,
		// maxStringLength: 0,
		breakLength: Infinity,
		compact: false,
	}) + ';'
)(
	require('lodash/get'),
	JSON.parse(require('fs').readFileSync(process.argv[1], {encoding: 'utf8'})),
)"

generate_profile_base_data() {
  local input_file="$1"
  local output_file="$2"
  node -p "$query" "$input_file" > "$output_file"
  eslint --fix "$output_file"
}

# Generate ESM files for each transport-apis JSON file
generate_profile_base_data "$src/de/avv-hafas-mgate.json" "../p/avv/base.js"
generate_profile_base_data "$src/us/bart-hafas-mgate.json" "../p/bart/base.js"
generate_profile_base_data "$src/de/bvg-hafas-mgate.json" "../p/bvg/base.js"
generate_profile_base_data "$src/lu/cfl-hafas-mgate.json" "../p/cfl/base.js"
generate_profile_base_data "$src/us/cmta-hafas-mgate.json" "../p/cmta/base.js"
generate_profile_base_data "$src/de/db-hafas-mgate.json" "../p/db/base.js"
generate_profile_base_data "$src/de/db-busradar-nrw-hafas-mgate.json" "../p/db-busradar-nrw/base.js"
generate_profile_base_data "$src/de/nasa-hafas-mgate.json" "../p/insa/base.js"
generate_profile_base_data "$src/de/invg-hafas-mgate.json" "../p/invg/base.js"
generate_profile_base_data "$src/ie/iarnrod-eireann-hafas-mgate.json" "../p/irish-rail/base.js"
generate_profile_base_data "$src/de/mobil-nrw-hafas-mgate.json" "../p/mobil-nrw/base.js"
generate_profile_base_data "$src/lu/mobiliteit-lu-hafas-mgate.json" "../p/mobiliteit-lu/base.js"
generate_profile_base_data "$src/de/nahsh-hafas-mgate.json" "../p/nahsh/base.js"
generate_profile_base_data "$src/de/nvv-hafas-mgate.json" "../p/nvv/base.js"
generate_profile_base_data "$src/at/oebb-hafas-mgate.json" "../p/oebb/base.js"
generate_profile_base_data "$src/pl/pkp-hafas-mgate.json" "../p/pkp/base.js"
generate_profile_base_data "$src/dk/rejseplanen-hafas-mgate.json" "../p/rejseplanen/base.js"
generate_profile_base_data "$src/de/rmv-hafas-mgate.json" "../p/rmv/base.js"
generate_profile_base_data "$src/de/rsag-hafas-mgate.json" "../p/rsag/base.js"
generate_profile_base_data "$src/de/saarvv-hafas-mgate.json" "../p/saarfahrplan/base.js"
generate_profile_base_data "$src/de/db-sbahn-muenchen-hafas-mgate.json" "../p/sbahn-muenchen/base.js"
generate_profile_base_data "$src/be/nmbs-sncb-hafas-mgate.json" "../p/sncb/base.js"
generate_profile_base_data "$src/at/svv-hafas-mgate.json" "../p/svv/base.js"
generate_profile_base_data "$src/de/vbb-hafas-mgate.json" "../p/vbb/base.js"
generate_profile_base_data "$src/de/vbn-hafas-mgate.json" "../p/vbn/base.js"
generate_profile_base_data "$src/at/vkg-hafas-mgate.json" "../p/vkg/base.js"
generate_profile_base_data "$src/de/vmt-hafas-mgate.json" "../p/vmt/base.js"
generate_profile_base_data "$src/de/vos-hafas-mgate.json" "../p/vos/base.js"
generate_profile_base_data "$src/de/vrn-hafas-mgate.json" "../p/vrn/base.js"
generate_profile_base_data "$src/de/vsn-hafas-mgate.json" "../p/vsn/base.js"
generate_profile_base_data "$src/at/ivb-hafas-mgate.json" "../p/ivb/base.js"
generate_profile_base_data "$src/at/ooevv-hafas-mgate.json" "../p/ooevv/base.js"
generate_profile_base_data "$src/at/salzburg-hafas-mgate.json" "../p/salzburg/base.js"
generate_profile_base_data "$src/at/stv-hafas-mgate.json" "../p/stv/base.js"
generate_profile_base_data "$src/at/vor-hafas-mgate.json" "../p/vor/base.js"
generate_profile_base_data "$src/at/vvt-hafas-mgate.json" "../p/vvt/base.js"
generate_profile_base_data "$src/at/vvv-hafas-mgate.json" "../p/vvv/base.js"
generate_profile_base_data "$src/ch/bls-hafas-mgate.json" "../p/bls/base.js"
generate_profile_base_data "$src/ch/tpg-hafas-mgate.json" "../p/tpg/base.js"
generate_profile_base_data "$src/ch/zvv-hafas-mgate.json" "../p/zvv/base.js"
generate_profile_base_data "$src/us/dart-hafas-mgate.json" "../p/dart/base.js"
generate_profile_base_data "$src/de/kvb-hafas-mgate.json" "../p/kvb/base.js"
