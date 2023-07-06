const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const timetaskSchema = Schema({
  task_name: {
    type: String,
    required: true
  },
  start_time: {
    type: Date,
    required: true
  },
  ideal_time: {
    type: Date,
    required: true
  },
  duration_time: {
    type: Number,
    required: true
  },
  end_time: {
    type: Date,
    required: true
  },
  project_id: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Project'}
  ],
})

 module.exports = mongoose.model("Timetask", timetaskSchema);