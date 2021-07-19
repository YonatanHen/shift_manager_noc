import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap'
import ReportsTable from './MutualUI/ReportsTable'
// import { getReports } from "./actions/index";

export const CreateReport = (props) => {
    return (
        <div>
            <Container style={{ width: '100%' }}>
                <Row style={RowStyle}>
                    <Col>Production alerts:</Col>
                    <Col>Staging alerts:</Col>
                </Row>
                <Row style={RowStyle}>
                    <Col>
                        <InputGroup>
                            <FormControl as="textarea" />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup>
                            <FormControl as="textarea" />
                        </InputGroup>
                    </Col>
                </Row>
                <Row style={RowStyle}>
                    <Col>Alert info:</Col>
                </Row>
                <Row style={RowStyle}>
                    <Col>
                        <InputGroup>
                            <FormControl as="textarea" />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup>
                            <FormControl as="textarea" />
                        </InputGroup>
                    </Col>
                </Row>
                <Row style={RowStyle}>
                    <Col>
                        <Button>Add</Button>
                    </Col>
                    <Col>
                        <Button>Add</Button>
                    </Col>
                </Row>
            </Container>
            <ReportsTable headers={['id','date','reporter','environment']} arr = {[{ id: 1, date: 2021, reporter: 'yonatan', environment: 'staging' }, { id: 2, date: 2021, reporter: 'almog', environment: 'staging' }]} />
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
