const addSSL = (url: string) => {
  if (url.endsWith("?ssl=true")) return url;
  return `${url}?ssl=true`;
};

export const config = {
  secret: process.env.USER_AUTH_SECRET,
  isLocal: process.env.IS_LOCAL,
  testDb: addSSL(process.env.TEST_DB),
  prodDb: addSSL(process.env.HEROKU_POSTGRESQL_WHITE_URL),
};
