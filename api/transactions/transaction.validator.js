const Joi = require('joi');

const transactionSchema = Joi.object({
  amount: Joi.number().required(),
  status: Joi.string().required(),
  payment_method: Joi.string().required(),
  timestamp: Joi.date().required(),
});

const updateSchema = Joi.object({
  amount: Joi.number().required(),
  status: Joi.string().required(),
  payment_method: Joi.string().required(),
  timestamp: Joi.date().required(),
});

// Validate the role data
function validateTransaction(transactionData) {
    return transactionSchema.validate(transactionData);
  }
  
   function validateUpdate(updateData) {
    return updateSchema.validate(updateData);
  }
  module.exports = {
    validateTransaction,
     validateUpdate
    
  };

// module.exports = validaterole;