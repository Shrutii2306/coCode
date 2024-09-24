import { useDispatch, useSelector } from "react-redux";
import { GET_USERS, REGISTER_URL, LOGIN_URL, USER_DETAILS_URL } from "./constants";
import { useEffect, useState } from "react";
import { setUser } from "../redux/userSlice";
export const getUsers = async() => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    const response = await fetch(GET_USERS , requestOptions);
    console.log(response);
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
    console.log(response);
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

            
            console.log(res);
            localStorage.setItem("jwtToken",res.jwtToken);
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

// export const useLoggedInUser = () =>{

//     const [jwtToken, setToken] = useState('');

//     useEffect(()=>{

//         getToken();
//     },[]);

//     const getToken = async() =>{

//         const token = await localStorage.getItem('jwtToken');
//         console.log(token);
//         setToken(token);
//     }


//     return jwtToken;

// }

export const useGetUser = () => {

    const [userData, setUserData] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        fetchUser();
    },[]);

    const fetchUser = async () =>{

        const token = JSON.parse(localStorage.getItem('jwtToken'));
        const TOKEN = "Bearer "+token;
        console.log(TOKEN);
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
                console.log("response",response)
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