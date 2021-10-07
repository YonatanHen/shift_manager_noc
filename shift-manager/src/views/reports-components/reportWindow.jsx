import React, { useState } from 'react'
import { Divider } from 'primereact/divider';
import { Carousel } from 'primereact/carousel'
import { Dropdown } from 'primereact/dropdown';
import { InputGroup, Button, FormControl, Spinner } from 'react-bootstrap'
import { connect, useStore } from 'react-redux'


import Comment from '../../modules/Comment'
import { updateComments, getReports } from '../../actions/index'
import { useEffect } from 'react';
import concatArrays from '../../functions/concatArrays'

import './css/reportsWindow.css'

const alertsCarousel = item => {
    if (item) return (
        <>
            <b>{item.title} - {item.time}</b>
            <p>
                {item.content}
            </p>
            {item.calledEmployee && <i>A call was made to <b>{item.calledEmployee}</b></i>}
        </>
    )
    else return
}

const followsCarousel = item => {
    if (item) return (
        <>
            <p>
                {item.content}
            </p>
        </>
    )
    else return
}

const commentsCarousel = item => {
    if (item) return (
        <>
            <Divider align="left">
                <b>{item.responder} - {item.title}</b>
            </Divider>
            <p>
                {item.content}
            </p>

        </>
    )
    else return
}

const RenderEventsData = props => {
    const [commenatedAlert, commenatedAlertHandler] = useState('')
    const [comment, commentHandler] = useState('')
    const [submitClicked, submitClickedHandler] = useState(false)

    const handleOnChange = (event) => {
        if (event.target.name === 'Alert') {
            commenatedAlertHandler(event.target.value)
        }
        else {
            commentHandler(event.target.value)
        }
    }
    const handleCommentSubmit = () => {
        submitClickedHandler(true)
        props.updateComments(props.row.id, new Comment(commenatedAlert, comment, !!props.user ? props.user.name : 'NOC'))
        props.getReports()
        submitClickedHandler(false)
    }

    useEffect(() => {
        console.log('a')
    }, [submitClickedHandler, submitClicked, Spinner])

    return (
        <>
            <h3>Report ID: {props.row.id}</h3>
            <div className='production-container'>
                <div style={{ marginLeft: 8 }}>
                    <h4>Production:</h4>
                    <h6>Alerts:</h6>
                    <Carousel value={props.row.production.alerts} itemTemplate={alertsCarousel} numVisible={1} />
                    <hr />
                    <h6>To Follow:</h6>
                    <Carousel value={props.row.production.follows} itemTemplate={followsCarousel} numVisible={1} />
                </div>
            </div>
            {' '}
            <div className='staging-container'>
                <div style={{ marginLeft: 8 }}>
                    <h4>Staging:</h4>
                    <h6>Alerts:</h6>
                    <Carousel value={props.row.staging.alerts} itemTemplate={alertsCarousel} numVisible={1} />
                    <hr />
                    <h6>To Follow:</h6>
                    <Carousel value={props.row.staging.follows} itemTemplate={followsCarousel} numVisible={1} />
                </div>
            </div>
            {submitClicked ? (<>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </>)
                :
                (<>
                    <div style={{ marginLeft: 8 }}>
                        <h6>Comments:</h6>
                        <Carousel value={props.row.comments} itemTemplate={commentsCarousel} numVisible={1} />
                        <InputGroup>
                            <Dropdown value={commenatedAlert} options={concatArrays(props.row).map(alert => alert.title)} onChange={(e) => commenatedAlertHandler(e.value)} style={{ width: '91%', marginBottom: '0.1%' }} placeholder="Select an alert/follow" />
                        </InputGroup>
                        <InputGroup>
                            <FormControl as="textarea" name="Content" placeholder="Write here the comment" style={{ height: 120 }} onChange={handleOnChange} />
                            <Button variant="outline-secondary" id="button-addon2" onClick={handleCommentSubmit}>
                                Submit Comment
                            </Button>
                        </InputGroup>
                    </div>
                </>)}

        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.User,
    reportsData: state.ReportsData
})

const mapDispatchToProps = {
    updateComments,
    getReports
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderEventsData)