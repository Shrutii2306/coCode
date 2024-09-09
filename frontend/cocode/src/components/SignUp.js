import React, { useState } from 'react'
import { registerUsers } from '../api/users';

export default function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const submit = () => {

        registerUsers({name, email, password});
    }
  return (
    <div>
        <div>SignUp</div>
        <div>
            Name: 
            <input type='text' value={name} onChange={e => setName(e.target.value)}/>
        </div>
        <div>
            Email: 
            <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div>
            Password: 
            <input type='text' value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <div>
            Confirm Password: 
            <input type='text' value={confirmPass} onChange={e => setConfirmPass(e.target.value)}/>
        </div>
        <button onClick={submit}>Submit</button>
    </div>
  )
}
