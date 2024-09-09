import {useState}  from 'react';
const Login = () =>{

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const submit = () => {

        console.log(email,password);
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