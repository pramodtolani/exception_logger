const CustomLogs = function () {
	this.log = (req, label, ...data) => {
		if ("headers" in req) {
      req.log_data.push(formatLogData(label, data));
      console.log(data);
		}
	};

	this.info = (req, logData, label, ...data) => {
		if ("headers" in req) {
      req.log_data.push(formatLogData(label, data));
      console.info(data);
		}
	};

	this.error = (req, logData, label, ...data) => {
		if ("headers" in req) {
      req.log_data.push(formatLogData(label, data));
      console.error(data);
		}
	};

	this.warn = (req, logData, label, ...data) => {
		if ("headers" in req) {
      req.log_data.push(formatLogData(label, data));
      console.warn(data);
		}
	};
};

const formatLogData = (label, logData = []) => {
  if (typeof logData === "object") {
    logData = JSON.stringify(logData);
  }
  
  return label + " => " + logData;
}

module.exports = new CustomLogs();
