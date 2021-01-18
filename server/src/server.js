/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import morgan from "morgan";
import methodOverride from "method-override";
import mongoose from "mongoose";
import http from "http";
import cookieParser from "cookie-parser";

import { MONGO_URL, PORT, NODE_ENV } from "./config";
import routes from "./routes";

const app = express();
const server = http.createServer(app);
const isProduction = NODE_ENV === "production";

app.use(cors({ credentials: true }));
app.use((req, res, next) => {
  // res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Normal express config defaults
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(routes);

if (!isProduction) {
  app.use((err, req, res, _next) => {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.msg,
        error: err,
      },
    });
  });
  if (process.env.SHOW_ROUTES) {
    const listEndpoints = require("express-list-endpoints");
    console.log(listEndpoints(app));
  }
} else {
  app.use((err, req, res, _next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.msg,
        error: {},
      },
    });
  });
}

if (!MONGO_URL) {
  console.error("Missing MONGO_URL!!!");
  process.exit(1);
}

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.set("useFindAndModify", false);
const db = mongoose.connection;

db.on("error", (error) => {
  console.error(error);
});

db.once("open", () => {
  console.log("MongoDB connected!");
  server.listen(PORT, () =>
    console.log(`App is listening on port ${server.address().port}!`)
  );
});
