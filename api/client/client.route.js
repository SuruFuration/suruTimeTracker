let express = require('express');
let router = express.Router(); // access the method of route

let projectController = require('./project.controller');

router.post('/new', projectController.projectInsert);

//Show List
router.get('/list', projectController.showAllProjects);

//Display one single Detail
router.get('/show/:id', projectController.showSingleProject);

//Update single Details
router.put('/update/:id', projectController.updateProject);

//Delete single Details
router.delete('/delete/:id', projectController.deleteProject);

// Find Company for Test
router.get('/find-user', projectController.findUserByProjectId)

module.exports = router;