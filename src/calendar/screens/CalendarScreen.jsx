import React, {useEffect, useState} from 'react';

import {Calendar} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {localizer, getMessagesES} from "../../helpers";
import {NavBar, CalendarEvent, CalendarModal, FabAddNew, FabDelete} from "../";
import {useAuthStore, useCalendarStore, useUiStore} from "../../hooks/index.js";

export const CalendarScreen = () => {

    const {user} = useAuthStore();
    const {openDateModal} = useUiStore();
    const {events, setActiveEvent, startLoadingEvents} = useCalendarStore();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    const eventStyleGetter = (event, start, end, isSelected) => {
        const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);

        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }
        return {
            style
        }
    }

    const onDoubleClick = (event) => {
        // console.log({onDoubleClick: event});
        openDateModal();
    }

    const onSelect = (event) => {
        // console.log({onSelect: event});
        setActiveEvent(event);
    }

    const onViewChange = (event) => {
        console.log({onViewChange: event});
        localStorage.setItem('lastView', event);
        setLastView(event);
    }

    useEffect(
        () => {
         startLoadingEvents();
        },
        []
    );

    return (
        <>
            <NavBar/>

            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{height: 500}}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChange}

            />

            <CalendarModal/>
            <FabAddNew/>
            <FabDelete/>
        </>
    );
}