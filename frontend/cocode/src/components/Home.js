import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetUser, useLoggedInUser } from '../hooks/users';

export const Home = () => {

    const navigate = useNavigate();
    const currentUser = useGetUser();
    const token = localStorage.getItem("jwtToken");
    const user = useSelector((store) => store.user);
    console.log(currentUser);
    
    useEffect(()=>{

        if(token==null){

            navigate('/login');
        }

    },[currentUser]);
   return (

    <h1>Hello, {user.name}</h1>
  ); 
}
