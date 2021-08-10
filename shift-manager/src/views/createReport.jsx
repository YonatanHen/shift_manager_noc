import React, { useCallback, useEffect } from 'react'
import { connect, useStore } from 'react-redux'
import { Container, Row, Col, InputGroup, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap'
import { useState } from 'react'
import { setAlerts } from '../actions/index'

import CreateReportTable from './createReportTable'


const PRODUCTION = 'production'
const STAGING = 'staging'

const initialInput = {
    title: '',
    content: '',
    time: undefined,
    environment: undefined
}

function CreateReport(props) {

    const [input, inputHandler] = useState(initialInput)

    const handleOnChange = (event) => {
        if (event.target.name === 'title') {
            inputHandler({ ...input, title: event.target.value })
        }
        else {
            inputHandler({ ...input, content: event.target.value })
        }    
    }

    const initiazlizeInput = () => {
        document.querySelectorAll('textarea').forEach(textarea => textarea.value = '')
        inputHandler(initialInput)
    }

    const addAlertHandler = async (event) => {
        if (input.title === '' || input === initialInput) {
            alert('Alert must have a title and environment!')
            return
        }

        else {
            switch (input.environment) {
                case undefined:
                    alert('Alert must have an environemnt!')
                    return
                default:
                    inputHandler({...input, time: new Date().getHours().toString() + ':' + new Date().getMinutes().toString() + ':' + new Date().getSeconds().toString()})
                    await props.setAlerts([...props.alertsData, input])
                    break
            }
        }
        console.log(props.alertsData)

        //Clear on submit
        initiazlizeInput()
        return
    }

    return (
        <div>
            <Container style={{ width: '100%' }}>
                <Row style={RowStyle}>
                    <Col>Alert:</Col>
                </Row>
                <Row style={RowStyle}>
                    <InputGroup>
                        <Form.Control as="textarea" name="title" style={{ height: 120 }} onChange={handleOnChange} />
                    </InputGroup>
                </Row>
                <Row style={RowStyle}>
                    <Col>Alert info:</Col>
                </Row>
                <Row style={RowStyle}>
                    <InputGroup>
                        <Form.Control as="textarea" name="content" style={{ height: 100 }} onChange={handleOnChange} />
                    </InputGroup>
                </Row>
                <Row style={RowStyle}>
                    <DropdownButton id="dropdown-basic-button" title="Environment" style={{ marginRight: 30 }}>
                        <Dropdown.Item onSelect={() => inputHandler({ ...input, environment: PRODUCTION })}>Production</Dropdown.Item>
                        <Dropdown.Item onSelect={() => inputHandler({ ...input, environment: STAGING })}>Staging</Dropdown.Item>
                    </DropdownButton>
                    <Button onClick={addAlertHandler}>Add</Button>
                </Row>
            </Container>

            <CreateReportTable alertsArray={props.alertsData}/>
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
