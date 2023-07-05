const Joi = require('joi');


const projectSchema = Joi.object({
    user_id: Joi.string().alphanum().length(24),
    project_name: Joi.string().required(),
    StartDate: Joi.date().required(),
    status: Joi.string().required(),
    Create_At: Joi.date().required(),
    Budget: Joi.number().default(null),
    Update_At: Joi.date().required(),
    Description: Joi.string().required(),
    EndDate: Joi.date().required()
  });


  const updateSchema = Joi.object({
    user_id: Joi.string().alphanum().length(24),
    project_name: Joi.string().required(),
    StartDate: Joi.date().required(),
    status: Joi.string().required(),
    Create_At: Joi.date().required(),
    Budget: Joi.number().default(null),
    Update_At: Joi.date().required(),
    Description: Joi.string().required(),
    EndDate: Joi.date().required()
   
  });

  // Validate the project data
function validateProject(projectData) {
    return projectSchema.validate(projectData);
  }
  
  function validateUpdate(updateData) {
    return updateSchema.validate(updateData);
  }
  module.exports = {
    validateProject,
    validateUpdate
    
  };