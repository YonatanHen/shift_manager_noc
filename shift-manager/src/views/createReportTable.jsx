import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useEffect } from 'react';


const CreateReportTable = props => {
    let id = 0

    const actionTemplate = (node, column) => {
        return <div>
            <Button type="button" icon="pi pi-search" className="p-button-success" style={{ marginRight: '.5em' }}></Button>
            <Button type="button" icon="pi pi-pencil" className="p-button-warning"></Button>
        </div>;
    }

    return (
        <>
            <DataTable value={!!props.alerts ? props.alerts.map(alert => {
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