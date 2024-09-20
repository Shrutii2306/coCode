import {useState}  from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/users';

const Login = () =>{

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const submit = async() => {

        const res = await loginUser({email, password});

        if(res.userId){

            navigate('/home');
        }
        else{

            alert(res.message);
        }
    }

    return(

        <div className='text-center pt-6'>
            <span className='text-2xl font-semibold p-2'>Login</span>
            <div className='flex flex-col items-start w-fit m-auto'>
                <div>
                    Email
                    <input className='m-2 border border-black' type='text' value={email} onChange={e =>setEmail(e.target.value)}/>
                </div>
                <div>
                    Password
                    <input className='m-2 border border-black' type ="password" value={password} onChange={e => setPassword(e.target.value)}/>
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