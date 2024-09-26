import { useLocation, useNavigate, useParams } from "react-router-dom";
import SessionLinkPopUp from "./popUps/SessionLinkPopup";
import { useGetSession } from "../utils/sessions";
import { useSelector } from "react-redux";
import EndSessionButton from './sessionComponents/EndSession';
import { FaCircle } from "react-icons/fa";
import { useLoggedInUser } from "../utils/users";
import { useEffect } from "react";
import HistoryTab from "./sessionComponents/HistoryTab";
import SessionMembersTab from "./sessionComponents/SessionMembersTab";

const Session = () =>{

    const isUser = useLoggedInUser();
    const navigate = useNavigate();
    const {state} = useLocation();
    const sessionId = state.sessionId;
    const session = useGetSession(sessionId);
    console.log(session)
    const {sessionName, sessionStatus} = useSelector((store) => store.session)
    
    

    useEffect(()=>{
        
        // useGetSession(sessionId);
    },[])
    
    return (

        <div className="flex ">
            <div className="w-10/12">
            <SessionLinkPopUp />
                <div className="flex">
                    SessionName : {sessionName} 
                    <div className="px-1 py-[6px]">
                        <FaCircle color={sessionStatus ? "green" : "red"}size={12} />
                    </div>
                </div>
                <EndSessionButton />
            </div>
            <SessionMembersTab/>
        </div>
    )

}

export default Session;