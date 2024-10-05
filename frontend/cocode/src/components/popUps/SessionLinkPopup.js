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


        <div className="bg-gray-200 p-2 w-fit rounded-md">
            {!linkPopup ? 
            <div>
                <button onClick={togglePopup }>
                    <PiShareNetworkDuotone size={15} title="Share link" />
                </button>
                
            </div>
            :
            <div className="flex h-7">
                Share the following <span className="font-semibold mx-1"> Session-ID </span> with others: 
                {sessionId?
                    <span className="font-bold mx-2">{sessionId}</span> :
                    <ShimmerTitleUI width={307}/>
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