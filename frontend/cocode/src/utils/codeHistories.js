import { useEffect, useState } from "react";
import { GET_CHECKPOINT_URL, SAVE_CODE_URL } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { getUserName } from "./users";
import { setData, setLoader } from "../redux/codeSlice";

export const saveCodeSnippet = async(code, sessionId, hostId) => {

    const token = await JSON.parse(localStorage.getItem('jwtToken'));
    
    const raw = JSON.stringify({

        hostId: hostId,
        sessionId: sessionId,
        code: code,
    });

    const myHeaders = new Headers();

    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-type','application/json');

    const requestOptions = {

        method : 'POST',
        body: raw,
        headers: myHeaders
    };
    
    try {
        
        const res = await fetch(SAVE_CODE_URL, requestOptions);
        const response = await res.json();
        if(res.ok){

            
            // alert("code saved successfully!");
            return true;
        }
        else{

            // alert("Couldn't save, please try again.");
            return false;
        }
    } catch (error) {
        
        console.log(error);
        alert('Something went wrong');
        return false;
    }

}

export const useLastCheckpoint = () => {

    const [lastCheckpoint, setLastCheckpoint] = useState('');
    const {sessionId} = useSelector((store) => store.session);
    const dispatch= useDispatch();
    useEffect (() => {

        const fetchCodeHistory = async() => {

            dispatch(setLoader(true));


                try {
                
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({
                sessionId: sessionId
                });

                const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
                };

                const res = await fetch(GET_CHECKPOINT_URL, requestOptions);
                const response = await res.json();
                if(res.ok){
                    
                    const savedBy = await getUserName(response?.lastCheckpoint?.savedBy);
                    setLastCheckpoint(await JSON.parse(response?.lastCheckpoint?.code));
                    dispatch(setData({savedBy, savedAt :response?.lastCheckpoint?.savedAt }))
                }else{

                    console.log(res);
                    dispatch(setData({savedBy:'', savedAt :'' }))

                }

                dispatch(setLoader(false));
            } catch (error) {
                
                console.log(error);
                alert("Something went wrong");
                dispatch(setData({savedBy:'', savedAt :'' }))
                dispatch(setLoader(false));
            }
        
        }
        
        fetchCodeHistory();
         
    },[sessionId]);

    return lastCheckpoint;
}