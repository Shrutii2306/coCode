import { useLocation, useParams } from "react-router-dom";
import SessionLinkPopUp from "./SessionLinkPopup";
import { useGetSession } from "../utils/sessions";
import { useSelector } from "react-redux";
import EndSessionButton from './EndSession';
import { FaCircle } from "react-icons/fa";

const Session = () =>{

    const {state} = useLocation();
    console.log(state)
    const session = useGetSession(state.sessionId);
    const {sessionName, sessionStatus} = useSelector((store) => store.session)
    return (

        <div>

            <SessionLinkPopUp />

            <div className="flex">
                SessionName : {sessionName} 
                <div className="px-1 py-[6px]">
                    <FaCircle color={sessionStatus ? "green" : "red"}size={12} />
                </div>
         
            </div>
            <EndSessionButton />
        </div>
    )

}

export default Session;