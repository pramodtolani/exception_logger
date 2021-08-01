const util = require("util");
class CustomLog {
  req;
  res;
  originalLogger;

  constructor(req, res, originalLogger) {
    this.req = req;
    this.res = res;
    this.originalLogger = originalLogger;
  }

  log = (...data) => {
    let logData =
      data
        .map((a) => {
          if (typeof a === "object") {
            return util.inspect(a, { compact: false, depth: 5 });
          }
          return a;
        })
        .join(" ") + "\n";
    this.req.log_data += logData;

    this.originalLogger.apply(this, data);
  };
}

module.exports = CustomLog;
