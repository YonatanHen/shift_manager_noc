import React, { useState } from 'react'

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog } from 'primereact/dialog';

import AddShiftWindow from './addShiftWindow'

import axios from 'axios'
import { useEffect } from 'react';


export const Calendar = props => {
    const [displayDialog, displayDialogHandler] = useState(false)
    const [input, inputHandler] = useState({
        id: 3,
        start: '', 
        end: ''
    })

    useEffect(() => {
        
    }, [inputHandler])

    const data =
        [
            { "id": 1, "title": "All Day Event", "start": "2021-09-01" },
            { "id": 2, "title": "Long Event", "start": "2021-09-07", "end": "2021-09-10" },
        ]
    const handleDateClick = (arg) => {
        inputHandler({...input, start: arg.dateStr+'T00:00'})
        displayDialogHandler(true)
    }

    return (
        <>
            <FullCalendar events={data} initialView='dayGridMonth' plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }} editable selectable selectMirror dayMaxEvents
                dateClick={handleDateClick} />
            <Dialog visible={displayDialog}  onHide={() => displayDialogHandler(false)}>
                <AddShiftWindow input={input} inputHandler={inputHandler}/>
            </Dialog>
        </>
    )
}

export const getEvents = () => {
    return (<></>)
}