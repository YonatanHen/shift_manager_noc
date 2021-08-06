import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ReportsTable from './ReportsTable'
import { getReports } from '../actions/index'
import { useDispatch } from 'react-redux'

function Reports(props) {
    useEffect(() => {
         props.getReports()
    }, [])
    console.log(props.reportsData)
    return (
        <>
            <ReportsTable headers={['id', 'reporter', 'date']} tableData={props.reportsData} />
        </>
    )
}

const mapStateToProps = (state) => ({
    reportsData: state.ReportsData
})

const mapDispatchToProps = {
    getReports
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
