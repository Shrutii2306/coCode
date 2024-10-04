import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetUser, loggedInUser } from '../utils/users';
import SessionPopUp from './popUps/SessionPopUp';
import { setJoinSessionPopup, setSessionPopup } from '../redux/variableSlice';
import JoinSessionPopUp from './popUps/JoinSessionPopUp';
import HistoryTab from './sessionComponents/HistoryTab';
export const Home = () => {

    const navigate = useNavigate();
    
    const token = localStorage.getItem("jwtToken");
    const isUser = loggedInUser();
    const user = useSelector((store) => store.user);
    const currentUser = useGetUser();
    const { sessionPopup, joinSessionPopup} = useSelector((store) => store.variables);
    const dispatch = useDispatch();
    
    const isUserLoggedIn = async() =>{

        const res = await loggedInUser();
        if(res==null){

            alert("Please login to continue.");
            navigate('/login');
        }
    }

    useEffect(()=>{

       isUserLoggedIn()

    },[token]);


   return (

    <div className='flex h-screen'>
             <HistoryTab/>

        <div className='text-center pt-9 flex flex-col border w-10/12'>
            <h1>Hello, {user.name}</h1>
            <SessionPopUp />
            {
                !sessionPopup && 
                <button 
                    className='border border-black px-1 rounded-md mt-5 hover:bg-gray-200 w-fit mx-auto' 
                    onClick={() => {
                        dispatch(setSessionPopup(true)) 
                        dispatch(setJoinSessionPopup(false))
                    }}
                >
                    New session
                </button>}

            <JoinSessionPopUp/>
            {
            !joinSessionPopup &&  
            <button 
                className='border border-black px-1 rounded-md mt-5 hover:bg-gray-200 w-fit mx-auto' 
                onClick={() => {
                    dispatch(setJoinSessionPopup(!joinSessionPopup)); 
                    dispatch(setSessionPopup(false))
                }}
            >
                Join Session
            </button>}
        </div>

    </div>
    
    
  ); 
}
