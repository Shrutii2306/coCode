import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Header = () =>{
    
    const token = localStorage.getItem("jwtToken");
    const navigate = useNavigate();

    const logout = () =>{

        localStorage.removeItem('jwtToken');
        navigate('/login');
    }

    useEffect(()=>{
        // getUsers();
    },[]);

    return(

        <div className="header">
            <div className="title">CoCode</div>
            <div className="leftMenu">

                { !token?
                    <>
                        <div style={{padding:'0.5rem',alignContent:'center'}}>
                            <Link to="/login">Login</Link>
                        </div>
                        <div style={{padding:'0.5rem',alignContent:'center'}}>
                            <Link href="/">Signup</Link>
                        </div>
                    </>
                        :
                        <div style={{padding:'0.5rem',alignContent:'center'}}>
                            <button onClick={logout}>Logout</button>
                        </div>
                }
                
            </div>
        </div>
    )
}

export default Header;