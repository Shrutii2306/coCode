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

        <div>
            Register
            <div>
                Email
                <input type='text' value={email} onChange={e =>setEmail(e.target.value)}/>
            </div>
            <div>
                Password
                <input type ="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <button onClick={submit}>
                Submit
            </button>
        </div>
    )
}

export default Login;