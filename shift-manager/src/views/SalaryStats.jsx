import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FormControl } from 'react-bootstrap'
import HoursCalc from '../functions/salaryCalculator'


const Stats = props => {
    const [salaryInput, SalaryInputHandler] = useState(0)
    useEffect(() => {
        HoursCalc(props.user.name)
    }, [])

    const handleOnChangeSalaryInput = async(event) => {
        
        const val = event.target.value ? await parseInt(event.target.value) : 0
        await SalaryInputHandler(val)
    }

    return (
        <>
            <h2>Enter your hourly salary:</h2>
            <FormControl
                value={salaryInput} 
                onChange={handleOnChangeSalaryInput}
            />
            
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.User
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)