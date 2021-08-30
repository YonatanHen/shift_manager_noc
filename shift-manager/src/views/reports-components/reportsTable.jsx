import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { connect } from 'react-redux'
import { Dialog } from 'primereact/dialog';
import RenderEventsData from './reportWindow'
import { useEffect } from 'react';

import concatArrays from '../../functions/concatArrays'
import e from 'cors';


const ReportsTable = props => {
    const [selectedRow, selectedRowHandler] = useState(null)
    const [displayDialog, displayDialogHandler] = useState(false)
    const [globalFilter, setGlobalFilter] = useState('')
    const [AlertFilter, setAlertFilter] = useState('')

    useEffect(() => {
        var list = document.getElementsByClassName('p-selectable-row')
        for (let row of list) {
            console.log(row.getElementsByTagName('td')[0].innerHTML)
            if (row.getElementsByTagName('td')[0].innerHTML === '')
                row.style.display = 'none'
            else
                row.style.display = ''
        }
    }, [props.tableData, AlertFilter])

    const renderHeader = () => {
        return (
            <div className="table-header">
                <span className="p-input-icon-right">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global search" style={{ marginRight: 10 }} />
                    <InputText type="search" onInput={(e) => setAlertFilter(e.target.value)} placeholder="Alert search" />
                </span>
            </div>
        );
    }

    return (
        <>
            <DataTable paginator rows={10} stripedRows selectionMode="single" onSelectionChange={e => {
                selectedRowHandler(e.value)
                displayDialogHandler(true)
            }} value={props.tableData.map(item => {
                //Will catch both cases
                const isIncluded = concatArrays(item).filter(alert => alert.title.toUpperCase().includes(AlertFilter.toUpperCase()))
                if (isIncluded.length > 0) return {
                    'id': item._id,
                    'reporter': item.reporter,
                    'date': item.time,
                    ...item
                }
            })}
                header={renderHeader()}
                globalFilter={globalFilter}
            >
                {/* <Column expander style={{ width: '5%' }}/> */}
                {props.headers.map((item) => {
                    return <Column field={item} sortable header={item.toUpperCase()} />
                })}

            </DataTable>
            <Dialog visible={displayDialog} style={{ width: '90vw' }} onHide={() => displayDialogHandler(false)}>
                {selectedRow && (<RenderEventsData row={selectedRow} />)}
            </Dialog>
        </>
    )
}

const mapStatetoProps = (state) => {
    return {
        reportsData: state.ReportsData
    }
}
const mapDispatchToProps = {

}



export default connect(mapStatetoProps, mapDispatchToProps)(ReportsTable);
