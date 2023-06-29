let express = require('express');
let router = express.Router(); // access the method of route

let attendanceController = require('./attendance.controller');

//  insert table
router.post('/new/:id', attendanceController.attendanceInsert);
// router.post('/new/:id', attendanceController.attendanceCreate);

//Show List
router.get('/populate/:id', attendanceController.userByAttendance);


module.exports = router;