import React, { useState } from 'react'
import { Divider } from 'primereact/divider';
import { Carousel } from 'primereact/carousel'
import { InputGroup, Button, FormControl } from 'react-bootstrap'
import { connect, useStore } from 'react-redux'
import axios from 'axios';

import Comment from '../../modules/Comment'
import { setAlerts, updateComments } from '../../actions/index'
import { useEffect } from 'react';

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

    const handleOnChange = (event) => {
        if (event.target.name === 'Alert') {
            commenatedAlertHandler(event.target.value)
        }
        else {
            commentHandler(event.target.value)
        }
    }
    const handleCommentSubmit = () => {
        props.updateComments(props.row.id, new Comment(commenatedAlert, comment, !!props.user ? props.user.name : 'NOC'))       
    } 

    // useEffect(() => {}, [props.updateComments])


    return (
        <>
            <h3>Report ID: {props.row.id}</h3>
            <h4>Production:</h4>
            <h6>Alerts:</h6>
            <Carousel value={props.row.production.alerts} itemTemplate={alertsCarousel} numVisible={1} />
            <h6>To Follow:</h6>
            <Carousel value={props.row.production.follows} itemTemplate={followsCarousel} numVisible={1} />
            {' '}
            <h4>Staging:</h4>
            <h6>Alerts:</h6>
            <Carousel value={props.row.staging.alerts} itemTemplate={alertsCarousel} numVisible={1} />
            <h6>To Follow:</h6>
            <Carousel value={props.row.staging.follows} itemTemplate={followsCarousel} numVisible={1} />
            <h6>Comments:</h6>
            <Carousel value={props.row.comments} itemTemplate={commentsCarousel} numVisible={1} />
            <InputGroup className="mb-3">
                <FormControl as="textarea" name="Alert" placeholder="Paste the alert/follow you are commented on here" style={{height: 120}} onChange={handleOnChange}/>
                <FormControl as="textarea" name="Content" placeholder="Write here the comment" style={{height: 120}} onChange={handleOnChange}/>
                <Button variant="outline-secondary" id="button-addon2" onClick={handleCommentSubmit}>
                    Submit Comment
                </Button>
            </InputGroup>
        </>
    )
}

const mapStateToProps = (state) => ({
    alerts: state.alertsData,
    user: state.User
})

const mapDispatchToProps = {
    updateComments

}

export default connect(mapStateToProps, mapDispatchToProps)(RenderEventsData)