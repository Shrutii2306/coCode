import { useLocation, useParams } from "react-router-dom";
import SessionLinkPopUp from "./SessionLinkPopup";
import { useGetSession } from "../utils/sessions";
import { useSelector } from "react-redux";

const Session = () =>{

    const {state} = useLocation();
    console.log(state)
    const session = useGetSession(state.sessionId);
    const {sessionName} = useSelector((store) => store.session)
    return (

        <div>
            <SessionLinkPopUp />
            SessionName : {sessionName}
        </div>
    )

}

export default Session;