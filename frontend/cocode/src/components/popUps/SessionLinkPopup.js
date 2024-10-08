import { useDispatch, useSelector } from "react-redux";
import { SESSION_LINK } from "../../utils/constants";
import { PiCopy } from "react-icons/pi";
import { PiShareNetworkDuotone } from "react-icons/pi";
import { setLinkPopup } from "../../redux/variableSlice";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { ShimmerTitleUI } from "../shimmerUI/ShimmerUI";

const SessionLinkPopUp = () =>{

    const {sessionId} = useSelector((store) => store.session)
    const {linkPopup} = useSelector((store) => store.variables)
    const [isCopied, setIsCopied] = useState(false);
    const dispatch = useDispatch();

    const togglePopup = () => {

        dispatch(setLinkPopup(!linkPopup));

    }

    return (


        <div className="bg-gray-200 p-2 w-fit rounded-md mr-3">
            {!linkPopup ? 
            <div>
                <button onClick={togglePopup }>
                    <PiShareNetworkDuotone size={15} title="Share link" />
                </button>
                
            </div>
            :
            <div className="flex ">
                Share the following Session-ID with others: 
                {sessionId?
                    <span className="font-bold mx-2">{sessionId}</span> :
                    <div className="h-7">
                    <ShimmerTitleUI width={307} marginTop={0} variant={'primary'}/>
                    </div>
                }
                
                <button className="mx-2 my-1" onClick={async() => {await navigator.clipboard.writeText(sessionId);  setIsCopied(true);}}>
                {isCopied? <span className="text-green-600"> Copied! </span>:<PiCopy title="Copy link" size={20}/>}
                </button>
                <button onClick={togglePopup} className=""><RxCross1 size={15} title="Close"/></button>
            </div>
            }
        </div>
    )
}

export default SessionLinkPopUp;