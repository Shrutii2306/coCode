require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors());
app.use(express.json());


// connect to MongoDB
const uri = process.env.MONGODB_URI;
console.log(process.env);
mongoose.connect(uri)
        .then(() => console.log("MongoDB Atlas connected"))
        .catch(err => console.log(err));

// Sample route
app.get('/',(req, res) =>{

    res.send("Hello from express");
});

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
})



