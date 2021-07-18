import React from 'react'
import { connect } from 'react-redux'
import ReportsTable from './MutualUI/ReportsTable'
import { ReportsData } from '../actions/index'

export const Reports = (props) => {
    return (
        <>
            <ReportsTable headers={['id', 'reporter', 'date']}/>
        </>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
