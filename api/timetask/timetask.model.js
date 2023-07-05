const { string, date } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const timetaskSchema = Schema({
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
      user: {
        type: Map,
        of: {
          type: String,
          ref: 'User',
        },
        required: true,
      },
      projects: {
        type: Map,
        of: {
          type: String,
          ref: 'Project',
        },
        required: true,
      }
 })

 module.exports = mongoose.model("Timetask", timetaskSchema);