//const { date } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const attendanceSchema = Schema({

    check_in: {
        type: Date
        // default: Date.now
      },
      date: {
        type: Date,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      check_out: {
        type: Date,
        required: true
      },
      remark: {
        type: String,
        required: true
      },
      user :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      }]
      
  
})

module.exports = mongoose.model("Attendance", attendanceSchema);
