//const { date } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = Schema({
  project_name: {
    type: String,
    required: true
  },
  StartDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  Create_At: {
    type: Date,
    required: true
  },
  Budget: {
    type: Number,
    default: null
  },
  Update_At: {
    type: Date,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  EndDate: {
    type: Date,
    required: true
  },
  user_id: [ {type: mongoose.Schema.Types.ObjectId, ref: 'User'} ],
  projectReports: [ { type: mongoose.Schema.Types.ObjectId, ref: 'ProjectReport' } ],
  timeTasks: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Timetask' } ]
})

module.exports = mongoose.model("Project", projectSchema);
