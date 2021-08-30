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

	// const accept = () => {
	// 	toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
	// };

	const footer = (
		<>
			<Button style={{ marginRight: 10 }}
				label='Submit report!'
				className='p-button-success'
				onClick={handleSubmit}
			/>
			<Button
				label='Clear'
				className='p-button-danger'
				onClick={async () => {
					localStorage.clear()
					await props.setAlerts([])
				}}
			/>
		</>
	)

	return (
		<>
			<DataTable stripedRows selectionMode="single" onSelectionChange={e => {
				selectedRowHandler(props.alerts.find(alert => e.value.id === alert.id))
				displayDialogHandler(true)
			}}
				footer={JSON.parse(localStorage.getItem("alerts")) != null ? footer : undefined}
				value={JSON.parse(localStorage.getItem("alerts")) == null ? [] : JSON.parse(localStorage.getItem("alerts")).map((alert) => {
					return {
						id: id++,
						alert: alert.title,
						environment: alert.environment,
						type: alert.type
					}
				})}
			>
				<Column field='alert' header='Alert title'></Column>
				<Column field='environment' header='Environment'></Column>
				<Column field='type' header='Type'></Column>
				<Column
					// body={actionTemplate}
					style={{ textAlign: 'center', width: '8em' }}
				/>
			</DataTable>
			<Dialog visible={displayDialog} style={{ width: '90vw' }} onHide={() => displayDialogHandler(false)}>
				{selectedRow && (<EditReportScreen row={selectedRow} displayDialogHandler={displayDialogHandler} />)}
			</Dialog>
		</>
	)
}

const mapStateToProps = (state) => ({
	user: state.User
})

const mapDispatchToProps = {
	setAlerts,
	sendReport
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateReportTable)