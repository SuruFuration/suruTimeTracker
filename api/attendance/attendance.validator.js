const Joi = require('joi');

const attendanceSchema = Joi.object({
 
  check_in: Joi.date().max(25).required(),
  date: Joi.date().max(50).required(),
  status: Joi.string().max(50).required(),
  check_out: Joi.date().max(50).required(),
  Emp_id: Joi.string().max(25).allow(null),
  remark: Joi.string().max(100).required(),
  

 
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
function validateAttendance(attendanceData) {
    return attendanceSchema.validate(attendanceData);
  }
  
  // function validateUpdate(updateData) {
  //   return updateSchema.validate(updateData);
  // }
  module.exports = {
    validateAttendance
    //validateUpdate
    
  };

// module.exports = validateuser;