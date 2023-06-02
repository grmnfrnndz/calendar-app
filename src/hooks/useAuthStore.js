import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import calendarApi from "../api/calendarApi.js";
import {onChecking, onClearErrorMessage, onLogin, onLogout, onLogoutCalendar} from "../store/index.js";


export const useAuthStore = () => {

    const {status, user, errorMessage} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({email, password}) => {
        dispatch(onChecking());

        try {
            const {data} = await calendarApi.post('/auth', {
                email, password
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}));

        } catch (err) {
            console.log(err);
            dispatch(onLogout('Login Invalid'));
            setTimeout(() => {
                dispatch(onClearErrorMessage());
            }, 10)
        }
    }

    const startRegister = async ({name, email, password}) => {
        dispatch(onChecking());

        try {
            const {data} = await calendarApi.post('/auth/new', {
                name, email, password
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}));

        } catch (err) {
            console.log(err);
            dispatch(onLogout(err.response.data?.msg || 'Register Invalid'));
            setTimeout(() => {
                dispatch(onClearErrorMessage());
            }, 10)
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const {data} = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}));
        } catch (err) {
            console.log(err);
            dispatch(onLogout(err.response.data?.msg || ''));
            setTimeout(() => {
                dispatch(onClearErrorMessage());
            }, 10)
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout());
    }


    return {
        // properties
        errorMessage,
        status,
        user,

        //methods
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    };
}