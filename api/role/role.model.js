const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = Schema({
  name: {
    type: String,
    required: true
  },
  user :[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }]
  
})

module.exports = mongoose.model("Role", roleSchema);
