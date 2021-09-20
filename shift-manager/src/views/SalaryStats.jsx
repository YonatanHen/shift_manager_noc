import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container, FormControl } from 'react-bootstrap'
import HoursCalc from '../functions/salaryCalculator'


const Stats = props => {
    const [salaryInput, SalaryInputHandler] = useState(0)
    const [data, dataHandler] = useState({})

    useEffect(async() => {
        await dataHandler(await HoursCalc(props.user.name, salaryInput))
    }, [salaryInput])

    const handleOnChangeSalaryInput = async (event) => {

        const val = event.target.value ? await parseInt(event.target.value) : 0
        await SalaryInputHandler(val)
    }

    return (
        <>
            <Container>
                <h5>Enter your hourly salary:</h5>
                <FormControl
                    value={salaryInput}
                    onChange={handleOnChangeSalaryInput}
                    style={{ width: '30%', marginBottom: '1%', marginTop: '1%'}}
                />
                <h5>Total Hours: {data.totalHours}</h5> 
                <h5>Current Salary: {data.salary}</h5>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.User
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)