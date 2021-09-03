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
    const [clickedDate, setClickedDate] = useState(null)
    const [input, inputHandler] = useState({
        id: 3,
        start: clickedDate != null ? clickedDate.dateStr + 'T00:00' : '', 
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
        setClickedDate(arg)
        inputHandler({...input, start: arg.dateStr+'T00:00'})
        displayDialogHandler(true)
        // console.log(arg)
    }

    return (
        <>
            <FullCalendar events={data} initialView='dayGridMonth' plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }} editable selectable selectMirror dayMaxEvents
                dateClick={handleDateClick} />
            <Dialog visible={displayDialog} style={{ width: '90vw' }} onHide={() => displayDialogHandler(false)}>
                {clickedDate != null && <AddShiftWindow input={input} inputHandler={inputHandler} clickedDate={clickedDate}/>}
            </Dialog>
        </>
    )
}

export const getEvents = () => {
    return (<></>)
}