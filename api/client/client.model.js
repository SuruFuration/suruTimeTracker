//const { date } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientSchema = Schema({
  client_name: {
    type: String,
    required: true
  },
  client_project: {
    type: String,
    required: true
  },
  client_contact: {
    type: String,
    required: true
  },
  client_interaction: {
    type: Date,
    required: true
  },
  client_invoice: {
    type: Number,
    default: null
  },
  client_payment: {
    type: String,
    required: true
  },
  user_id: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }]
})

module.exports = mongoose.model("Client", clientSchema);
