# automated tests in `hafas-client`

Because transit data is inherently dynamic (e.g. a different set of departures being returned for a stop now than in 10 minutes), and because it is of paramount importance that `hafas-client` actually works with HAFAS endpoints *as they currently work*, its testing setup is a bit unusual.

`hafas-client` has three kinds of automated tests:
- unit tests, which test individual aspects of the case base in isolation (e.g. the parsing of HAFAS-formatted dates & times) – run via `npm run test-unit`
- end-to-end (E2E) tests, which run actual HTTP requests against their respective profile's HAFAS endpoint – run via `npm run test-e2e`
- integration tests, which are the E2E tests running against pre-recorded (and checked-in) HTTP request fixtures – run via `npm run test-integration`

Because the E2E & integration tests are based on the same code, when changing this code, you should also update the integration test fixtures accordingly.

*Note:* In order to be as reproducible as possible, the tests query transit data for a certain *fixed* point in time on the future, hard-coded in each profile's test suite (a.k.a. each file `test/e2e/*.js`). In combination with the recording & mocking of HTTP requests, this effectively makes the integration tests deterministic.

## adding integration test fixtures

As an example, let's assume that we have added an entirely new test to [the *DB* profile's E2E tests](../test/e2e/db.js).

The behaviour of the HTTP request recording (into fixtures) and mocking (using the recorded fixtures) is controlled via an environment variable `$VCR_MODE`:
- By running the test(s) with `VCR_MODE=record`, we can record the HTTP requests being made. The tests will run just like without `$VCR_MODE`, except that they will query data for date+time specified in `T_MOCK` (e.g. [here](https://github.com/public-transport/hafas-client/blob/8ff945c07515155380de0acb33584e474d6d547c/test/e2e/db.js#L33)).
- Then, by running the test(s) with `VCR_MODE=playback`, because their HTTP requests match the pre-recorded fixtures, they work on the corresponding mocked HTTP responses.

Usually, you would not want to update all *already existing* recorded HTTP request fixtures of the test suite you have made changes in, as they are unrelated to the test you have added. To only record your *added* test, temporarily change `tap.test(…)` to read `tap.only(…)`, and run with `TAP_ONLY=1 VCR_MODE=record`; This will skip all unrelated tests entirely.

Then, check the augmented fixtures (in `test/e2e/fixtures`) into Git, and revert the `tap.only(…)` change. To make sure that everything works, run the entire test suite/file (*without `TAP_ONLY=1`*) with `VCR_MODE=playback`.

*Note:* It might be that the test suite/file you want to augment hasn't been updated in a while, so that `T_MOCK` is in the past. In this case, recording additional fixtures from actual HTTP requests of your added test is usually not possible because the HAFAS API is unable to serve old transit data. In this case, you will first have to change `T_MOCK` to a future date+time (a weekday as "normal" as possible) and re-record all tests' HTTP requests; Don't hesitate to get in touch with me if you have trouble with this.
