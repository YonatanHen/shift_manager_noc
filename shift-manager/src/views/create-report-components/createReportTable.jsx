import React, { useRef } from 'react'
import axios from 'axios'
import { connect, useStore } from 'react-redux'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { setAlerts, sendReport } from '../../actions/index'
import { useCallback } from 'react'


function CreateReportTable(props) {
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
					icon='pi pi-search'
					className='p-button-success'
					style={{ marginRight: '.5em' }}
				></Button>
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
			<DataTable
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