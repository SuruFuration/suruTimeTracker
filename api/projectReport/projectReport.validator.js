const Joi = require('joi');

const projectReportSchema  = Joi.object({
  project_id: Joi.string().alphanum().length(24),
  projectReport_name: Joi.string().max(255).required(),
  client_name: Joi.string().max(255).required(),
  project_duration: Joi.date().iso().required(),
  check_progress: Joi.string().max(255).default(null),
  summary: Joi.boolean().default(true),
});

const updateSchema = Joi.object({
  project_id: Joi.string().alphanum().length(24),
  projectReport_name: Joi.string().max(255).required(),
  client_name: Joi.string().max(255).required(),
  project_duration: Joi.date().iso().required(),
  check_progress: Joi.string().max(255).default(null),
  summary: Joi.boolean().default(true),
  });

// Validate the area data
function validateProjectReport(projectReportData) {
    return projectReportSchema.validate(projectReportData);
  }
  
  function validateUpdate(updateData) {
    return updateSchema.validate(updateData);
  }
  module.exports = {
    validateProjectReport,
    validateUpdate
    
  };
