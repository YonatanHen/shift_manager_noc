import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ReportsTable from './reports-components/reportsTable'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'
import HoursCalc from '../functions/salaryCalculator'

import { getReports, updateComments } from '../actions/index'

function Reports(props) {
    useEffect(() => {
        props.getReports()
    }, [props.updateComments])
    console.log(props.reportsData)
    HoursCalc("Yehonatan Hen")
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
    getReports,
    updateComments
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
