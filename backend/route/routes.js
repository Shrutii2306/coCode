const express = require('express');
const {  signupUser, getUsers, loginUser, getUser } = require('../controller/userController');
const verifyToken = require('../middleware/authMiddleware');
const { createSession, getSession, checkSessionId } = require('../controller/sessionController');

const router = express.Router();

router.post('/users', signupUser);

router.get('/users', getUsers)

router.post('/user', loginUser)

router.get('/user', verifyToken, getUser);

router.post('/session',verifyToken, createSession);

router.post("/getSession", verifyToken, getSession);

router.post('/isSessionValid', verifyToken, checkSessionId);

router.get('/hello',(req,res) =>{
    console.log('first');
})
module.exports = router;