import { useDispatch, useSelector } from "react-redux";
import { setSessionPopup } from "../../redux/variableSlice";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { getNewSession } from "../../utils/sessions";
import { useNavigate } from "react-router-dom";

const SessionPopUp = () =>  {

    const {sessionPopup} = useSelector((store) => store.variables);
    const dispatch = useDispatch();
    const [sessionName, setSessionName] = useState('');
    const [maxParticipant, setMaxParticipant] = useState(1);
    const navigate = useNavigate();
    const togglePopup = () => {

        dispatch(setSessionPopup(!sessionPopup));
    }

    const createSession = async() =>{

        if( !sessionName || !maxParticipant){

            alert("All fields are required!");
            return;
        }

        const res = await getNewSession({sessionName, maxParticipant});
        const sessionId = res.sessionInfo.sessionId;
        navigate(`/session/${sessionId}`,{state :{ sessionId : sessionId, sessionLink : "http://localhost:3000/session/"+sessionId }});

    }

    return (
        
        <div style={{display: sessionPopup?"block":"none"}} className="h-fit w-fit bg-gray-200 m-auto pb-5 rounded-lg shadow-lg">
            <div className="flex justify-between" >
                <div className="w-11/12 text-center mt-2 text-lg font-semibold">
                    Create new session
                </div>
                <div className="w-1/12 pt-1">
                    <button onClick={togglePopup} className=""><RxCross1 size={15} title="Close"/></button>
                </div>
            </div>
            
            <div className="flex flex-col content-start mx-5">
                <div className="flex py-2">
                    <span>Session Name : </span><input type="text" className="mx-2 px-1" value={sessionName} onChange={(e) => setSessionName(e.target.value)}/>
                </div>
                
                <div className="flex py-2">
                    <span>Number of Participants : </span><input type="number" className="mx-2 px-1" value ={maxParticipant} onChange={(e) => setMaxParticipant(e.target.value)}/>
                </div>
            </div>

            <button onClick={createSession} className="mx-auto my-2 py-1 px-2 border border-black rounded-md hover:bg-gray-300 ">Join</button>
        </div>
    )
}

export default SessionPopUp;