import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {onAddNewEvent, onDeleteEvent, onLoadEvent, onSetActiveEvent, onUpdateEvent} from "../store/index.js";
import {calendarApi} from "../api/index.js";
import {convertEventsToDateEvents} from "../helpers/convertEventsToDateEvents.js";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state => state.calendar);
    const {user} = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {
        try {
            if (calendarEvent.id) {
                // update
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({...calendarEvent, user}));
                return;
            }
            // create
            const {data} = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({
                id: data.event.id,
                user,
                ...calendarEvent
            }));
        } catch (err) {
            console.log(err);
            Swal.fire('Error to save', err.response.data.msg, 'error')
        }
    }

    const startDeleteEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());
        } catch (err) {
            console.log(err);
            Swal.fire('Error to delete', err.response.data.msg, 'error')
        }
    }

    const startLoadingEvents = async () => {
        try {
            const {data} = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.events);
            dispatch(onLoadEvent(events));

        } catch (err) {
            console.log('error load events');
            console.log(err);
        }
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        setActiveEvent,
        startDeleteEvent,
        startSavingEvent,
        startLoadingEvents,
    };
}