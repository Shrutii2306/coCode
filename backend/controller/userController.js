const User = require('../schema/user');
const {createSecretToken} = require('../tokenGeneration/generateToken');
const bcrypt = require("bcrypt");

 const signupUser = async (req, res) => {

    const {name, email, password} = req.body;
    try{

        // check if all the fields are empty or not
        if(!(name && email && password)){

            res.status(400).send({message: "All inputs are required!"});
        }

        //  check if there's a user already present with the given email
        const isUser = await User.findOne({email});

        if(isUser){

            return res.status(409).send({message :"User already exists"});
        }
        
        // password hashing
        const salt= 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating a new user
        const user = new User({name, email, password: hashedPassword});
        await user.save();

        // generating jwt token
        const token = createSecretToken(user._id);

        // sending response to the client
        res.status(200).send({userId : user._id,jwtToken :token});

    }catch(err){

        console.log(err);
        res.status(500).send(err);
    }
}

const getUsers = async(req, res) => {

    try{

        const users = await User.find({});
        res.send(users);
    }catch(err){

        console.log(err);
        res.status(500).send(err);
    }
}

const loginUser = async(req, res)=>{

    try{

        const {email, password} = req.body;

        // check if email and password are empty or not
        if(email==''|| password==''){

            res.status(400).send({message:"email and password required"});
        }

        //  find user in DB
        const user = await User.findOne({email});

        // if user is not present
        if(!(user && (await bcrypt.compare(password,user.password)))){

            return res.status(404).send({message:"Invalid credentials"});
        }

        // if user is present generate a token
        const token = createSecretToken(user._id);

        // send token and user id in response object
        res.status(200).send({userId: user._id, jwtToken: token});

        
    }catch(err){

        console.log(err);
        res.status(500).send(err);

    }
}
module.exports = {signupUser, getUsers, loginUser};
// export default signupUser;