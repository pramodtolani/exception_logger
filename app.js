var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var httpStatus = require("http-status");

const utils = require("./utils/helpers");
const { errorConverter, errorHandler } = require("./middleware/error");
const ApiError = require("./utils/ApiError");

var indexRouter = require("./routes/index");

var CustomLog = require("./library/custom_log.library");

var app = express();

app.use(logger("dev"));

app.use(
  express.urlencoded({ parameterLimit: 100000, limit: "50mb", extended: true })
);
app.use(express.json({ limit: "50mb" }));
// app.use(express.text({ type: 'text/plain', limit: '50mb' }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  req.log_data = [];

  next();
});

app.use("/test", (req, res) => {
  CustomLog.log(req, "label 1", "test 1");
  throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
});

app.use("/", indexRouter);

// const test = (req, res, next) => {
//   CustomLog.log(req, "test");
//   CustomLog.log(req, "test 1");

//   next();
// }

// app.use(test);

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
