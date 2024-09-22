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

        <div className="flex justify-between border-b border-gray-200 items-center h-14 px-6">
            <div className="text-xl font-semibold">CoCode</div>
            <div className="flex">
                {!token ?
                    <div className="flex">
                        <div style={{padding:'0.5rem',alignContent:'center'}}>
                            <Link to="/login">Login</Link>
                        </div>
                        <div style={{padding:'0.5rem',alignContent:'center'}}>
                            <Link href="/">Signup</Link>
                        </div>
                    </div>
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