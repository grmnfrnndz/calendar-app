import React from 'react';
import {useCalendarStore, useUiStore} from "../../hooks/index.js";
import {addHours} from "date-fns";

export const FabAddNew = () => {

    const {openDateModal} = useUiStore();
    const {setActiveEvent} = useCalendarStore();

    const onClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'LEPMAH'
            }
        });
        openDateModal();
    }

    return (
        <>
            <button
                className='btn btn-primary fab'
                onClick={onClickNew}
            >
                <i className='fas fa-plus'></i>
            </button>
        </>
    );
}