const Joi = require('joi');

const timetaskSchema = Joi.object({
  start_time: Joi.date().required(),
  ideal_time: Joi.date().required(),
  duration_time: Joi.number().required(),
  end_time: Joi.date().required(),
  user: Joi.object().pattern(Joi.string(), Joi.string().required()).required(),
  project: Joi.object().pattern(Joi.string(), Joi.string().required()).required(), 
});

const updateSchema = Joi.object({
  start_time: Joi.date().required(),
  ideal_time: Joi.date().required(),
  duration_time: Joi.number().required(),
  end_time: Joi.date().required(),
  user: Joi.object().pattern(Joi.string(), Joi.string().required()).required(),
  project: Joi.object().pattern(Joi.string(), Joi.string().required()).required(),  
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