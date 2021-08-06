import React, { Component } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


const CreateReportTable = props => {
    let key = 0

    const actionTemplate = (node, column) => {
        return <div>
            <Button type="button" icon="pi pi-search" className="p-button-success" style={{ marginRight: '.5em' }}></Button>
            <Button type="button" icon="pi pi-pencil" className="p-button-warning"></Button>
        </div>;
    }

    return (
        <>
        {/* value should be an array of json objects */}
            <TreeTable value={[{key: key++, data: {name: 'abc', size:'500', type:'a'}}, 'efg', 'abc']}>
                <Column field="title" header="Alert title" expander></Column>
                <Column field="environment" header="Environment"></Column>
                <Column body={actionTemplate} style={{ textAlign: 'center', width: '8em' }} />
            </TreeTable>
        </>
    )
}


export default CreateReportTable