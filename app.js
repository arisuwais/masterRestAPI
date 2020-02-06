/* eslint-disable prettier/prettier */
global.express = require("express");
global.env = require("dotenv").config();
global.Helpers = require("./src/helpers/common");

const cors = require("cors");
const steed = require("steed");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = global.express();

// Iterate over all elements of the given array asynchronosly and in parallel
function parallelMiddleware(middleware) {
  // eslint-disable-next-line func-names
  return function(req, res, next) {
    return steed.each(middleware, (mw, cb) => mw(req, res, cb), next);
  };
}

app.options("*", cors());
app.use(cors());
app.use(morgan("dev"));

app.use(
  parallelMiddleware([
    bodyParser.json({ limit: "20mb" }),
    bodyParser.urlencoded({
      extended: true,
      limit: "20mb",
      parameterLimit: 20000
    })
  ])
);

// Register the route
require("./src/routes")(app);

// Connection String
require("./src/config/db");

// Up and Running at Port 4000
app.listen(
  process.env.PORT,
  // eslint-disable-next-line no-console
  console.log.bind(
    console,
    `\n✔ A GraphQL API running at port ${process.env.PORT}`
  )
);

module.exports.handler = app;
