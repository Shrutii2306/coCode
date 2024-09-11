require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const routes = require('./route/routes');
const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors());
app.use(express.json());


// connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri,{dbName: 'CoCode'})
        .then(() => console.log("MongoDB Atlas connected"))
        .catch(err => console.log(err));

// Sample route
app.use('/',routes);

// app.post('/users', async (req, res) => {

//     const {name, email, password} = req.body;
//     console.log(name,email, password);
//     try{

//         const user = new User({name, email, password});
//         await user.save();
//         res.send(user);

//     }catch(err){

//         console.log(err);
//         res.status(500).send(err);
//     }
// });

// app.get('/users', async(req, res) => {

//     try{

//         const users = await User.find({});
//         res.send(users);
//     }catch(err){

//         console.log(err);
//         res.status(500).send(err);
//     }
// })

app.get('/',(req, res) =>{

    res.send("Hello from express");
});

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
})



