let express = require('express');
let router = express.Router(); // access the method of route

const { 
    projectInsert,
    userByProject
} = require('./project.controller');

//  insert project
router.post('/new/:id', projectInsert);

// //Show List
router.get('/populate/:id', userByProject);



module.exports = router;