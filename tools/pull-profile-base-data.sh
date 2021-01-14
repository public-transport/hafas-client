#!/bin/sh

set -e
cd $(realpath $(dirname $0))

src="transport-apis/data"

query="{\
auth: {
	type: \"AID\",
	aid: .options.auth.aid?, \
}, \
salt: .options.checksumSalt, \
client: {
	type: .options.client.type?, \
	id: .options.client.id?, \
	v: .options.client.v?, \
	name: .options.client.name?, \
}, \
endpoint: .options.endpoint, \
ext: .options.ext, \
ver: .options.version, \
}"

