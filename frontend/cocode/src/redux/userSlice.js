import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

    name:'user',
    initialState:{
        name:'user',
        email:''
    },
    reducers:{

        setUser : (state, action) =>{

            state.name = action.payload.name;
            state.email = action.payload.email;
        }
    }
});

export default userSlice.reducer;
export const { setUser} = userSlice.actions;
