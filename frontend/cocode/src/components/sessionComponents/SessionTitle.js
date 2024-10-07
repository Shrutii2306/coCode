import { FaCircle } from "react-icons/fa";
import { ShimmerTitleUI } from "../shimmerUI/ShimmerUI";

const SessionTitle = ({title, status}) => {

    return (

        <div className="flex items-center m-auto">
            Session Name : 
            {title ? 
                <div className="flex px-2  font-semibold text-lg items-center">
                    {title}
                    <div className="px-1 py-[6px]">
                        <FaCircle color={status ? "green" : "red"}size={12} />
                    </div>
                </div>: 
                <ShimmerTitleUI width={150} marginTop={20} variant={'primary'}/>
            } 
        </div>
    )
    
}

export default SessionTitle;