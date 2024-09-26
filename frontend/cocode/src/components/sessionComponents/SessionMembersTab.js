import { useSelector } from "react-redux";
import { getUserName } from "../../utils/users";
import { useEffect, useState } from "react";

const SessionMembersTab = () => {

    const {hostId,sessionMembers} = useSelector((store) => store.session);
    console.log("sessionMembers",sessionMembers, hostId)
    const [hostName, setHostName] = useState('');

    const retreiveNames = async() =>{

        console.log(typeof hostId)
        const name = await getUserName(hostId)
        setHostName(name);

    }

    useEffect(()=>{

       retreiveNames();

    },[hostId])
    return (

        <div className="w-2/12 border text-center">
            <span className="my-2 text-lg font-semibold flex flex-col">Session Members</span>

            <div className="border border-gray-200 text-start p-2">
                <span className="font-semibold">Host:</span> {hostName}
            </div>

            <div className="flex flex-col text-start p-2">
                <span className="font-semibold">Members:</span>
                {sessionMembers && sessionMembers.map((member, index) => {

                    console.log("member",typeof member);
                    return (
                        <div key={index}>
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