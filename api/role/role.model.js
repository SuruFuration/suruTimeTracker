const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = Schema({
  user_id :[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    require: true
  }],
  role_name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Role", roleSchema);
