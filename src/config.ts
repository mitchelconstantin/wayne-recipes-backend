export const config = {
  secret: process.env.USER_AUTH_SECRET,
  isLocal: process.env.IS_LOCAL,
  testDb: process.env.TEST_DB,
  prodDb: process.env.HEROKU_POSTGRESQL_WHITE_URL,
};
