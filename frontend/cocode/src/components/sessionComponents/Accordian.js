import { useEffect, useState } from "react";
import { FaChevronDown, FaCircle } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Accordian = ({data, title}) => {

    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    const getSession = (sessionId) => {

        navigate(`/session/${sessionId}`,{state:{ sessionId}});
    }
    return (

        <div className="px-4 py-2 border-b-[1px]">
            <div className="flex justify-between">
                <span className="text-md font-semibold">{title}</span>
                <button 
                    onClick={()=> setIsVisible(!isVisible)}
                >
                    {isVisible?<FaChevronUp />:<FaChevronDown />}
                </button>
            </div>
            
            
            {isVisible && data && data.map((item,index) =>{

                return(
                    <div className="pl-2 pr-1 flex flex-col" key={item.sessionId}>
                        <button
                            className="flex items-center over:font-semibold justify-between "
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