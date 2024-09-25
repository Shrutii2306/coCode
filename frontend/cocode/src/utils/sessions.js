import { useEffect, useState } from "react";
import { CHECK_SESSION_ID, GET_SESSION_URL, NEW_SESSION_URL } from "./constants";
import { useDispatch } from "react-redux";
import { setSession } from "../redux/sessionSlice";

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

export const CheckSessionId = async(sessionId) => {

    const jwtToken = JSON.stringify(localStorage.getItem('jwtToken'))
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

    const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));
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
                
        const res = await fetch(CHECK_SESSION_ID, requestOptions);
        const response = await res.json();
        console.log(response);
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