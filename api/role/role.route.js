let express = require('express');
let router = express.Router(); // access the method of route

let roleController = require('./role.controller');

router.post('/new', roleController.roleInsert);

//Show List
router.get('/list', roleController.showAllRoles);

//Display one single Detail
router.get('/show/:id', roleController.showSingleRole);

//Update single Details
router.put('/update/:id', roleController.updateRole);

//Delete single Details
router.delete('/delete/:id', roleController.deleteRole);

// Find Company for Test
router.get('/find-user', roleController.findUserByRoleId)

module.exports = router;