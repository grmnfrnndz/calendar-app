import {configureStore} from '@reduxjs/toolkit'
import {uiSlice} from "./ui/uiSlice.js";
import {calendarSlice} from "./calendar/calendarSlice.js";
import {authSlice} from "./auth/authSlice.js";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

})