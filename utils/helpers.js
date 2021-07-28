const Log = require('../models/logs.model');

const logResponse = async ({ req, data, message, status, statusCode = 200 }) => {
  var startTime = +req._startTime;
  var endTime = +new Date();

  var ip =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);

  var objLog = new Log({
    uri: req.originalUrl,
    headers: req.headers,
    method: req.method,
    params: req.body,
    ip_address: ip,
    start_time: startTime,
    end_time: endTime,
    rtime: endTime - startTime,
    status: statusCode,
    response: { data, message, code: statusCode, status },
  });

  await objLog.save();
};

module.exports = {
  logResponse,
};
