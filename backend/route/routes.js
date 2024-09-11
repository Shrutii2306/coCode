const express = require('express');
const {  signupUser, getUsers, loginUser } = require('../controller/userController');

const router = express.Router();

router.post('/users', signupUser);

router.get('/users', getUsers)

router.post('/user', loginUser)

module.exports = router;