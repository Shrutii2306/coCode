import { SAVE_CODE_URL } from "./constants";
export const saveCodeSnippet = async(code, sessionId, hostId) => {

    const token = await JSON.parse(localStorage.getItem('jwtToken'));
    
    const raw = JSON.stringify({

        hostId: hostId,
        sessionId: sessionId,
        code: code,
    });

    const myHeaders = new Headers();

    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-type','application/json');

    const requestOptions = {

        method : 'POST',
        body: raw,
        headers: myHeaders
    };
    
    try {
        
        const res = await fetch(SAVE_CODE_URL, requestOptions);
        const response = await res.json();

        if(res.ok){

            alert("code saved successfully!");

        }
        else{

            alert("Couldn't save, please try again.");
        }
    } catch (error) {
        
        console.log(error);
        alert('Something went wrong');
    }

}

