const Joi = require('joi');

const projectReportSchema  = Joi.object({
  id: Joi.number().integer().required(),
  report_name: Joi.string().max(255).required(),
  client_name: Joi.string().max(255).required(),
  project_duration: Joi.date().iso().required(),
  check_progress: Joi.string().max(255).default(null),
  summary: Joi.boolean().default(true),
});

// const updateSchema = Joi.object({
    
//     check_in: Joi.date().max(25).required(),
//     date: Joi.date().max(50).required(),
//     status: Joi.string().max(50).required(),
//     check_out: Joi.date().max(50).required(),
//     Emp_id: Joi.string().max(25).allow(null),
//     remark: Joi.string().max(100).required(),
   
//   });

// Validate the area data
function validateProjectReport(projectReportData) {
    return projectReportSchema.validate(projectReportData);
  }
  
  // function validateUpdate(updateData) {
  //   return updateSchema.validate(updateData);
  // }
  module.exports = {
    validateProjectReport
    //validateUpdate
    
  };

// module.exports = validateuser;