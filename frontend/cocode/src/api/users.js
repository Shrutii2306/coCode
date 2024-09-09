import { GET_USERS, REGISTER_USER } from "../utils/constants";

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

export const registerUsers = async({name, email, password}) => {

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

    const response = await fetch(REGISTER_USER, requestOptions);
    console.log(response);
}