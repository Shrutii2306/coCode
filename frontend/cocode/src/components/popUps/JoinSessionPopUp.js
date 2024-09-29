import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setJoinSessionPopup } from "../../redux/variableSlice";
import { useState } from "react";
import { checkSessionId, joinSession } from "../../utils/sessions";
import { useNavigate } from "react-router-dom";

const JoinSessionPopUp = () =>{

    const {joinSessionPopup} = useSelector((store) => store.variables);
    const dispatch = useDispatch();
    const [sessionId, setSessionId] = useState('');
    const navigate = useNavigate();
    const togglePopup = () =>{

        dispatch(setJoinSessionPopup(!joinSessionPopup));
    }

    const sessionJoiner = async() => {
        
        const res = await joinSession(sessionId);
        if(res){

            navigate(`/session`,{state :{ sessionId}});
        }
    }

    return (
        <div style={{display: joinSessionPopup? "block":"none"}} className="mt-5 h-fit w-fit bg-gray-200 m-auto pb-5 rounded-lg shadow-lg">
            <div className="flex justify-between" >
                <div className="w-11/12 text-center mt-2 text-lg font-semibold">
                    Join session
                </div>
                <div className="w-1/12 pt-1">
                    <button onClick={togglePopup} className=""><RxCross1 size={15} title="Close"/></button>
                </div>
            </div>
            <div  className="flex content-start mx-5 my-2 mt-4">
                Enter session Id: <input type="text" className="px-2 mx-2" value={sessionId} onChange={(e) => setSessionId(e.target.value)}/>
            </div>
            <button onClick={sessionJoiner} className="mx-auto my-2 py-1 px-2 border border-black rounded-md hover:bg-gray-300 ">Join</button>

        </div>
    )
}

export default JoinSessionPopUp;