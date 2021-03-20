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
jq -r --tab "$query" <"$src/de/db-hafas-mgate.json" >../p/db/base.json
