import { configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import variableReducer from './variableSlice';
import sessionReducer from './sessionSlice';
import codeReducer from './codeSlice';
const appStore = configureStore({

    reducer:{

        user : userReducer,
        variables : variableReducer,
        session : sessionReducer,
        codeSnippet : codeReducer 
    }
});

export default appStore;
