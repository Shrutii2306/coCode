import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { setNetworkPopup } from "../redux/variableSlice";

const useInternetStatus = () => {

    const [internetStatus, setInternetStatus] = useState(navigator.onLine);
    // const dispatch = useDispatch();

   
    useEffect(() => {


        const toggleNetwork = (status) => {

            setInternetStatus(status);
            console.log("setting value ",status)
            // dispatch(setNetworkPopup(status))
        }
       

        window.addEventListener('offline',() => {

            toggleNetwork(false)

        })
        
        window.addEventListener('online',()=>{

            toggleNetwork(true)
        });

    },[]);


    return internetStatus;
}

export default useInternetStatus;