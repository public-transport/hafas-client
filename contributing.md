# Contributing

Thanks for helping! 🙏

## Adding integration/end-to-end tests

The [end-to-end/system tests](https://en.wikipedia.org/wiki/System_testing) in [`test/e2e`](test/e2e), executing via `npm run test-e2e`, are querying real HAFAS endpoints, expecting valid & *reasonable* responses.

The [integration tests](https://en.wikipedia.org/wiki/Integration_testing) (`npm run test-integration`) are the same `test/e2e` tests, running against *mocked* HAFAS responses from [`test/e2e/fixtures`](test/e2e/fixtures).

1. Add a new end-to-end test that tests your feature/bugfix.
2. Make sure the test passes. You can run your test exclusively using `test.only`.
3. Record the HAFAS responses as [fixtures](https://en.wikipedia.org/wiki/Test_fixture) using `npm run test-integration:record`.
4. Make sure the passes against *only* mocked responses using `npm run test-integration`.
