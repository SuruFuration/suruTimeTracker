const Joi = require('joi');

const timetaskSchema = Joi.object({
 
    start_time: Joi.date().max(25).required(),
    ideal_time: Joi.string().max(50).required(),
    duration_time: Joi.number().max(50).required(),
    project_id: Joi.string().max(50).required(),
    Emp_id: Joi.string().max(25).allow(null),
    end_time: Joi.string().max(100).required(),

 
});

const updateSchema = Joi.object({
    
    start_time: Joi.date().max(25).required(),
    ideal_time: Joi.string().max(50).required(),
    duration_time: Joi.number().max(50).required(),
    project_id: Joi.string().max(50).required(),
    Emp_id: Joi.string().max(25).allow(null),
    end_time: Joi.string().max(100).required(),
   
  });

// Validate the timetask data
function validateTimetask(timetaskData) {
    //console.log(timetaskData);
    return timetaskSchema.validate(timetaskData);
  }

  function validateUpdate(updateData) {
    return updateSchema.validate(updateData);
  }

  module.exports = {
    validateTimetask,
    validateUpdate
    
  };

// module.exports = validatetimetask;