const Joi = require('joi');

const attendanceSchema = Joi.object({
  user_id: Joi.string().alphanum().length(24),
  check_in: Joi.date().required(),
  date: Joi.date().required(),
  status: Joi.string().max(50).required(),
  check_out: Joi.date().required(),
  remark: Joi.string().max(100).required(),
});

const updateSchema = Joi.object({
  user_id: Joi.string().alphanum().length(24),
  check_in: Joi.date().required(),
  date: Joi.date().required(),
  status: Joi.string().max(50).required(),
  check_out: Joi.date().required(),
  remark: Joi.string().max(100).required(),
  });

function validateAttendance(attendanceData) {
    return attendanceSchema.validate(attendanceData);
  }
  
  function validateUpdate(updateData) {
    return updateSchema.validate(updateData);
  }
  module.exports = {
    validateAttendance,
    validateUpdate
    
  };
