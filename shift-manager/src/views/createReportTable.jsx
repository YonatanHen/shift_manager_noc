import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useEffect } from 'react';


const CreateReportTable = props => {
    let id = 0

    const handleSubmit = async () => {
        //Axios request - add new reports
        await localStorage.clear()
    }

    const footer = <Button label="Submit report!" className="p-button-success" onClick={handleSubmit} />

    const actionTemplate = (node, column) => {
        return <div>
            <Button type="button" icon="pi pi-search" className="p-button-success" style={{ marginRight: '.5em' }}></Button>
            <Button type="button" icon="pi pi-pencil" className="p-button-warning"></Button>
        </div>;
    }

    return (
        <>
            <DataTable footer={localStorage.getItem('alerts') != '[]' ? footer : undefined} value={!!localStorage.getItem('alerts') ? JSON.parse(localStorage.getItem('alerts')).map(alert => {
                return {
                    'id': id++,
                    'alert': alert.alert,
                    'environment': alert.environment
                }
            }) : undefined}>
                <Column field="alert" header="Alert title"></Column>
                <Column field="environment" header="Environment"></Column>
                <Column body={actionTemplate} style={{ textAlign: 'center', width: '8em' }} />
            </DataTable>
        </>
    )
}


export default CreateReportTable