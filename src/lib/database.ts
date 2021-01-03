import { config } from "../config";
import pgPromise from "pg-promise";
import monitor from "pg-monitor";

const pgpOptions = {};
const pgp = pgPromise(pgpOptions);

monitor.attach(pgpOptions);

export const connectionString = config.isLocal ? config.testDb : config.prodDb;

export const db = pgp(connectionString);
