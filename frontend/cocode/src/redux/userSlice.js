import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

    name:'user',
    initialState:{
        name:'user',
        email:'',
        uid : ''
    },
    reducers:{

        setUser : (state, action) => {

            console.log("action.payload",action.payload)
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.uid = action.payload.uid;
        }
    }
});

export default userSlice.reducer;
export const { setUser} = userSlice.actions;
