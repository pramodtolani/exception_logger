const sha256 = require("sha256");
const mongoose = require("mongoose");
const httpStatus = require("http-status");

const ApiError = require("../utils/ApiError");

const ExceptionsModal = require("../models/exceptions.model");

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...{ stack: err.stack },
  };

  if (err.message && err.stack) {
    saveExceptionData({ req, statusCode, stack: err.stack });
  }

  res.sendJSONResponse({
    code: statusCode,
    status: true,
    message,
    data: response,
  });
};

const saveExceptionData = async ({ req, stack, statusCode }) => {
  let startTime = req._startTime;
  let endTime = new Date();
  let responseTime = (+endTime - +startTime) / 100;
  let ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);

  let exceptionHash = sha256(
    req.method + req.originalUrl + JSON.stringify(req.body) + stack
  );

  let logData = req.log_data || [];

  let objException = await ExceptionsModal.findOne({
    hash: exceptionHash,
  });

  if (objException) {
    objException.count = objException.count + 1;
    if (objException.resolved === ExceptionsModal.RESOLVED) {
      objException.reopened_at.push(new Date());
      objException.resolved = ExceptionsModal.PENDING;
    }
    objException.response_payload = req.body || {};
    objException.response_time = responseTime;

    if (logData.length) {
      objException.log_data.push({
        date: new Date(),
        log: logData,
      });
    }

    await objException.save();
  } else {
    let exceptionData = {
      url: req.originalUrl,
      method: req.method,
      code: statusCode,
      headers: req.headers,
      response_time: responseTime,
      response_payload: req.body || {},
      error_type: ExceptionsModal.ERROR,
      ip_address: ip,
      start_time: startTime,
      end_time: endTime,
      count: 1,
      hash: exceptionHash,
      exception_message: stack,
    };

    if (logData.length) {
      exceptionData.log_data = [
        {
          date: new Date(),
          log: logData,
        },
      ];
    }

    await new ExceptionsModal(exceptionData).save();
  }
};

module.exports = {
  errorConverter,
  errorHandler,
};
