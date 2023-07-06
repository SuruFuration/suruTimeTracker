const Joi = require('joi');


const clientSchema = Joi.object({
  user_id: Joi.string().required(),
  client_name: Joi.string().required(),
  client_project: Joi.string().required(),
  client_contact: Joi.string().required(),
  client_interaction: Joi.date().required(),
  client_invoice: Joi.number().required(),
  client_payment: Joi.string().required(),
});


const updateSchema = Joi.object({
  user_id: Joi.string().required(),
  client_name: Joi.string().required(),
  client_project: Joi.string().required(),
  client_contact: Joi.string().required(),
  client_interaction: Joi.date().required(),
  client_invoice: Joi.number().required(),
  client_payment: Joi.string().required(),
});

  // Validate the project data
function validateClient(clientData) {
    return clientSchema.validate(clientData);
  }
  
  function validateUpdate(updateData) {
    return updateSchema.validate(updateData);
  }
  
  module.exports = {
    validateClient,
    validateUpdate
    
  };