import React, { useCallback, useEffect } from 'react'
import { connect, useStore } from 'react-redux'
import { Container, Row, Col, InputGroup, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap'
import { useState } from 'react'
import { setAlerts } from '../actions/index'
import { Toast } from 'primereact/toast';

import CreateReportTable from './create-report-components/createReportTable'


import './css/createReports.css'

const PRODUCTION = 'production'
const STAGING = 'staging'


const initialInput = {
    id: 0,
    title: '',
    content: '',
    calledEmployee: '',
    time: undefined,
    environment: undefined
}


function CreateReport(props) {
    const [input, inputHandler] = useState(initialInput)
    const [id, idHandler] = useState(0)
    const date = new Date().toLocaleString("en-US", {timeZone: "Asia/Jerusalem"})

    useEffect(() => {
        inputHandler({ ...input, id: id, time: date })
    }, [id])

    const handleOnChange = (event) => {
        if (event.target.name === 'title') {
            inputHandler({ ...input, title: event.target.value })
        }
        else if (event.target.name === 'call') {
            inputHandler({ ...input, calledEmployee: event.target.value })
        }
        else {
            inputHandler({ ...input, content: event.target.value, time: date })
        }
    }

    const initiazlizeInput = () => {
        document.querySelectorAll('textarea').forEach(textarea => textarea.value = '')
        inputHandler(initialInput)
    }

    const addAlertHandler = (isAlert) => {
        if (input.title === '' || input === initialInput) {
            alert('You must insert a title and an environemnet!')
            return
        }

        else {
            switch (input.environment) {
                case undefined:
                    alert('You must insert an environement!')
                    return
                default:
                    if (isAlert) {
                        props.setAlerts([...props.alertsData, {...input, type: 'Alert'}])
                    } else {
                        props.setAlerts([...props.alertsData, {...input, type: 'Follow'}])
                    }
                    idHandler(x => x + 1)
                    break
            }
        }
        console.log(props.alertsData)

        //Clear on submit
        initiazlizeInput()
    }

    return (
        <div>
            <Container style={{ width: '100%' }}>
                <Row style={RowStyle}>
                    Alert:
                </Row>
                <Row style={RowStyle}>
                    <InputGroup>
                        <Form.Control as="textarea" name="title" style={{ height: 120 }} onChange={handleOnChange} />
                    </InputGroup>
                </Row>
                <Row style={RowStyle}>
                    Alert info:
                </Row>
                <Row style={RowStyle}>
                    <InputGroup>
                        <Form.Control as="textarea" name="content" style={{ height: 100 }} onChange={handleOnChange} />
                    </InputGroup>
                </Row>
                <Row style={RowStyle}>
                    In case you made a call, enter the name of the employee you called:
                </Row>
                <Row style={RowStyle}>
                    <InputGroup>
                        <Form.Control as="textarea" name="call" onChange={handleOnChange} />
                    </InputGroup>
                </Row>
                <Row style={RowStyle}>
                    Chosen environement:
                </Row>
                <Row style={RowStyle}>
                <Form.Control type="text" placeholder={input.environment} readOnly />
                </Row>
                <Row style={RowStyle}>
                    <DropdownButton title="Environment" style={{ marginRight: 30 }} variant='info'>
                        <Dropdown.Item onSelect={() => inputHandler({ ...input, environment: PRODUCTION })}>Production</Dropdown.Item>
                        <Dropdown.Item onSelect={() => inputHandler({ ...input, environment: STAGING })}>Staging</Dropdown.Item>
                    </DropdownButton>
                    <Button style={{ marginRight: 30 }} onClick={() => addAlertHandler(true)} variant='info'>Add Alert</Button>
                    <Button onClick={() => addAlertHandler(false)} variant='info'>Add Follow</Button>
                </Row>
            </Container>

            <CreateReportTable alertsArray={props.alertsData} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    alertsData: state.alertsData
})

const mapDispatchToProps = {
    setAlerts
}

const RowStyle = {
    marginBottom: 5
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateReport)
