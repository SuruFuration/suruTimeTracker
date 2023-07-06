let express = require('express');
let router = express.Router(); // access the method of route

let timetaskController = require('./timetask.controller');

router.post('/new', timetaskController.timeTaskInsert);

/* show */
router.get("/list", timetaskController.showAllTimeTasks);

/* edit */
router.get("/show/:id", timetaskController.showSingleTimeTask);

/* update */
router.put("/update/:id", timetaskController.updateTimeTask);

/* delete */
router.delete("/delete/:id", timetaskController.deleteTimeTask);

module.exports = router;