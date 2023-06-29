let express = require('express');
let router = express.Router(); // access the method of route

let projectReportController = require('./projectReport.controller');

//  insert table
router.post('/new/:id', projectReportController.projectReportInsert);

//Show List
router.get('/populate/:id', projectReportController.projectByProjectReport);


module.exports = router;