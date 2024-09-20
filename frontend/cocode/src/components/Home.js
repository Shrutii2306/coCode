import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export const Home = () => {

    const token = localStorage.getItem("jwtToken");
    const navigate = useNavigate();

    const user = useSelector((store) => store.user);
    console.log(user);
  
    useEffect(()=>{

        if(!token){

            navigate('/login');
        }
    },[]);
   return (

    <h1>Hello, {user.name}</h1>
  ); 
}
