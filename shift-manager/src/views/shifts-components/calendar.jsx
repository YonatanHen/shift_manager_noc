import React, { useState, useEffect} from 'react'
import { connect } from 'react-redux'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Dialog } from 'primereact/dialog'

import AddShiftWindow from './addShiftWindow'

import { getShifts } from '../../actions/index';

const Calendar = (props) => {
	const [displayDialog, displayDialogHandler] = useState(false)
	const [input, inputHandler] = useState({
		start: '',
		end: '',
	})

	useEffect(async () => {
        await props.getShifts()
        console.log(props.shifts)
    }, [inputHandler, input])

	const handleDateClick = (arg) => {
		inputHandler({ ...input, start: arg.dateStr + 'T00:00' })
		displayDialogHandler(true)
	}

	return (
		<>
			<FullCalendar
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
			/>
			<Dialog
				visible={displayDialog}
				onHide={() => displayDialogHandler(false)}
			>
				<AddShiftWindow input={input} inputHandler={inputHandler} />
			</Dialog>
		</>
	)
}

const mapStateToProps = (state) => ({
    shifts: state.Shifts
})

const mapDispatchToProps = {
    getShifts,
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)

