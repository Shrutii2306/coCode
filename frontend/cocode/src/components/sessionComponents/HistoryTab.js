import { useSessionHistory } from "../../utils/sessions";
import Accordian from "./Accordian";


const HistoryTab = () => {

    const {hostHistory, participantHistory} = useSessionHistory();
    // const hostHistory = sessionHistory.hostHistory;

    // console.log(hostHistory)
    return(

        <div className="py-3 w-2/12 border border-gray-400 border-b-0 border-t-0">

            <div className="text-xl font-semibold px-3 border-b-2 pb-2">History</div>

            <Accordian data={hostHistory} title="Hosted Sessions"/>
            
            <Accordian data={participantHistory} title="Other Sessions"/>
        </div>
    )
}

export default HistoryTab;