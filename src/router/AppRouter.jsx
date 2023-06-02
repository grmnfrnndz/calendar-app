import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {LoginScreen} from "../auth";
import {CalendarScreen} from "../calendar";
import {getEnvVariables} from "../helpers/index.js";
import {useSelector} from "react-redux";
import {useAuthStore} from "../hooks/index.js";

export const AppRouter = () => {
    const authStatus = 'not-authenticated';
    const {status, checkAuthToken} = useAuthStore();

    useEffect(
        () => {
            checkAuthToken();
        },
        []
    );

    if (status === 'checking') {
        return (
            <h3>Loading...</h3>
        )
    }

    return (
        <Routes>
            {
                (status === 'not-authenticated')
                    ? (
                        <>
                            <Route path='/auth/*' element={<LoginScreen/>}/>
                            <Route path='/*' element={<Navigate to='/auth/login'/>}/>
                        </>
                    )
                    : (
                        <>
                            <Route path='/' element={<CalendarScreen/>}/>
                            <Route path='/*' element={<Navigate to='/'/>}/>
                        </>
                    )
            }
        </Routes>
    );
}