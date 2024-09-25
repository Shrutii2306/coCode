import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({

    name: 'session',
    initialState:{
        
        sessionId : "",
        sessionName : "",
        hostName : "",
        sessionStatus: "",
    },

    reducers:{

        setSession : (state, action) =>{

            state.sessionId = action.payload.sessionId;
            state.sessionName = action.payload.sessionName;
            state.sessionStatus = action.payload.sessionStatus;
        },

        setSessionStatus : (state, action) =>{

            state.sessionStatus = action.payload.sessionStatus;
        },
    }
});

export default sessionSlice.reducer;
export const {setSession, setSessionStatus} = sessionSlice.actions;