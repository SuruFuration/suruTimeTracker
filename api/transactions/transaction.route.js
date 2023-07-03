let express = require('express');
let router = express.Router(); // access the method of route

let transactionController = require('./transaction.controller');

router.post('/new/:id', transactionController.transactionInsert);

router.get('/populate/:id', transactionController.userByTransaction);

module.exports = router;