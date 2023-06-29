let express = require('express');
let router = express.Router(); // access the method of route

let timetaskController = require('./timetask.controller');

router.post('/new', timetaskController.timetaskInsert);

module.exports = router;