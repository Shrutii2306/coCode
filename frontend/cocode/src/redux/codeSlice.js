import { createSlice } from "@reduxjs/toolkit";

const codeSlice = createSlice({

    name: 'codeSnippet',
    initialState:{

        codeSnippet : '',
        savedAt : Date.now(),
        savedBy : '',
        isLoading : false

    },

    reducers:{

        setData : (state, action) => {

            state.savedAt = action.payload.savedAt;
            state.savedBy = action.payload.savedBy;
        },
        setLoader : (state, action) => {

            state.isLoading = action.payload;
        }
    }
})

export default codeSlice.reducer;

export const {setData, setLoader} = codeSlice.actions;