const Joi = require('joi');

const timetaskSchema = Joi.object({
  project_id: Joi.string().alphanum().length(24),
  task_name: Joi.string().required(),
  start_time: Joi.date().required(),
  ideal_time: Joi.date().required(),
  duration_time: Joi.number().required(),
  end_time: Joi.date().required(),
});

const updateSchema = Joi.object({
  project_id: Joi.string().alphanum().length(24),
  task_name: Joi.string().required(),
  start_time: Joi.date().required(),
  ideal_time: Joi.date().required(),
  duration_time: Joi.number().required(),
  end_time: Joi.date().required(), 
});

function validateTimetask(timetaskData) {
    return timetaskSchema.validate(timetaskData);
  }

  function validateUpdate(updateData) {
    return updateSchema.validate(updateData);
  }

  module.exports = {
    validateTimetask,
    validateUpdate
    
  };