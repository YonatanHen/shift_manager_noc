import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, InputGroup, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap'
import { useState } from 'react'

import CreateReportTable from './createReportTable'

const PRODUCTION = 'production'
const STAGING = 'staging'

const initialInput = {
    alert: '',
    info: '',
    environment: undefined
}

export const CreateReport = (props) => {
    const [input, inputHanlder] = useState(initialInput)

    const [alerts, alertsHandler] = useState({
        staging: [],
        production: []
    })

    const handleOnChange = event => {
        if (event.target.name === 'alert') {
            inputHanlder({ ...input, alert: event.target.value })
        }
        else {
            inputHanlder({ ...input, info: event.target.value })
        }

        console.log(input)
    }

    const initiazlizeInput = () => {
        document.querySelectorAll('textarea').forEach(textarea => textarea.value = '')
        inputHanlder(initialInput)
    }

    const addAlertHandler = event => {
        if (input.title === '' || input === initialInput) {
            alert('Alert must have a title and environment!')
            return
        }

        else {
            switch (input.environment) {
                case undefined:
                    alert('Alert must have an environemnt!')
                    return
                case PRODUCTION:
                    alertsHandler({ ...alerts, production: [...alerts.production, input] })
                    break
                case STAGING:
                    alertsHandler({ ...alerts, staging: [...alerts.staging, input] })
                    break
            }  
        }
        //Clear on submit
        initiazlizeInput()
        console.log(alerts)
    }

    return (
        <div>
            <Container style={{ width: '100%' }}>
                <Row style={RowStyle}>
                    <Col>Alert:</Col>
                </Row>
                <Row style={RowStyle}>
                    <InputGroup>
                        <Form.Control as="textarea" name="alert" style={{ height: 120 }} onChange={handleOnChange} />
                    </InputGroup>
                </Row>
                <Row style={RowStyle}>
                    <Col>Alert info:</Col>
                </Row>
                <Row style={RowStyle}>
                    <InputGroup>
                        <Form.Control as="textarea" name="info" style={{ height: 100 }} onChange={handleOnChange} />
                    </InputGroup>
                </Row>
                <Row style={RowStyle}>
                    <DropdownButton id="dropdown-basic-button" title="Environment" style={{ marginRight: 30 }}>
                        <Dropdown.Item onSelect={() => inputHanlder({ ...input, environment: PRODUCTION })}>Production</Dropdown.Item>
                        <Dropdown.Item onSelect={() => inputHanlder({ ...input, environment: STAGING })}>Staging</Dropdown.Item>
                    </DropdownButton>
                    <Button onClick={addAlertHandler}>Add</Button>
                </Row>
            </Container>

            <CreateReportTable />
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    // getReports
}

const RowStyle = {
    marginBottom: 5
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateReport)
