const { v4: uuidv4 } = require('uuid');
const Session = require('../model/session');

const createSession = async(req,res) =>{

    const newSessionId = uuidv4();
    console.log(newSessionId);
    // res.send(newSessionId);
    console.log(req.body, req.user);
    const { sessionName, maxParticipant} = req.body;
    console.log( sessionName, maxParticipant);

    try{
        const session = new Session({ sessionId: newSessionId, hostId: req.user.id ,sessionName, maxParticipant});
        await session.save();
        res.status(200).send({message: "Session created successfully", sessionInfo : session});
    
    }catch(err){

        res.send(err);
    }
}

const getSession = async(req,res) =>{

    const sessionId = req.body;

    if(!sessionId){

        return res.status(401).send("Session id required");
    }

    try{
        const session = await Session.findOne(sessionId);

        if(!session){

            res.status(404).send({message:"Session does not exists."});
        }

        console.log(session)
        res.status(200).send(session);
    }catch(err){

        console.log(err);
        res.status(500).send({message:"Something went wrong",error:err})
    }
}

const joinSession = async(req,res) => {
    

    
    
}

const checkSessionId = async(req,res) =>{

    const sessionId = req.body;

    if(!sessionId){

        return res.status(401).send("Session id required");
    }

    try{
        const session = await Session.findOne(sessionId);

        if(!session){

            return res.status(404).send({message:"Session does not exists."});
        }

        if(session.participants.length >= session.maxParticipant){

            return res.status(406).send({message:"Session is full. Please try again later."});
        }

        console.log(session)
        return res.status(200).send(true);
    }catch(err){

        console.log(err);
        res.status(500).send({message:"Something went wrong",error:err})
    }


}


module.exports = {createSession, getSession, checkSessionId}