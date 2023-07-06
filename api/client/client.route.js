let express = require('express');
let router = express.Router(); // access the method of route

let clientController = require('./client.controller');

router.post('/new', clientController.clientInsert);

//Show List
router.get('/list', clientController.showAllClients);

//Display one single Detail
router.get('/show/:id', clientController.showSingleClient);

//Update single Details
router.put('/update/:id', clientController.updateClient);

//Delete single Details
router.delete('/delete/:id', clientController.deleteClient);

module.exports = router;