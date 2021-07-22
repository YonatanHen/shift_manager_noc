import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux'
import { getHeaders } from '../../actions/index'
import { Dialog } from 'primereact/dialog';


const ReportsTable = props => {
    const [selectedRow, selectedRowHandler] = useState(null)
    const [displayDialog, displayDialogHandler] = useState(false)

    // // const onClick = () => {
    // //         displayDialogHandler(true)
    // // }

    // const onHide = () => {
    //         displayDialogHandler(true)
    // }

    return (
        <>
            <DataTable paginator rows={10} stripedRows selectionMode="single" selection={selectedRow} onSelectionChange={e => {
                selectedRowHandler(e.value)
                displayDialogHandler(true)
                console.log(selectedRow) // you can see that when selection is changed, object details printed to the console.
            }} value={props.tableData.map(item => {
                //Will catch both cases
                return {
                    'id': item._id,
                    'reporter': item.reporter,
                    'date': item.time,
                    ...item
                }
            })} >
                {/* <Column expander style={{ width: '5%' }}/> */}
                {props.headers.map((item) => {
                    // if(item === 'date') {
                    //     return <Column field={item} header={item.toUpperCase()} />
                    // }
                    return <Column field={item} sortable header={item.toUpperCase()} />
                })}

            </DataTable>
            <Dialog header="Header" visible={displayDialog} style={{ width: '50vw' }} onHide={() => displayDialogHandler(false)}>
                <p>{selectedRow.id}</p>
            </Dialog>
        </>
    )
}

const mapStatetoProps = (state) => {
    return {

    }
}
const mapDispatchToProps = {
    getHeaders
}



export default connect(mapStatetoProps, mapDispatchToProps)(ReportsTable);
