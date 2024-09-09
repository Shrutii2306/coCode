import { useEffect } from "react";
import { Link } from "react-router-dom";
const Header = () =>{
    
    
    useEffect(()=>{
        // getUsers();
    },[]);
    return(

        <div className="header">
            <div className="title">CoCode</div>
            <div className="leftMenu">
                <div style={{padding:'0.5rem',alignContent:'center'}}>
                    <Link to="/login">Login</Link>
                </div>
                <div style={{padding:'0.5rem',alignContent:'center'}}>
                    <Link href="/">Signup</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;