import { useDispatch, useSelector } from "react-redux";
import { GET_USERS, REGISTER_URL, LOGIN_URL, USER_DETAILS_URL } from "./constants";
import { useEffect, useState } from "react";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
export const getUsers = async() => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    const response = await fetch(GET_USERS , requestOptions);

}

export const getUser = async() => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    const response = await fetch(GET_USERS , requestOptions);

}

export const registerUser = async({name, email, password}) => {

    
    const body = JSON.stringify({
        name,
        email,
        password
    })

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {

        method : "POST",
        headers : myHeaders,
        body : body,
        redirect : "follow"
    }

    try{
        
        const response = await fetch(REGISTER_URL, requestOptions);
        const res = await response.json();
        if(response.ok){

            localStorage.setItem("jwtToken",JSON.stringify(res.jwtToken));
            return(res);
            
        }
        else{
            console.log(res);
            return(res);
        }
    }catch(err){

        
        console.log("err",err);
        return("Something went wrong");
    }
    

}

export const loginUser = async({email, password}) => {

        if(!email || !password){

            alert("Email and Password required!");
            return;
        }
        const body = JSON.stringify({
            email,
            password
        });
    
        console.log(email,password);
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const requestOptions = {
    
            method : "POST",
            headers : myHeaders,
            body : body,
            redirect : "follow"
        };
    
        try{
    
            const response = await fetch(LOGIN_URL, requestOptions)
            const res = await response.json();
            
            if(response.ok){
    
                console.log("res",res);
                localStorage.setItem("jwtToken", JSON.stringify(res.jwtToken));
                
                console.log( localStorage)
                return res;
    
            }else{
    
                console.log(res);
                return(res);
            }
    
        }catch(err){
    
            console.log(err);
            return(err);
        }
    
}

export const useLoggedInUser = () =>{

    const [jwtToken, setToken] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{

        const getToken = async() =>{

            const token = await JSON.parse(localStorage.getItem('jwtToken'));
            console.log(token);
            setToken(token);
            
        }
    
        getToken();
    },[]);

    

    return jwtToken;

}

export const useGetUser = () => {

    const [userData, setUserData] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        fetchUser();
    },[]);

    const fetchUser = async () =>{

        const token = await JSON.parse(localStorage.getItem('jwtToken'));
        const TOKEN = "Bearer "+token;
        // console.log(TOKEN);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization",TOKEN);
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };

        try{

            const res = await fetch(USER_DETAILS_URL,requestOptions);
            
            if(res.ok){

                const response = await res.json()
                // console.log("response",response)
                setUserData(response);
                dispatch(setUser(response));
            }
            else{

                return "Something went wrong";
            }
        
        }catch(err){

            console.log(err);
            return "Something went Wrong";
        }

    }

    return userData;

}

export const getUserName = async(userId) => {

    const myHeaders = new Headers();
    console.log(typeof userId, userId)
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      userId
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    try {

        const res = await fetch("http://localhost:5000/username", requestOptions);
        const response = await res.json();
        if(res.ok)
            return response.name;
        else{
           
            console.log(response.message);
            return null;
        }

    } catch (error) {
    
        console.log(error);
    }
    
}