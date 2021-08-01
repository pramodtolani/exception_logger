const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const httpStatus = require("http-status");

const utils = require("./utils/helpers");
const ApiError = require("./utils/ApiError");

const { errorConverter, errorHandler } = require("./middleware/error");

const indexRouter = require("./routes/index");

const Log = require("./library/custom_log.library");

const app = express();

app.use(logger("dev"));

app.use(
  express.urlencoded({ parameterLimit: 100000, limit: "50mb", extended: true })
);
app.use(express.json({ limit: "50mb" }));
// app.use(express.text({ type: 'text/plain', limit: '50mb' }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

/**
 * Enable custom log
 */
app.use((req, res, next) => {
  req.log_data = "";

  let originalLogger = console.log;

  let objCustomLog = new Log(req, res, originalLogger);

  console.log = objCustomLog.log;

  console.log("asdasda", "Asdasdsad", {test: 1, a: {test: 2}}, new Set(["a", "b"]));

  next();
});

app.use("/", indexRouter);

app.use("/test", (req, res) => {
  console.log("label 1", "test 1");
  throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

/**
 *
 * @param {httpStatus} code
 * @param {Boolean} status
 * @param {String} message
 * @param {Object} data
 */
app.response.sendJSONResponse = function ({
  code,
  status = true,
  message,
  data,
}) {
  utils.logResponse({ req: this.req, data, message, status, statusCode: code });
  return this.status(code).json({ code, status, message, data });
};

module.exports = app;
