import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import HeaderGroup from './reportsComponents/reportsTableHeader';

export const Reports = (props) => {
    return (
        <>
            {/* <div>
                reports
            </div> */}
            <Container style={{ width: '100%' }}>
                <Row style={RowStyle}>
                    <Col>Production reports</Col>
                    <Col>Staging reports</Col>
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
            <DataTable headerColumnGroup={HeaderGroup}>
                <Column field="Report ID" />
                <Column field="Date" />
                <Column field="Reporter" />
            </DataTable>
        </>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

const RowStyle = {
    marginBottom: 5
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
