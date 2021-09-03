import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Skeleton } from 'primereact/skeleton';
import { Calendar } from './shifts-components/calendar'

export const Shifts = (props) => {
    const calendar = <Calendar />
    return (
        <div>
            <div className="m-5">
               {calendar ? calendar : <Skeleton width="100rem" height="50rem" />} 
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Shifts)
