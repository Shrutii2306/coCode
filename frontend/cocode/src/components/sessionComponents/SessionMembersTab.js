import { useSelector } from "react-redux";
import { getUserName } from "../../utils/users";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaChevronDown,FaChevronUp } from "react-icons/fa";

const SessionMembersTab = () => {

    const {hostId,sessionMembers} = useSelector((store) => store.session);
    // console.log("sessionMembers",sessionMembers, hostId)
    const [hostName, setHostName] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {

        setIsVisible(!isVisible);
    } 

    const retreiveNames = async() =>{

        // console.log(typeof hostId)
        const name = await getUserName(hostId)
        setHostName(name);

    }

    useEffect(()=>{

       retreiveNames();

    },[hostId])
    return (

        <div className={`flex flex-col border border-gray-300 text-center px-4 z-20 fixed bottom-0 right-0 bg-gray-100 rounded-t-lg mr-2 shadow-xl transition-all duration-[320ms] delay-[400ms] ease-in-out w-[270px] ${
          isVisible ? 'h-96 ' : 'h-12'} `}>

            <div 
                className="my-3 text-md font-medium flex hover:cursor-pointer items-center justify-between" 
                onClick={toggleVisibility}
            >
                <div className="flex items-center">
                    <FaUsers size={22}/> 
                    <span className="ml-2 mr-4">
                        Session Members
                    </span> 
                </div> 
                
                <div className="">
                    {isVisible?<FaChevronDown/> : <FaChevronUp size={15}/>}
                </div>
             </div>

            { isVisible && 
            <div className="transition ease-in-out delay-150 ">
                <div className="border-t border-gray-200 text-start p-2 ">
                    <span className="font-semibold">Host:</span> {hostName}
                </div>

                <div className="flex flex-col text-start p-2 border-t">
                    <span className="font-semibold mb-1">Members:</span>
                    {sessionMembers && sessionMembers.map((member, index) => {
                        return (
                            <div key={index} className="border-b pb-1">
                            <MemberName userId={member}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            }

        </div>
    )
}

const MemberName = ({userId}) => {

    const [name, setName] = useState('');

    const getName = async() =>{

        // console.log( ".toString()",String(userId))
        const n = await getUserName(userId);
        setName(n);
    }

    useEffect(() => {

        getName();

    },[userId]);
    return(
        <div className="pl-4">
            {name}
        </div>
    )
}
export default SessionMembersTab;