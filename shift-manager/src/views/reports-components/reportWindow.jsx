import React from 'react'
import { Divider } from 'primereact/divider';
import { Carousel } from 'primereact/carousel'

const alertsCarousel = item => {
    if (item) return (
        <>
        <Divider align="left">
            <b>{item.title} - {item.time}</b>
        </Divider>
        <p>
            {item.content}
        </p>
        {item.comments && item.comments.map((comment, index = 0) => {
            return (
                <>
                    <b>{`comment #${++index}`}</b>
                    <p>
                        {comment.content}
                    </p>
                </>
            )
        })}
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
        {item.comments && item.comments.map((comment, index = 0) => {
            return (
                <>
                        <b>{`comment #${++index}`}</b>
                        <p>
                            {comment.content}
                        </p>
                    </>
            )
        })}
    </>
    ) 
    else return
}

export const RenderEventsData = props => {

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
        </>
    )
}