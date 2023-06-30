const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require('../middleware/auth')

const { 
    userInsert,
    showUsers,
    showUser,
    deleteUser,
    loginUser,
    logoutUser, 
    resetPassword, 
    forgetPassword,
    getUserDetails,
    passwordUpdate,
    profileUpdate
} = require('./user.controller');

router.post('/new', userInsert);

router.get('/list', showUsers );

router.get('/show/:id', showUser );

router.delete('/delete/:id', deleteUser);

router.post('/login/:token', loginUser);

router.get ('/logout', logoutUser);

router.post('/password/forgot', forgetPassword);

router.put ('/password/reset/:token', resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, passwordUpdate);

router.route("/me/update").put(isAuthenticatedUser, profileUpdate);

module.exports = router;
