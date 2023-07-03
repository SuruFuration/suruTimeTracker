const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = Schema({
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]  
})

module.exports = mongoose.model("Transaction", transactionSchema);
