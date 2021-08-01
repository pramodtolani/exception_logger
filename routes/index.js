var express = require("express");
var router = express.Router();
var httpStatus = require("http-status");

var exceptionModel = require("../models/exceptions.model");


const ApiError = require("../utils/ApiError");
const catchAsync = require('../utils/catchAsync');

/* GET home page. */
router.get("/test1", catchAsync(async function (req, res, next) {
  console.log("test 1", "test 2", "test 3", "test 4");
  throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
}));

router.post("/", async function (req, res, next) {
  const columns = ["method", "url", "code", "updated_at"];

  const limit = req.body.pageSize ? req.body.pageSize : 10;
  const pageNo = req.body.page ? req.body.page : 0;

  const sLimit = limit * pageNo;
  const sLimitLength = limit;

  var order =
    req.body.sorted && Object.keys(req.body.sorted).length
      ? req.body.sorted
      : {
          updated_at: -1,
        };

  var sWhereArr = [];

  //set searching condition
  if (req.body.filtered) {
    const searchValueRegex = new RegExp(req.body.filtered, "i");

    for (var i in columns) {
      var sWhere = {};

      var column = columns[i];
      sWhere[column] = searchValueRegex;

      sWhereArr.push(sWhere);
    }
  }

  var where = {};
  if (sWhereArr.length) {
    where = {
      $or: sWhereArr,
    };
  }

  let count = await exceptionModel.find(where).sort(order).countDocuments();
  let data = await exceptionModel
    .find(where)
    .skip(sLimit)
    .limit(sLimitLength)
    .sort(order);

  const pageCount = Math.ceil(count / limit);

  var output = {
    pages: pageCount == 0 ? 1 : pageCount,
    data,
  };

  res.sendJSONResponse({
    code: httpStatus.OK,
    status: true,
    message: "success",
    data: output,
  });
});

module.exports = router;
