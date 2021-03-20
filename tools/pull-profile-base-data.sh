#!/bin/sh

set -e
cd $(realpath $(dirname $0))

src="transport-apis/data"

query="{\
auth: {
	type: \"AID\",
	aid: .options.auth.aid?, \
}, \
salt: (.options.checksumSalt // .options.micMacSalt), \
client: .options.client, \
endpoint: .options.endpoint, \
ext: .options.ext, \
ver: .options.ver, \
}"

jq -r --tab "$query" <"$src/de/avv-hafas-mgate.json" >../p/avv/base.json
jq -r --tab "$query" <"$src/us/bart-hafas-mgate.json" >../p/bart/base.json
jq -r --tab "$query" <"$src/de/bvg-hafas-mgate.json" >../p/bvg/base.json
jq -r --tab "$query" <"$src/lu/cfl-hafas-mgate.json" >../p/cfl/base.json
jq -r --tab "$query" <"$src/us/cmta-hafas-mgate.json" >../p/cmta/base.json
jq -r --tab "$query" <"$src/de/db-hafas-mgate.json" >../p/db/base.json
jq -r --tab "$query" <"$src/de/db-busradar-nrw-hafas-mgate.json" >../p/db-busradar-nrw/base.json
jq -r --tab "$query" <"$src/de/hvv-hafas-mgate.json" >../p/hvv/base.json
jq -r --tab "$query" <"$src/de/nasa-hafas-mgate.json" >../p/insa/base.json
jq -r --tab "$query" <"$src/de/invg-hafas-mgate.json" >../p/invg/base.json
jq -r --tab "$query" <"$src/ie/iarnrod-eireann-hafas-mgate.json" >../p/irish-rail/base.json
jq -r --tab "$query" <"$src/de/mobil-nrw-hafas-mgate.json" >../p/mobil-nrw/base.json
jq -r --tab "$query" <"$src/lu/mobiliteit-lu-hafas-mgate.json" >../p/mobiliteit-lu/base.json
jq -r --tab "$query" <"$src/de/nahsh-hafas-mgate.json" >../p/nahsh/base.json
jq -r --tab "$query" <"$src/de/nvv-hafas-mgate.json" >../p/nvv/base.json
jq -r --tab "$query" <"$src/at/oebb-hafas-mgate.json" >../p/oebb/base.json
jq -r --tab "$query" <"$src/pl/pkp-hafas-mgate.json" >../p/pkp/base.json
jq -r --tab "$query" <"$src/dk/rejseplanen-hafas-mgate.json" >../p/rejseplanen/base.json
jq -r --tab "$query" <"$src/de/rmv-hafas-mgate.json" >../p/rmv/base.json
jq -r --tab "$query" <"$src/de/rsag-hafas-mgate.json" >../p/rsag/base.json
jq -r --tab "$query" <"$src/de/saarvv-hafas-mgate.json" >../p/saarfahrplan/base.json
jq -r --tab "$query" <"$src/de/db-sbahn-muenchen-hafas-mgate.json" >../p/sbahn-muenchen/base.json
jq -r --tab "$query" <"$src/ch/sbb-cff-ffs-hafas-mgate.json" >../p/sbb/base.json
jq -r --tab "$query" <"$src/be/nmbs-sncb-hafas-mgate.json" >../p/sncb/base.json
jq -r --tab "$query" <"$src/at/svv-hafas-mgate.json" >../p/svv/base.json
jq -r --tab "$query" <"$src/de/vbb-hafas-mgate.json" >../p/vbb/base.json
jq -r --tab "$query" <"$src/de/vbn-hafas-mgate.json" >../p/vbn/base.json
jq -r --tab "$query" <"$src/at/vkg-hafas-mgate.json" >../p/vkg/base.json
jq -r --tab "$query" <"$src/de/vmt-hafas-mgate.json" >../p/vmt/base.json
jq -r --tab "$query" <"$src/de/vos-hafas-mgate.json" >../p/vos/base.json
jq -r --tab "$query" <"$src/de/vrn-hafas-mgate.json" >../p/vrn/base.json
