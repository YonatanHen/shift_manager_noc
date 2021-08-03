import React from 'react'
import { Divider } from 'primereact/divider';
import { Carousel } from 'primereact/carousel'

const alertsCarousel = item => {
    return (
        <>
            {item.alerts.map(alert => {
                return (
                    <>
                        <Divider align="left">
                            <b>{alert.title} - {alert.time}</b>
                        </Divider>
                        <p>
                            {alert.content}
                        </p>
                        {alert.comments && alert.comments.map((comment, index = 0) => {
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
            })}
        </>
    )
}

const followsCarousel = item => {
    return (
        <>
            {item.follows.map(follow => {
                return (<>
                    <Divider align="left" />
                    <p>
                        {follow.content}
                    </p>
                    {follow.comments && follow.comments.map((comment, index = 0) => {
                        return (
                            <>
                                    <b>{`comment #${++index}`}</b>
                                    <p>
                                        {comment.content}
                                    </p>
                                </>
                        )
                    })}
                </>)
            })}
        </>
    )
}

export const RenderEventsData = props => {

    return (
        <>
            <h3>Alert ID: {props.row.id}</h3>
            <h4>Production:</h4>
            <h6>Alerts:</h6>
            <Carousel value={[props.row.production]} itemTemplate={alertsCarousel} numVisible={3} numScroll={1} />
            <h6>To Follow:</h6>
            <Carousel value={[props.row.production]} itemTemplate={followsCarousel} numVisible={3} numScroll={1} />
            {' '}
            {/* There is no data on staging, the code below will appear when data will be added */}
            {/* <h4>Staging:</h4>
            <h6>Alerts:</h6>
            <Carousel value={[props.row.staging]} itemTemplate={alertsCarousel} numVisible={3} numScroll={1} />
            <h6>To Follow:</h6>
            <Carousel value={[props.row.staging]} itemTemplate={followsCarousel} numVisible={3} numScroll={1} /> */}
        </>
    )
}