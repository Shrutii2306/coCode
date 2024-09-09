const express = require('express');
const User = require('./user');

const router = express.Router();

router.post('/users', async (req, res) => {

    const {name, email, password} = req.body;

    try{

        const user = new User({name, email, password});
        await user.save();
        res.send(user);

    }catch(err){

        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/users', async(req, res) => {

    try{

        const users = await User.find({});
        res.send(users);
    }catch(err){

        console.log(err);
        res.status(500).send(err);
    }
})