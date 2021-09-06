import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Skeleton } from 'primereact/skeleton';
import { Calendar } from './shifts-components/calendar'

const Shifts = (props) => {
    console.log(props.shifts)

    const calendar = <Calendar shiftsData={props.shifts}/>
    return (
        <div>
            <div className="m-5">
               {calendar ? calendar : <Skeleton width="100rem" height="50rem" />} 
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    shifts: state.Shifts
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Shifts)
