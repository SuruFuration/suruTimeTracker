//const { date } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectReportSchema  = Schema({

  projectReport_name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  client_name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  project_duration: {
    type: Date,
    required: true,
  },
  check_progress: {
    type: String,
    maxlength: 255,
    default: null,
  },
  summary: {
    type: Boolean,
    default: true,
  },
  project_id: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Project'
  }]
})

module.exports = mongoose.model("ProjectReport", projectReportSchema);
