const pgpOptions = {};

const pgp = require("pg-promise")(pgpOptions);
const monitor = require("pg-monitor");

monitor.attach(pgpOptions);

const connectionString = process.env.IS_LOCAL
  ? process.env.TEST_DB
  : process.env.HEROKU_POSTGRESQL_WHITE_URL;

const db = pgp(connectionString);

module.exports = { db, connectionString };
