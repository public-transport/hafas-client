# vbb-short-station-name

**Removes stuff like " (Berlin)" from station names.** Shortens "strasse" to "str.".

- `S+U Foobar Bhf` -> `S+U Foobar`
- `S+U Foo Bar (Berlin)` -> `S+U Foo Bar`
- `S Foo-Straße` -> `S Foo-Str.`
- `S Foostrasse` -> `S Foostr.`

[![npm version](https://img.shields.io/npm/v/vbb-short-station-name.svg)](https://www.npmjs.com/package/vbb-short-station-name)
[![build status](https://img.shields.io/travis/derhuerst/vbb-short-station-name.svg)](https://travis-ci.org/derhuerst/vbb-short-station-name)
[![dependency status](https://img.shields.io/david/derhuerst/vbb-short-station-name.svg)](https://david-dm.org/derhuerst/vbb-short-station-name)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/vbb-short-station-name.svg)](https://david-dm.org/derhuerst/vbb-short-station-name#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/vbb-short-station-name.svg)
[![gitter channel](https://badges.gitter.im/derhuerst/vbb-rest.svg)](https://gitter.im/derhuerst/vbb-rest)


## Installing

```shell
npm install vbb-short-station-name
```


## Usage

```js
const shorten = require('vbb-short-station-name')
shorten('S Südkreuz Bhf (Berlin)') // -> 'S Südkreuz'
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/vbb-short-station-name/issues).
