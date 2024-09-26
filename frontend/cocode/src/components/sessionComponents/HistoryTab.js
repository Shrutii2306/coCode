import { useSessionHistory } from "../../utils/sessions";


const HistoryTab = () => {

    const {hostHistory, participantHistory} = useSessionHistory();
    // const hostHistory = sessionHistory.hostHistory;

    console.log(hostHistory)
    return(

        <div className="my-5">

            <span className="text-xl font-semibold">History Tab</span>
            <br></br>
            <span className="text-lg font-semibold">Host history</span>
            {hostHistory && hostHistory.map((item,index) =>{

                return(
                    <div key={item.sessionId}>{item.sessionName}</div>
                )
            })}

            <br></br>
            <span className="text-lg font-semibold">Participant history</span>

            {participantHistory && participantHistory.map((item,index) =>{

            return(
                <div key={item.sessionId}>{item.sessionName}</div>
            )
            })}
        </div>
    )
}

export default HistoryTab;