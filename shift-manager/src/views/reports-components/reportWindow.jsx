import React, { useState } from 'react'
import { Divider } from 'primereact/divider';
import { Carousel } from 'primereact/carousel'
import { InputGroup, Button, FormControl, Spinner } from 'react-bootstrap'
import { connect, useStore } from 'react-redux'


import Comment from '../../modules/Comment'
import { updateComments, getReports } from '../../actions/index'
import { useEffect } from 'react';

import './css/reportsWindow.css'

const alertsCarousel = item => {
    if (item) return (
        <>
            <Divider align="left">
                <b>{item.title} - {item.time}</b>
            </Divider>
            <p>
                {item.content}
            </p>
        </>
    )
    else return
}

const followsCarousel = item => {
    if (item) return (
        <>
            <Divider align="left" />
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
    const handleCommentSubmit = async () => {
        submitClickedHandler(true)
        await props.updateComments(props.row.id, new Comment(commenatedAlert, comment, !!props.user ? props.user.name : 'NOC'))
        await props.getReports()
        submitClickedHandler(false)
    }

    // useEffect(() => {

    // }, [props.reportsData])
    return (
        <>
            <h3>Report ID: {props.row.id}</h3>
            <div className='production-container'>
                <h4>Production:</h4>
                <h6>Alerts:</h6>
                <Carousel value={props.row.production.alerts} itemTemplate={alertsCarousel} numVisible={1} />
                <h6>To Follow:</h6>
                <Carousel value={props.row.production.follows} itemTemplate={followsCarousel} numVisible={1} />
            </div>
            {' '}
            <div className='staging-container'>
                <h4>Staging:</h4>
                <h6>Alerts:</h6>
                <Carousel value={props.row.staging.alerts} itemTemplate={alertsCarousel} numVisible={1} />
                <h6>To Follow:</h6>
                <Carousel value={props.row.staging.follows} itemTemplate={followsCarousel} numVisible={1} />
            </div>
            {submitClicked ? (<>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </>)
                :
                (<>
                    <h6>Comments:</h6>
                    <Carousel value={props.row.comments} itemTemplate={commentsCarousel} numVisible={1} />
                    <InputGroup className="mb-3">
                        <FormControl as="textarea" name="Alert" placeholder="Paste the alert/follow you are commented on here" style={{ height: 120 }} onChange={handleOnChange} />
                        <FormControl as="textarea" name="Content" placeholder="Write here the comment" style={{ height: 120 }} onChange={handleOnChange} />
                        <Button variant="outline-secondary" id="button-addon2" onClick={handleCommentSubmit}>
                            Submit Comment
                        </Button>
                    </InputGroup>
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