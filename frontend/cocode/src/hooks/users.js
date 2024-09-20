import { GET_USERS, REGISTER_URL, LOGIN_URL } from "../utils/constants";

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
    
                console.log(res);
                localStorage.setItem("jwtToken", res.token);
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


