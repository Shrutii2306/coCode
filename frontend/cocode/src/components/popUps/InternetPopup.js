import { useSelector } from 'react-redux';
import WIFI_IMAGE from '../../assets/wifi.png';
import useInternetStatus from "../../utils/useInternetStatus";

const InternetPopup = () => {

    const status = useInternetStatus();

    return (

        <div className={`z-10 absolute  w-[100%] h-[100%] ${ status==false? 'block':'hidden'}`}>
            <div className="z-0 absolute bg-gray-700 opacity-50 w-[100%]  h-[100%]">
            </div>
            <div className={`z-10 px-5 py-5 relative rounded-md w-fit mt-[15%] mx-auto ${ status==false? 'bg-red-300':'bg-green-300'} `} >
                
                <img src={WIFI_IMAGE} className='h-14 mx-auto'/>
                
                {status==false? 
                <div className='text-center'>
                    <h1 className='text-xl font-semibold'>Looks like you are offline</h1>
                    Please check your internet connection.
                </div>
                 : "Reconnecting... Please refresh your page..."}
            </div>
        </div>
       
        
    )

}

export default InternetPopup;