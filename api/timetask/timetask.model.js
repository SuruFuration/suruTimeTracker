const { string, date } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const timetaskSchema = Schema({


    start_time: {
        type: Date,
        required: true
       // default: Date.now,
      },
      ideal_time: {
        type: Date,
        required: true
      },
      duration_time: {
        type: Number,
        required: true
        //default: Date.now,
      },
      end_time: {
        type: Date,
        required: true
       // default: Date.now,
      },
      user: {
        type: Map,
        of: {
          type: String,
          ref: 'User',
        },
        required: true,
      },
      project: {
        type: Map,
        of: {
          type: String,
          ref: 'Project',
        },
        required: true,
      }
  
 })

 module.exports = mongoose.model("Timetask", timetaskSchema);