import React, { useEffect } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux'
import { getHeaders } from '../../actions/index'

const ReportsTable = props => {
    return (
        <DataTable value={props.arr}>
            {props.headers.map((item) => {
                if(item === 'date') {
                    return <Column field={item} header={item.toUpperCase()} />
                }
               return <Column field={item} header={item.toUpperCase()} />
            })}
        </DataTable>
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
