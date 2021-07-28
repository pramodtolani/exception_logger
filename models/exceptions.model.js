const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ModelConstants = Object.freeze({
  INFO: "INFO",
  ERROR: "ERROR",
  DEBUG: "DEBUG",
  NOTICE: "NOTICE",
  WARNING: "WARNING",
  CRITICAL: "CRITICAL",

  RESOLVED: "RESOLVED",
  PENDING: "PENDING",
});

let logDataSchema = new Schema({
  date: Date,
  log: String,
});

const ExceptionsSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
    headers: {
      type: Object,
      required: true,
    },
    response_time: {
      type: Number,
      required: true,
    },
    response_payload: {
      type: Object,
      required: true,
    },
    exception_message: {
      type: String,
      required: true,
    },
    error_type: {
      type: String,
      required: false,
      enum: [
        ModelConstants.CRITICAL,
        ModelConstants.DEBUG,
        ModelConstants.INFO,
        ModelConstants.ERROR,
        ModelConstants.WARNING,
        ModelConstants.NOTICE,
      ],
      default: ModelConstants.ERROR,
    },
    ip_address: {
      type: String,
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
    count: {
      type: Number,
      required: false,
      default: 1,
    },
    hash: {
      type: String,
      required: false,
      default: "",
    },
    resolved: {
      type: String,
      required: false,
      default: ModelConstants.PENDING,
    },
    resolved_at: {
      type: Date,
      required: false,
    },
    reopened_at: [
      {
        type: Date,
        required: false,
      },
    ],
    log_data: [logDataSchema],
  },
  {
    collection: "exceptions",
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

Object.assign(ExceptionsSchema.statics, ModelConstants);

module.exports = mongoose.model("Exceptions", ExceptionsSchema);
