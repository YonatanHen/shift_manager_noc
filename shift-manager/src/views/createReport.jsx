import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, InputGroup, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap'



export const CreateReport = (props) => {
    return (
        <div>
            <Container style={{ width: '100%' }}>
                <Row style={RowStyle}>
                    <Col>Alert:</Col>
                </Row>
                <Row style={RowStyle}>
                    <InputGroup>
                        <FormControl as="textarea" style={{ height: 120 }} />
                    </InputGroup>
                </Row>
                <Row style={RowStyle}>
                    <Col>Alert info:</Col>
                </Row>
                <Row style={RowStyle}>
                    <InputGroup>
                        <FormControl as="textarea" style={{ height: 100 }} />
                    </InputGroup>
                </Row>
                <Row style={RowStyle}>
                    <DropdownButton id="dropdown-basic-button" title="Dropdown button" style={{marginRight: 30}}>
                        <Dropdown.Item>Production</Dropdown.Item>
                        <Dropdown.Item>Staging</Dropdown.Item>
                    </DropdownButton>
                    <Button>Add</Button>
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
