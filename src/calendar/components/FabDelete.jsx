import React from 'react';
import {useCalendarStore, useUiStore} from "../../hooks/index.js";

export const FabDelete = () => {

    const {startDeleteEvent, hasEventSelected} = useCalendarStore();

    const onDeleteEvent = () => {
        startDeleteEvent().then();
    };

    return (
        <>
            <button
                className='btn btn-danger fab-danger'
                onClick={onDeleteEvent}
                style={{
                    display: (hasEventSelected) ? '': 'none'
                }}
            >
                <i className='fas fa-trash-alt'></i>
            </button>
        </>
    );
}