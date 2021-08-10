import React, { useRef, useState } from 'react'
import axios from 'axios'
import { connect, useStore } from 'react-redux'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button'
import { setAlerts, sendReport } from '../../actions/index'
import EditReportScreen from './editReport'


function CreateReportTable(props) {
	const [selectedRow, selectedRowHandler] = useState(null)
	const [displayDialog, displayDialogHandler] = useState(false)
	let id = 0

	const toast = useRef(null);

	const handleSubmit = async () => {
		await props.setAlerts([])
		props.sendReport(props.alerts, props.user ? props.user.given_name + ' ' + props.user.family_name : 'NOC')
	}

	const accept = () => {
		toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
	};

	const footer = (
		<Button
			label='Submit report!'
			className='p-button-success'
			onClick={handleSubmit}
			accept={accept}
		/>
	)

	const actionTemplate = (node, column) => {
		return (
			<div>
				<Button
					type='button'
					icon='pi pi-pencil'
					className='p-button-warning'
				></Button>
			</div>
		)
	}

	return (
		<>
			<DataTable stripedRows selectionMode="single" onSelectionChange={e => {
				selectedRowHandler(e.value)
				displayDialogHandler(true)
			}}
				footer={props.alerts.length != 0 ? footer : undefined}
				value={props.alerts.map((alert) => {
					return {
						id: id++,
						alert: alert.title,
						environment: alert.environment,
					}
				})}
			>
				<Column field='alert' header='Alert title'></Column>
				<Column field='environment' header='Environment'></Column>
				<Column
					body={actionTemplate}
					style={{ textAlign: 'center', width: '8em' }}
				/>
			</DataTable>
			<Dialog visible={displayDialog} style={{ width: '90vw' }} onHide={() => displayDialogHandler(false)}>
				{selectedRow && (<EditReportScreen row={selectedRow} />)}
			</Dialog>
		</>
	)
}

const mapStateToProps = (state) => ({
	alerts: state.alertsData,
	user: state.User
})

const mapDispatchToProps = {
	setAlerts,
	sendReport
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateReportTable)