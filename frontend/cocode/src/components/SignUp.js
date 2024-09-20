import React, { useState } from 'react'
import { registerUsers } from '../api/users';
import {Navigate, useNavigate} from "react-router-dom";
export default function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const navigate = useNavigate();
    const submit = async() => {

        const res = await registerUsers({name, email, password});
        alert(res);
        if(res.userId){

            navigate('/home');
        }

    }
  return (
    <div className='text-center pt-6'>
        <div className='text-2xl font-semibold m-2'>SignUp</div>
        <div className='p-2 w-fit m-auto flex flex-col items-start'>
            <div >
                Name: 
                <input className='border border-black m-2' type='text' value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div>
                Email: 
                <input type='text' className='border border-black m-2' value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
                Password: 
                <input type='text' className='border border-black m-2' value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <div>
                Confirm Password: 
                <input type='text' className='border border-black m-2' value={confirmPass} onChange={e => setConfirmPass(e.target.value)}/>
            </div>
            <div className='m-auto'>
                <button className='border border-black p-1 rounded-md hover:bg-gray-200'  onClick={submit}>Submit</button>
            </div>
            
        </div>
        
    </div>
  )
}
