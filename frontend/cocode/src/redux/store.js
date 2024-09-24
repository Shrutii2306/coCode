import { configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import variableReducer from './variableSlice';
import sessionReducer from './sessionSlice';

const appStore = configureStore({

    reducer:{

        user : userReducer,
        variables : variableReducer,
        session : sessionReducer 
    }
});

export default appStore;
