import { createSlice } from "@reduxjs/toolkit";

const variableSlice = createSlice({

    name : 'variables',
    initialState:{

        sessionPopup : false,
        linkPopup : true,
        joinSessionPopup : false,
        networkPopup : false,
    },

    reducers:{

        setSessionPopup : (state, action) => {

            state.sessionPopup = action.payload;
        },

        setLinkPopup : (state, action) => {

            state.linkPopup = action.payload;
        },

        setJoinSessionPopup : (state, action) => {

            state.joinSessionPopup = action.payload;
        },

        setNetworkPopup : (state, action) => {

            state.networkPopup = action.payload;
        }
    }
})

export default variableSlice.reducer;

export const {setSessionPopup, setLinkPopup, setJoinSessionPopup, setNetworkPopup} = variableSlice.actions;