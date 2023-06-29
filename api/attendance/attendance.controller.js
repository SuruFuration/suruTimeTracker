let mongoose = require('mongoose');

const User = require('../user/user.model');
const Attendance = require('./attendance.model');

exports.attendanceInsert = async (req,res,next) => {


    // let { error, value } = validateAttendance(req.body);

      console.log(req.params);
      user = req.params;
      id = user.id;
      const { check_in, date, status, check_out, Emp_id, remark} = req.body;
      const attendance = await Attendance.create({
        check_in,
        date,
        status,
        check_out,
        Emp_id,
        remark,
        user:id
      });
      await attendance.save();
      
      console.log(attendance);
      const userById = await User.findById(id);
      console.log(attendance,userById)
      userById.attendance.push(attendance);
      await userById.save();

      return res.send(userById);
  }
// }

// userByAttendance : async (req,res)=>/{
  exports.userByAttendance = async (req,res,next) => {
    const id = req.params.id;
    const userByAttendance = await Attendance.findById(id).populate('user');
    console.log(id)
    // const userByAttendance = await Attendance.findOne(id).populate('user');
    console.log('==============>', id);
    
    // console.log(userByAttendance);

    // const userByAttendance = await Attendance.findById(id);
    res.send(userByAttendance);
    console.log('#####>', id);
  }