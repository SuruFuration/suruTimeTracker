let express = require('express');
let router = express.Router(); // access the method of route

let roleController = require('./role.controller');

router.post('/new/:id', roleController.roleInsert);

router.get('/populate/:id', roleController.userByRole);

module.exports = router;