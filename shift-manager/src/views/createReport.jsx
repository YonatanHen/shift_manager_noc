import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, InputGroup, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap'
import { useState } from 'react'

const PRODUCTION = 'production'
const STAGING = 'staging'

export const CreateReport = (props) => {
    const [input, inputHanlder] = useState({
        alert: '',
        info: '',
        environment: undefined
    })

    const [alerts, alertsHandler] = useState({
        staging: [],
        production: []
    })

    const handleOnChange = event => {
        if(event.target.name === 'alert') {
            inputHanlder({... input, alert: event.target.value})
        }
        else {
            inputHanlder({... input, info: event.target.value})
        }

        console.log(input)
    }

    return (
        <div>
            <Container style={{ width: '100%' }}>
                <Row style={RowStyle}>
                    <Col>Alert:</Col>
                </Row>
                <Row style={RowStyle}>
                    <InputGroup>
                        <FormControl as="textarea" name="alert" style={{ height: 120 }} onChange={handleOnChange}/>
                    </InputGroup>
                </Row>
                <Row style={RowStyle}>
                    <Col>Alert info:</Col>
                </Row>
                <Row style={RowStyle}>
                    <InputGroup>
                        <FormControl as="textarea" name="info" style={{ height: 100 }} onChange={handleOnChange}/>
                    </InputGroup>
                </Row>
                <Row style={RowStyle}>
                    <DropdownButton id="dropdown-basic-button" title="Environment" style={{marginRight: 30}}>
                        <Dropdown.Item onSelect={() => inputHanlder({...input, environment: PRODUCTION})}>Production</Dropdown.Item>
                        <Dropdown.Item onSelect={() => inputHanlder({...input, environment: STAGING})}>Staging</Dropdown.Item>
                    </DropdownButton>
                    <Button onPress={() => {}}>Add</Button>
                </Row>
            </Container>
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
