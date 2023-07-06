let express = require('express');
let router = express.Router(); // access the method of route

let attendanceController = require('./attendance.controller');

//  insert table
router.post('/new', attendanceController.attendanceInsert);

//Show List
router.get('/list', attendanceController.showAllAttendances);

//Display one single Detail
router.get('/show/:id', attendanceController.showSingleAttendance);

//Update single Details
router.put('/update/:id', attendanceController.updateAttendance);

//Delete single Details
router.delete('/delete/:id', attendanceController.deleteAttendance);

module.exports = router;