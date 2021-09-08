import React from 'react'
import { connect } from 'react-redux'
import { Skeleton } from 'primereact/skeleton';
import Calendar from './shifts-components/calendar'

const Shifts = (props) => {

    return (
        <div>
            <div className="m-5">
               {<Calendar/> ? <Calendar/> : <Skeleton width="100rem" height="50rem" />} 
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
