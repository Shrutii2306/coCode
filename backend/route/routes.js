const express = require('express');
const {  signupUser, getUsers, loginUser, getUser } = require('../controller/userController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/users', signupUser);

router.get('/users', getUsers)

router.post('/user', loginUser)

router.get('/user', verifyToken, getUser);

router.get('/hello',(req,res) =>{
    console.log('first');
})
module.exports = router;