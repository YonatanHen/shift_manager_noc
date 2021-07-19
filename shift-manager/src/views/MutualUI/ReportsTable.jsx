import React, { useEffect } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux'
import { getHeaders } from '../../actions/index'

const ReportsTable = props => {
    // let data = null
    // console.log(props)
    // if(props.headers.length == 3) {
    //     data = props.tableData.map((row) => row.slice(0,2))
    // }
    return (
        <DataTable value={props.tableData.map(item => {
            //Will catch both cases
            return {
                'id': item._id,
                'reporter': item.reporter,
                'date': item.time,
                ...item
            }
        })}>
            {props.headers.map((item) => {
                // if(item === 'date') {
                //     return <Column field={item} header={item.toUpperCase()} />
                // }
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
