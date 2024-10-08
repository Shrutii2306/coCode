import {useEffect, useState}  from 'react';
import { useNavigate, useSubmit } from 'react-router-dom';
import { loginUser, loggedInUser } from '../utils/users';

const Login = () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const jwtToken = localStorage.getItem('jwtToken');

    const submit = async() => {

        if(!email || !password){

            alert("Email and Password required!");
            return;
        }
        

        const res = await loginUser({email, password});

        if(res.userId){

            navigate('/home');
            
        }
        else{

            console.log("res",res)
            alert(res.message);
        }
    }
    

    useEffect(()=>{

        const isUserLoggedIn = async() => {

            const res = await loggedInUser();
    
            if(res!=null){
    
                navigate('/home');
            }
        }
        isUserLoggedIn();
    },[]);
    
    return(

        <div className='text-center pt-6'>
            <span className='text-2xl font-semibold p-2'>Login</span>
            <div className='flex flex-col items-start w-fit m-auto py-2'>
                <div>
                    Email
                    <input className='px-1 m-2 border border-black' type='text' value={email} onChange={e =>setEmail(e.target.value)}/>
                </div>
                <div>
                    Password
                    <input className='px-1 m-2 border border-black' type ="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className='m-auto'>
                    <button className='border border-black rounded-md p-1 hover:bg-gray-200' onClick={submit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;