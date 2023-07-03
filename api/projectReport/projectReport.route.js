let express = require('express');
let router = express.Router(); // access the method of route

let projectReportController = require('./projectReport.controller');

//  insert table
router.post('/new', projectReportController.projectReportInsert);

//Show List
router.get('/list', projectReportController.showAllProjectReports);

//Display one single Detail
router.get('/show/:id', projectReportController.showSingleProjectReport);

//Update single Details
router.put('/update/:id', projectReportController.updateProjectReport);

//Delete single Details
router.delete('/delete/:id', projectReportController.deleteProjectReport);
projectReportController
// Find Company for Test
router.get('/find-user', projectReportController.findProjectByProjectReportId)

module.exports = router;