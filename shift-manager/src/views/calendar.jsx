import React from 'react'
import { connect } from 'react-redux'
import { Skeleton } from 'primereact/skeleton';
export const Calendar = (props) => {
    return (
        <div className="m-4">
           <Skeleton width="100rem" height="50rem"  />
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
