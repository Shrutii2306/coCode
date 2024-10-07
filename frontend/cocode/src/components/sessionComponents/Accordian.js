import {  useState } from "react";
import { FaChevronDown,FaChevronUp, FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Accordian = ({data, title}) => {

    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    const getSession = (sessionId) => {

        navigate(`/session`,{state:{ sessionId}});
    }
    return (

        <div className="px-4 py-2 border-b-[1px]">
            <div className="flex">
                <button 
                    className="flex justify-between w-[100%] items-center"
                    onClick={()=> setIsVisible(!isVisible)}
                >
                    <div className="text-md font-semibold">{title}</div>
                    <div className="ml-1">
                        {isVisible?<FaChevronUp />:<FaChevronDown />}
                    </div>
                </button>
            </div>
            
            
            {isVisible && data && data.map((item,index) =>{

                return(
                    <div className="pl-2 pr-1 flex flex-col" key={item.sessionId}>
                        <button
                            className="flex items-center hover:font-semibold justify-between "
                            onClick={() => getSession(item.sessionId)}
                        >
                            <span>{item.sessionName}</span>
                            <FaCircle color={item.status ? "green" : "red"}size={10} />
                        </button>

                        <div className="text-xs font-light text-gray-400">
                            {new Date(item.createdAt).toLocaleString("en-IN", 
                            {
                                dateStyle: "short",
                                timeStyle: "short",
                                timeZone: "Asia/Kolkata"
                            })}
                      </div>
                    </div>
                )
                })
            }
        </div>
    )
}

export default Accordian;