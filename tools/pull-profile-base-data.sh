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
