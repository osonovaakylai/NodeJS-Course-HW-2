import testHelpers from './src/tests/helpers/utils'

beforeEach(async () => {
  await testHelpers.cleanDatabase();
});