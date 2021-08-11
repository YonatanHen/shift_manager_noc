import React, { useState } from 'react'
import { connect, useStore } from 'react-redux'
import { Container, Row, Col, InputGroup, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap'

import { setAlerts } from '../../actions/index'

const EditReportScreen = props => {
    const [input, inputHandler] = useState(props.row)

    const handleOnChange = (event) => {
        if (event.target.name === 'title') {
            inputHandler({ ...input, title: event.target.value })
        }
        else {
            inputHandler({ ...input, content: event.target.value, time: new Date().getHours().toString() + ':' + new Date().getMinutes().toString() + ':' + new Date().getSeconds().toString() })
        }
    }

    const editAlertHandler = () => {
        const editedAlert = props.alerts.find(alert => props.row.title === alert.title)
        console.log(editedAlert)

        //Closing the window
        props.displayDialogHandler(false)
    }

    return (
        <>
            <Container style={{ width: '100%' }}>
                <Row style={RowStyle}>
                    <Col>Alert:</Col>
                </Row>
                <Row style={RowStyle}>
                    <InputGroup>
                        <Form.Control as="textarea" name="title" style={{ height: 120 }} onChange={handleOnChange} value={input.title} />
                    </InputGroup>
                </Row>
                <Row style={RowStyle}>
                    <Col>Alert info:</Col>
                </Row>
                <Row style={RowStyle}>
                    <InputGroup>
                        <Form.Control as="textarea" name="content" style={{ height: 100 }} onChange={handleOnChange} value={input.content} />
                    </InputGroup>
                </Row>
                <Row style={RowStyle}>
                    <Button onClick={editAlertHandler}>Edit alert</Button>
                </Row>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    alerts: state.alertsData
})

const mapDispatchToProps = {
    setAlerts
}

const RowStyle = {
    marginBottom: 5
}

export default connect(mapStateToProps, mapDispatchToProps)(EditReportScreen)