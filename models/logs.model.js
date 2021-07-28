const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LogSchema = new Schema(
  {
    uri: String,
    headers: Object,
    method: String,
    params: Object,
    ip_address: String,
    start_time: String,
    end_time: String,
    rtime: String,
    status: String,
    response: Object,
  },
  {
    collection: "logs",
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Logs", LogSchema);
