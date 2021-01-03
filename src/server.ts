import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { connectionString } from "./lib/database";
import { router } from "./api";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

/*
 * Log failed requests to stderr
 */
app.use(
  morgan("tiny", {
    skip: (req, res) => res.statusCode < 400,
    stream: process.stderr,
  })
);

/*
 * Log successful requests to stderr
 */
app.use(
  morgan("tiny", {
    skip: (req, res) => res.statusCode >= 400,
    stream: process.stdout,
  })
);

/*
 * Ignore HTTP'ed requests if running in Heroku. Use HTTPS only.
 */
if (process.env.DYNO) {
  app.enable("trust proxy");
  app.use((req, res, next) => {
    if (!req.secure) {
      if (req.path === "/") {
        res.redirect(301, `https://${req.host}/`);
      } else {
        res.status(400).end("Please switch to HTTPS.");
      }
    } else {
      return next();
    }
  });
}

/*
 * Hook up all apis defined in /api
 */
app.use(router);

/*
 * Migrate database before listening for requests
 */
const postgrator = require("postgrator");

postgrator.setConfig({
  migrationDirectory: "./postgrator",
  driver: "pg",
  connectionString,
});

postgrator.migrate("max", (err, migrations) => {
  if (err) {
    console.error("Database migration failed!");
    console.error(err);
    process.exit(1);
  }

  postgrator.endConnection(() => {
    console.log("Database migrated successfully.");

    /*
     * Database has been migrated, all is good to go!
     */
    const port = process.env.PORT || 4000;

    app.listen(port, () => {
      console.log(`Server listening at ${port}`);
    });
  });
});
