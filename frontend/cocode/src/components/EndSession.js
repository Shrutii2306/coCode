import { useDispatch, useSelector } from "react-redux";
import { exitSession } from "../utils/sessions";
import { setSessionStatus } from "../redux/sessionSlice";

const EndSession = () =>{

    const {sessionId} = useSelector((store) => store.session)
    const  dispatch = useDispatch();

    const endSession = async() => {

        const newStatus = await exitSession(sessionId); 
        if(newStatus==true){

            dispatch(setSessionStatus(false));
        }
        else{

            alert("")
        }

    }
    return(

        <div>
            <button onClick={endSession} className="bg-red-600 rounded-md p-1 px-2 shadow-lg hover:bg-white border border-red-600">
                End Session
            </button>
        </div>
    )
}

export default EndSession;