const Joi = require('joi');

const roleSchema = Joi.object({
  user_id: Joi.string().alphanum().length(24),
  role_name: Joi.string().max(25).required(),
});

const updateSchema = Joi.object({
  user_id: Joi.string().alphanum().length(24),
  role_name: Joi.string().max(25).required(),
});

// Validate the role data
function validateRole(roleData) {
    return roleSchema.validate(roleData);
  }
  
   function validateUpdate(updateData) {
    return updateSchema.validate(updateData);
  }
  module.exports = {
    validateRole,
     validateUpdate
  };

// module.exports = validaterole;