import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
export const Home = () => {

    const token = localStorage.getItem("jwtToken");
    const navigate = useNavigate();

    
  
    useEffect(()=>{

        if(!token){

            navigate('/login');
        }
    },[]);
   return (

    <h1>Home</h1>
  ); 
}
