# hafas-client

**A client for the "mobile APIs" of [HAFAS](https://de.wikipedia.org/wiki/HAFAS) public transport management systems**.

[![crates.io version](https://img.shields.io/crates/v/todo_name_lib.svg)](https://crates.io/crates/todo_name_lib)
[![docs.rs version](https://docs.rs/hafas_client/badge.svg)](https://docs.rs/hafas_client)]
[![build status](https://img.shields.io/travis/public-transport/hafas-client.svg?branch=5)](https://travis-ci.org/public-transport/hafas-client)
![ISC-licensed](https://img.shields.io/github/license/public-transport/hafas-client.svg)
[![chat on gitter](https://badges.gitter.im/public-transport/Lobby.svg)](https://gitter.im/public-transport/Lobby)
[![support Jannis via GitHub Sponsors](https://img.shields.io/badge/support%20Jannis-donate-fa7664.svg)](https://github.com/sponsors/derhuerst)


## Background

[A company called HaCon](https://hacon.de) sells [a public transport management system called HAFAS](https://de.wikipedia.org/wiki/HAFAS). It is [used by public transport providers across Europe](https://gist.github.com/derhuerst/2b7ed83bfa5f115125a5) to provide routing and departure information to their customers.

Most customers get their own, **separate HAFAS deployments**; They all use the same terminology and API calls, but have slightly different versions, configurations and sets of enabled features. Using [endpoint-specific customisations that we call *profiles*](p), **`hafas-client` abstracts most of these differences away, and supports additional features in some cases**. Check the [*supported networks/endpoints* list](#supported-networksendpoints) for more info.

*Note:* Currently, **`hafas-client` only supports "mobile API" endpoints**, which are designed for and used by the respective official mobile app(s); These endpoints almost always have `mgate.exe` in the URL. This library *does not* support "open API" endpoints (often they have `rest-proxy` or `openapi` in the URL) yet, but [#134](https://github.com/public-transport/hafas-client/pull/134) contains work in progress.

Strictly speaking, permission is necessary to use `hafas-client` with a HAFAS "mobile" endpoint. It merely tries to remove the *technical* barrier of accessing the data, in order to kick-start an ecosystem or apps and services that would eventually rely on [*openly available* data](https://opendatahandbook.org/solutions/en/Public-Transport-Data/).


## Installing

```toml
[dependencies]
hafas_client = "6.0.0"
```


## Usage

todo


## API

todo


## supported networks/endpoints

todo


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/public-transport/hafas-client/issues).

This project needs help! Check the [list of "help wanted" Issues](https://github.com/public-transport/hafas-client/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22).

If you're contributing code, please read the [contribution guidelines](contributing.md).
