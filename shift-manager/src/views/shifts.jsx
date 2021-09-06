import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Skeleton } from 'primereact/skeleton';
import { Calendar } from './shifts-components/calendar'

// import { getShifts } from '../actions/index' 

export const Shifts = (props) => {
    const calendar = <Calendar shiftsData={props.shiftsData}/>

    return (
        <div>
            <div className="m-5">
               {calendar ? calendar : <Skeleton width="100rem" height="50rem" />} 
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    shiftsData: state.Shifts
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Shifts)
