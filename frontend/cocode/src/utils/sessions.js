import { useEffect, useState } from "react";
import { CHECK_SESSION_ID, EXIT_SESSION_URL, GET_SESSION_URL, JOIN_SESSION_URL, NEW_SESSION_URL, SESSION_HISTORY_URL } from "./constants";
import { useDispatch } from "react-redux";
import { setSession } from "../redux/sessionSlice";
import { redirect, useNavigate } from "react-router-dom";

export const getNewSession = async({sessionName, maxParticipant}) => {

        const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${jwtToken}`);

        const requestOptions = {

            method: 'POST',
            body : JSON.stringify({
                sessionName,
                maxParticipant
            }),
            headers : myHeaders,
            redirect: 'follow'
        }

        try{

            const res = await fetch(NEW_SESSION_URL, requestOptions);
            const response = await res.json();
            console.log(response);
            return response;
        }catch(err){

            console.log(err);
            return (err);
        }

}

export const useGetSession = (sessionId) => {

    const dispatch = useDispatch();
    const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const [sessionData, setSessionData] = useState({});

    
    useEffect(() => {


        const fetchSessionData = async() =>{
           
            const myHeaders = new Headers();
            myHeaders.append("Authorization",`Bearer ${jwtToken}`);
            myHeaders.append("Content-type","application/json");

            const requestOptions = {

                method : 'post',
                body : JSON.stringify({

                    sessionId
                }),
                headers : myHeaders
            }

            try {
                
                const res = await fetch(GET_SESSION_URL, requestOptions);
                const response = await res.json();
                console.log(response);
                setSessionData(response);
                dispatch(setSession({sessionId :response.sessionId, sessionName : response.sessionName, sessionStatus : response.status}))

            } catch (error) {
                
                console.log(error);
            }

        }

    
        fetchSessionData();
    },[])

    return sessionData;
}

export const checkSessionId = async(sessionId) => {

    const jwtToken = JSON.parse(localStorage.getItem('jwtToken'))
    const myHeaders = new Headers();
    myHeaders.append("Authorization",`Bearer ${jwtToken}`);
    myHeaders.append("Content-type","application/json");

    const requestOptions = {

        method : 'post',
        body : JSON.stringify({

            sessionId
        }),
        headers : myHeaders
    }

    try {
                
        const res = await fetch(CHECK_SESSION_ID, requestOptions);
        const response = await res.json();
        console.log(response);
        if(res.ok)
            return(true);
        else
            return false;
    
    } catch (error) {
        
        console.log(error);
        return false;
    }
}

export const exitSession = async(sessionId) => {

    const jwtToken = await JSON.parse(localStorage.getItem('jwtToken'));
    console.log(jwtToken)
    const myHeaders = new Headers();
    myHeaders.append("Authorization",`Bearer ${jwtToken}`);
    myHeaders.append("Content-type","application/json");

    const requestOptions = {

        method : 'post',
        body : JSON.stringify({

            sessionId
        }),
        headers : myHeaders
    }

    try {
                
        const res = await fetch(EXIT_SESSION_URL, requestOptions);
        const response = await res.json();
        // console.log(response);
        if(res.ok)
        {
            return true;
        }else{

            return response;
        }
    
    } catch (error) {
        
        console.log(error);
        return error;
    }

}

export const joinSession = async(sessionId)=>{

    const jwtToken = await JSON.parse(localStorage.getItem('jwtToken'));
    const isSessionValid = await checkSessionId(sessionId);

    if(isSessionValid!=true){

        return alert("Couldn't join the given session.\nThis could be if the session is invalid or is full.")
    }

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${jwtToken}`);
    myHeaders.append('Content-type','application/json');

    const requestOptions = {

        method: 'POST',
        body: JSON.stringify({

            sessionId 
        }),
        headers: myHeaders
    };

    try {

        const res = await fetch(JOIN_SESSION_URL, requestOptions);
        const response = await res.json();
        console.log(response);
        return true;
        
    } catch (err) {
        
        console.log(err);
        return false;

    }

}

export const useSessionHistory = () =>{

    const [sessionHistory, setSessionHistory] = useState([]);
    
    useEffect(() =>{

        const fetchHistory = async() =>{
            
            const jwtToken = await JSON.parse(localStorage.getItem('jwtToken'));
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${jwtToken}`);
    
            const requestOptions = {
    
                method: 'POST',
                headers : myHeaders,
                redirect: 'follow'
            }
    
            try {
                
                const res = await fetch(SESSION_HISTORY_URL, requestOptions);
                const response = await res.json();
                if(res.ok){
    
                    // console.log("response",response);
                   setSessionHistory(response);
                }
                
            } catch (err) {
                
                console.log(err.message);
            }
        }

        fetchHistory();

    },[]);

    
    return sessionHistory;
}