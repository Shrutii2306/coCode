import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({

    name: 'session',
    initialState:{
        
        sessionId : "",
        sessionName : "",
        hostName : "",

    },

    reducers:{

        setSession : (state, action) =>{

            console.log(action)
            state.sessionId = action.payload.sessionId;
            state.sessionName = action.payload.sessionName;
        }
    }
});

export default sessionSlice.reducer;
export const {setSession} = sessionSlice.actions;