import { useLocation, useNavigate } from "react-router-dom";
import SessionLinkPopUp from "./popUps/SessionLinkPopup";
import { useGetSession } from "../utils/sessions";
import { useSelector } from "react-redux";
import EndSessionButton from './sessionComponents/EndSession';
import { loggedInUser } from "../utils/users";
import { useEffect } from "react";
import SessionMembersTab from "./sessionComponents/SessionMembersTab";
import TextEditor from "./editor/TextEditor";
import SessionTitle from "./sessionComponents/SessionTitle";
import { ShimmerTitleUI } from "./shimmerUI/ShimmerUI";
import { VscSaveAll } from "react-icons/vsc";

const Session = () =>{

    const navigate = useNavigate();
    const {state} = useLocation();
    const sessionId = state?.sessionId;
    const session = useGetSession(sessionId);
    const {sessionName, sessionStatus} = useSelector((store) => store.session)
    const {savedAt, savedBy, isLoading} = useSelector((store) => store.codeSnippet);
   
    useEffect(()=>{

        const isUserLoggedIn = async() => {

            const res = await loggedInUser();
    
            if(res==null){
    
                navigate('/login');
            }
        }
        isUserLoggedIn();
    },[]);
    
    useEffect(() => {

        if(sessionId==null){

            alert('No active session!');
            navigate('/home');
        }
    },[sessionId])
    return (

        <div>
        <div className="justify-between pl-3 ">
            
            <div className="flex flex-col relative z-10">
                <div className="mx-auto my-3 flex w-[100%] px-7">
                    <SessionTitle title={sessionName} status={sessionStatus} />
                    {sessionStatus && <div className="self-end">
                        <EndSessionButton />
                    </div>}
                    
                </div>
                <SessionLinkPopUp />
                {!isLoading  ? <div className="text-sm mt-5 flex items-center">
                    <span className="mx-2"><VscSaveAll size={22}/></span>
                    {savedAt!='' && `Last saved at ${new Date(savedAt).toLocaleString("en-IN", 
                    {
                        timeStyle: "short",
                        dateStyle: "short",
                        timeZone: "Asia/Kolkata"
                    })}`}
                    </div>:
                    
                    <div className="h-5">
                        <ShimmerTitleUI width={360} marginTop={18} variant={'secondary'}/>
                    </div>
                }
                <TextEditor sessionId={sessionId}/>
                
            </div>
            </div>
            <SessionMembersTab/>
        </div>
    )

}

export default Session;