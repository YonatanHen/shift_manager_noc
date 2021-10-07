import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Container, FormControl } from 'react-bootstrap'
import HoursCalc from '../functions/salaryCalculator'
import ReactToPdf from 'react-to-pdf'


const Stats = props => {
    const [salaryInput, SalaryInputHandler] = useState(0)
    const [data, dataHandler] = useState({})
    const [isClicked, setIsClicked] = useState(false)

    const ref = React.createRef()

    const clickHandler = () => {
        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 2000)
    }

    useEffect(async () => {
        await dataHandler(await HoursCalc(sessionStorage.getItem('name'), salaryInput))
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
                    style={{ width: '30%', marginBottom: '1%', marginTop: '1%' }}
                />
                {data.hoursCounter ? (
                    <div style={{ border: '2px solid black', width: '40%'}}>
                        <div style={{ marginLeft: '1%'}}>
                            <h5>Current Salary: {data.salary}</h5>
                            <div ref={ref}>
                                {isClicked && <h2>{sessionStorage.getItem('name') + ' report ' + new Date().toLocaleString()}</h2>}
                                <h5>Total Hours: {data.totalHours}</h5>
                                <h5>Morning hours: {data.hoursCounter.morning}</h5>
                                <h5>Noon hours: {data.hoursCounter.noon}</h5>
                                <h5>night hours: {data.hoursCounter.night}</h5>
                                <h5>Friday morning hours: {data.hoursCounter.fridayMorning}</h5>
                                <h5>Friday noon hours: {data.hoursCounter.fridayNoon}</h5>
                            </div>
                        </div>
                    </div>) :
                    (<h5>Loading...</h5>)}
                <div style={{ marginTop: 10 }}>
                    <ReactToPdf targetRef={ref} filename={`${sessionStorage.getItem('name')} report.pdf`} x={.5} y={.5} scale={0.8}>
                        {({ toPdf }) => (
                            <Button onClick={() => {toPdf(); clickHandler();}} variant="info">Generate Report to PDF</Button>
                        )}
                    </ReactToPdf>
                </div>
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