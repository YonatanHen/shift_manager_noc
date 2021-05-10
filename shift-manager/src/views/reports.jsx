import React from 'react'
import { connect } from 'react-redux'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import {getReports} from '../actions/index'
import { OverlayPanel } from 'primereact/overlaypanel';
import axios from 'axios'
import moment from 'moment'
export const Reports = (props) => {
    // Renders the time object to simple date
    var dateBody = (option) => {
        return moment(option.time).format('YYYY-MM-DD')
    }
    // Renders delete button on each row
    var actionBody = (rowData) => <Button icon="pi pi-times" className="p-button-rounded p-button-danger" onClick={() => reportDelete(rowData)} />
    // Delete report method
    var reportDelete = () => {

    }
    return (
        <div >
             <div className="w-3/5 text-center m-auto" >
            <DataTable value={props.reports} >
                <Column field="reporter" header="Reporter"></Column>
                <Column field="time" header="Date" body={dateBody}></Column>
                <Column body={actionBody} header="Actions"></Column>

            </DataTable>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    reports: state.Reports
})

const mapDispatchToProps = {
        getReports
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
