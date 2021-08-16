import React from 'react'
import { Divider } from 'primereact/divider';
import { Carousel } from 'primereact/carousel'
import { InputGroup, Button, FormControl } from 'react-bootstrap'

const alertsCarousel = item => {
    if (item) return (
        <>
            <Divider align="left">
                <b>{item.title} - {item.time}</b>
            </Divider>
            <p>
                {item.content}
            </p>
            {/* {item.comments && item.comments.map((comment, index = 0) => {
                return (
                    <>
                        <b>{`comment #${++index}`}</b>
                        <p>
                            {comment.content}
                        </p>
                    </>
                )
            })} */}
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
            {/* {item.comments && item.comments.map((comment, index = 0) => {
                return (
                    <>
                        <b>{`comment #${++index}`}</b>
                        <p>
                            {comment.content}
                        </p>
                    </>
                )
            })} */}
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

export const RenderEventsData = props => {

    const editData = () => {

    }

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
                <FormControl as="textarea" aria-label="Alert" placeholder="Paste the alert/follow you are commented on here" style={{height: 120}} />
                <FormControl as="textarea" aria-label="Content" placeholder="Write here the comment" style={{height: 120}} />
                <Button variant="outline-secondary" id="button-addon2">
                    Submit Comment
                </Button>
            </InputGroup>
        </>
    )
}