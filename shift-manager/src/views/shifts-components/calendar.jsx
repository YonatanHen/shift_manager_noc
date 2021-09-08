import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Dialog } from 'primereact/dialog'

import AddShiftWindow from './addShiftWindow'

import { getShifts, deleteShift } from '../../actions/index';

const Calendar = (props) => {
    const [displayDialog, displayDialogHandler] = useState(false)
    const [input, inputHandler] = useState({
        start: '',
        end: '',
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(async () => {
        await props.getShifts()
    }, [inputHandler, input, props.deleteShift, props.getShifts, props.shifts, FullCalendar])

    const handleDateClick = (arg) => {
        inputHandler({ ...input, start: arg.dateStr + 'T00:00' })
        displayDialogHandler(true)
    }

    return (
        <>
            {!isLoading ? (<FullCalendar
                events={props.shifts}
                initialView='dayGridMonth'
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                editable
                selectable
                selectMirror
                dayMaxEvents
                dateClick={handleDateClick}
                eventClick={info => {
                    if (window.confirm("Are you sure that you want to delete this shift?")) {
                        setIsLoading(true)
                        props.deleteShift(info.event.extendedProps._id)
                        setIsLoading(false)
                    }
                }}
            />) : (<h1>loading...</h1>)}
            <Dialog
                visible={displayDialog}
                onHide={() => displayDialogHandler(false)}
            >
                <AddShiftWindow input={input} inputHandler={inputHandler} displayDialogHandler={displayDialogHandler} setIsLoading={setIsLoading} />
            </Dialog>
        </>
    )
}

const mapStateToProps = (state) => ({
    shifts: state.Shifts
})

const mapDispatchToProps = {
    getShifts,
    deleteShift
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)

