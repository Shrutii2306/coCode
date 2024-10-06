import { useSelector } from "react-redux";
import { getUserName } from "../../utils/users";
import { useEffect, useState } from "react";

const SessionMembersTab = () => {

    const {hostId,sessionMembers} = useSelector((store) => store.session);
    // console.log("sessionMembers",sessionMembers, hostId)
    const [hostName, setHostName] = useState('');

    const retreiveNames = async() =>{

        // console.log(typeof hostId)
        const name = await getUserName(hostId)
        setHostName(name);

    }

    useEffect(()=>{

       retreiveNames();

    },[hostId])
    return (

        <div className="border-l text-center px-4">
            <span className="my-2 text-lg font-semibold flex flex-col">Session Members</span>

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