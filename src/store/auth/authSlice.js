import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // authenticated not-authenticated
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state, action) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, {payload}) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, {payload}) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        onClearErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
    }
});


// Action creators are generated for each case reducer function
export const {onChecking, onLogin, onLogout, onClearErrorMessage} = authSlice.actions;